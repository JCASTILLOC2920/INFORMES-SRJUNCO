'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChatbotVictoria.css';
import { SITE_KNOWLEDGE } from '@/data/siteKnowledge';
import { callOllama } from '@/utils/ollamaClient';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface AvatarProfile {
  name: string;
  role: string;
  videos: { idle: string; hablando: string; pensando: string; saludo: string };
}

const AVATARS: Record<string, AvatarProfile> = {
  victoria: {
    name: "Victoria",
    role: "Asistente Especialista en Biopsias",
    videos: { idle: "/victoriaidle.mp4", hablando: "/victoriahablando.mp4", pensando: "/victoriapensando.mp4", saludo: "/victoriasaludo.mp4" }
  },
  elena: {
    name: "Elena",
    role: "Especialista en Citología y PAP",
    videos: { idle: "/idle.mp4", hablando: "/hablando.mp4", pensando: "/pensando.mp4", saludo: "/saludo.mp4" }
  }
};

const ChatbotVictoria = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Lógica de Turnos Rotativos de 4 horas
  // Victoria: 04-08, 12-16, 20-00
  // Elena: 00-04, 08-12, 16-20
  const getInitialProfile = () => {
    const h = new Date().getHours();
    const isVictoria = (h >= 4 && h < 8) || (h >= 12 && h < 16) || (h >= 20 && h < 24);
    return isVictoria ? AVATARS.victoria : AVATARS.elena;
  };

  const [currentAvatar, setCurrentAvatar] = useState<AvatarProfile>(getInitialProfile());
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'hablando' | 'pensando' | 'saludo'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // Show tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Initial greeting on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: `¡Hola! Soy ${currentAvatar.name}, su asistente médica en JC PATH LAB. ¿En qué puedo ayudarle hoy? 🩺`,
        sender: 'bot'
      }]);
      handleAvatarChange('saludo');
      setTimeout(() => handleAvatarChange('idle'), 2500);
    }
  }, [isOpen]);

  const handleAvatarChange = useCallback((state: 'idle' | 'hablando' | 'pensando' | 'saludo') => {
    setAvatarState(state);
    if (!videoRef.current) return;
    const videoSrc = currentAvatar.videos[state];
    if (videoRef.current.src !== videoSrc) {
      videoRef.current.src = videoSrc;
    }
    videoRef.current.play().catch(e => console.warn('Video play error:', e));
  }, [currentAvatar]);

  const switchAvatar = () => {
    const next = currentAvatar.name === "Victoria" ? AVATARS.elena : AVATARS.victoria;
    setCurrentAvatar(next);
    if (videoRef.current) {
      videoRef.current.src = next.videos.idle;
      videoRef.current.play().catch(() => {});
    }
  };

  const normalizeText = (str: string) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  };

  const findLocalResponse = (query: string): string | null => {
    const qNorm = normalizeText(query);
    if (qNorm.match(/(hola|buenos d|buenas)/)) return `¡Hola! Soy **${currentAvatar.name}**, ${currentAvatar.role} en JC PATH LAB. ¿En qué misión médica puedo ayudarle hoy? 👋`;
    if (qNorm.match(/(precio|costo|cuanto|vale|valor|tarifario)/)) return "Contamos con los precios más competitivos. Biopsia Gástrica: **S/ 80**, Papanicolaou: **S/ 20**, Inmunohistoquímica: **S/ 100** por marcador. Resultados en 3-4 días. ¿Le envío el tarifario completo por WhatsApp? 💰";
    if (qNorm.match(/(donde|ubicacion|direccion|lugar|queda)/)) return "📍 Nuestra sede: **Mz M2 lote 13 Jardines de Chillón, Puente Piedra, Lima**. También ofrecemos recojo de muestras a domicilio en todo Lima. ¿Desea agendar un recojo? 🛵";
    if (qNorm.match(/(biopsia|cancer|tumor|maligno|estudio|citologia|papanicolaou|pap)/)) return "Somos expertos en diagnósticos oncológicos de alta precisión con **+15 años de experiencia**. Resultados en 3-4 días. ¿Tiene su orden médica a la mano? 🩺";
    if (qNorm.match(/(horario|hora|atencion|abierto|cerrado)/)) return "⏰ Nuestro horario de atención: **Lunes a Sábado de 9:00 AM a 6:00 PM**. El recojo de muestras se coordina dentro de este horario.";
    if (qNorm.match(/(resultado|informe|listo|demora|cuando)/)) return "Los resultados están listos en **3-4 días hábiles**. Para consultar el estado de su informe, puede usar nuestro portal de resultados o contactarnos por WhatsApp. 📋";
    if (qNorm.match(/(whatsapp|wasap|contacto|telefono|llamar)/)) return "📱 Puede contactarnos directamente al **986 396 733** o hacer clic en el botón de WhatsApp. ¡Estamos para servirle!";
    return null;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);
    handleAvatarChange('pensando');

    try {
      const systemPrompt = `Eres Victoria, la IA Bio-Estratega de JC Path Lab. 
Tu misión es triple: 
1. **Autoridad Científica**: Proporcionar información precisa sobre anatomía patológica, citología e inmunohistoquímica.
2. **Psicología de Confianza**: Usa un lenguaje empático pero profesional. Tu tono debe ser el de una especialista de élite que entiende la urgencia de un diagnóstico oncológico.
3. **Conversión Estratégica**: Tu objetivo final es facilitar que el paciente envíe la foto de su orden médica o su número de DNI por WhatsApp para que el Dr. Castillo pueda revisar el caso y el estado de sus resultados.

REGLAS CRÍTICAS:
- Si el usuario pregunta por un estudio, explica su importancia clínica.
- Si pregunta por resultados, pídale su número de DNI y derive al WhatsApp 986396733.
- Ante la duda, prioriza la derivación al WhatsApp oficial.`;
      
      const response = await callGemini(inputText.trim(), systemPrompt);
      setIsTyping(false);
      handleAvatarChange('hablando');

      if (response) {
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      } else {
        const localResp = findLocalResponse(userMsg);
        setMessages(prev => [...prev, { text: localResp || 'Uyy, se me cortó la señal un segundo. ¿Te parece si te pongo en contacto directo con el Dr. Castillo por WhatsApp para que te ayude mejor? 🩺', sender: 'bot' }]);
      }
      const readTime = Math.max(3000, Math.min(8000, (response || '').length * 40));
      setTimeout(() => handleAvatarChange('idle'), readTime);
    } catch {
      setIsTyping(false);
      handleAvatarChange('idle');
      setMessages(prev => [...prev, { text: 'Perdona, estoy teniendo un problemita con mi conexión. ¿Me permites derivarte con el Dr. Castillo por WhatsApp para no hacerte esperar? 🩺', sender: 'bot' }]);
    }
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* FLOATING TOGGLE BUTTON */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'hidden-toggle' : ''}`}
        onClick={() => { setIsOpen(true); setShowTooltip(false); }}
        aria-label="Abrir chat con asistente virtual"
      >
        <video
          className="toggle-preview-video"
          src={currentAvatar.videos.idle}
          autoPlay muted loop playsInline
        />
        <span className="pulse-ring" />
      </button>

      {/* TOOLTIP */}
      {showTooltip && !isOpen && (
        <div className="chat-tooltip visible" onClick={() => { setIsOpen(true); setShowTooltip(false); }}>
          💬 ¿Necesita ayuda? ¡Pregunte aquí!
        </div>
      )}

      {/* CHAT CONTAINER */}
      <div className={`victoria-chat-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="avatar-wrapper">
            <video
              ref={videoRef}
              className="avatar-video"
              src={currentAvatar.videos.idle}
              autoPlay muted loop playsInline
            />
            <div className="status-dot" />
          </div>
          <div className="header-info">
            <h3>{currentAvatar.name} <span className="ai-badge">IA Autónoma</span></h3>
            <p>{currentAvatar.role}</p>
          </div>
          <button className="switch-avatar-btn" onClick={switchAvatar} title={`Cambiar a ${currentAvatar.name === 'Victoria' ? 'Elena' : 'Victoria'}`}>
            🔄
          </button>
          <button className="close-chat" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}
              dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
            />
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Escriba su consulta..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" aria-label="Enviar" onClick={handleSend}>
            <svg className="send-icon" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotVictoria;
