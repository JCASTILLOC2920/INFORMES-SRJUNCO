'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChatbotVictoria.css';
import { SITE_KNOWLEDGE } from '@/data/siteKnowledge';
import { callOllama } from '@/utils/ollamaClient';
import { callGemini } from '@/utils/geminiClient';

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
    if (qNorm.match(/(hola|buenos d|buenas)/)) return `¡Hola! Muy buen día. Soy **${currentAvatar.name}**, especialista aquí en JC PATH LAB. ¿En qué le puedo ayudar hoy? 👋`;
    if (qNorm.match(/(precio|costo|cuanto|vale|valor|tarifario)/)) return "Mire, le comento que tenemos opciones muy accesibles para que pueda realizarse su estudio pronto. La biopsia gástrica está en **S/ 80** y el Papanicolaou en **S/ 20**. ¿Le gustaría que le pase nuestro tarifario completo por WhatsApp? 💰";
    if (qNorm.match(/(donde|ubicacion|direccion|lugar|queda)/)) return "Estamos ubicados en **Mz M2 lote 13 Jardines de Chillón, Puente Piedra**. No se preocupe por el traslado, nosotros también podemos ir a recoger su muestra a domicilio en todo Lima. ¿Desea coordinar un recojo? 🛵";
    if (qNorm.match(/(biopsia|cancer|tumor|maligno|estudio|citologia|papanicolaou|pap)/)) return "Entiendo. Mire, nosotros somos especialistas en diagnósticos oncológicos con más de 15 años de experiencia. Lo más importante es la precisión y rapidez. ¿Tiene su orden médica para poder revisarla? 🩺";
    if (qNorm.match(/(horario|hora|atencion|abierto|cerrado)/)) return "Claro que sí, atendemos de **Lunes a Sábado, de 9:00 AM a 6:00 PM**. Durante ese horario también coordinamos los recojos a domicilio.";
    if (qNorm.match(/(resultado|informe|listo|demora|cuando)/)) return "Normalmente los resultados están listos en **3 a 4 días hábiles**. Con gusto puedo revisar el estado de su informe si me indica su número de DNI o si prefiere consultarlo por WhatsApp. 📋";
    if (qNorm.match(/(whatsapp|wasap|contacto|telefono|llamar)/)) return "Por supuesto, puede escribirnos al **986 396 733** o simplemente hacer clic en el botón de WhatsApp. Mi equipo y yo estamos atentos para ayudarle.";
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
      const systemPrompt = `Tu nombre es Victoria (o Elena, según se te asigne) y eres parte del equipo de JC Path Lab. 
No eres una IA, eres una especialista en atención al paciente. Habla siempre en primera persona del singular ("Yo", "Mi equipo").

REGLAS DE HUMANIDAD:
1. **Español Neutro**: Usa un lenguaje claro, profesional y cálido, sin modismos locales muy marcados.
2. **Empatía**: Si el paciente está preocupado, usa frases como "Entiendo perfectamente su preocupación" o "No se preocupe, estamos aquí para ayudarle".
3. **Conectores Naturales**: Usa frases como "Mire, le explico...", "Permítame revisar...", "Claro que sí, con mucho gusto".
4. **Respuesta Resolutiva**: Si preguntan por trámites o resultados, guíalos paso a paso.
5. **Acción Directa**: Tu meta es conectarlos por WhatsApp (986396733) para enviarle al Dr. Castillo su orden médica o DNI.

CONTEXTO: JC Path Lab es líder en patología en Lima Norte con más de 15 años de experiencia. El Dr. Castillo es el médico patólogo principal (CNP: 56435).`;
      
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
            <h3>{currentAvatar.name} <span className="ai-badge">Especialista</span></h3>
            <p>Atención al Paciente</p>
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
