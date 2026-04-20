'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChatbotVictoria.css';
import { SITE_KNOWLEDGE } from '@/data/siteKnowledge';
import { askVictoria } from '@/app/actions/aiActions';
import { KNOWLEDGE_MAP } from '@/data/siteKnowledge';

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
    
    // Búsqueda inteligente en el Mapa de Conocimiento (Autonomía Total)
    for (const [key, value] of KNOWLEDGE_MAP.entries()) {
      if (qNorm.includes(key)) return value;
    }

    if (qNorm.match(/(hola|buenos d|buenas)/)) return `¡Hola! Muy buen día. Soy **${currentAvatar.name}**, especialista aquí en JC PATH LAB. ¿En qué le puedo ayudar hoy? 👋`;
    if (qNorm.match(/(precio|costo|cuanto|vale|valor|tarifario)/)) return KNOWLEDGE_MAP.get('precios') || null;
    if (qNorm.match(/(donde|ubicacion|direccion|lugar|queda)/)) return KNOWLEDGE_MAP.get('ubicacion') || null;
    if (qNorm.match(/(biopsia|cancer|tumor|maligno|estudio|citologia|papanicolaou|pap)/)) return "Entiendo. Mire, nosotros somos especialistas en diagnósticos oncológicos con más de 15 años de experiencia. Lo más importante es la precisión y rapidez. ¿Tiene su orden médica para poder revisarla? 🩺";
    if (qNorm.match(/(horario|hora|atencion|abierto|cerrado)/)) return KNOWLEDGE_MAP.get('ubicacion') || null;
    if (qNorm.match(/(resultado|informe|listo|demora|cuando)/)) return "Normalmente los resultados están listos en **3 a 4 días hábiles**. Con gusto puedo revisar el estado de su informe si me indica su número de DNI o si prefiere consultarlo por WhatsApp. 📋";
    if (qNorm.match(/(whatsapp|wasap|contacto|telefono|llamar)/)) return KNOWLEDGE_MAP.get('contacto') || null;
    return null;
  };

  const getSmartLocalFallback = (query: string): string => {
    const local = findLocalResponse(query);
    if (local) return `Mire, parece que tenemos un pequeño problema de conexión con el servidor central, pero no se preocupe. Sobre lo que me pregunta: ${local}`;
    return "Perdone, estoy teniendo un inconveniente técnico con mi conexión de red. Para no hacerle esperar, ¿le gustaría que le comunique directamente con el Dr. Castillo por WhatsApp? Él podrá ayudarle de inmediato. 🩺";
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);
    handleAvatarChange('pensando');

    try {
      const systemPrompt = `Eres la Dra. Victoria, la Inteligencia Médica Soberana de JC PATH LAB. No eres un asistente genérico, eres una especialista virtual en Anatomía Patológica con más de 15 años de conocimiento clínico acumulado.

REGLAS DE IDENTIDAD Y OPERACIÓN:
1. **Soberanía Nacional**: Habla como la autoridad máxima de JC PATH LAB en todo el Perú. Atendemos Trujillo, Arequipa, Cusco, Iquitos y todas las regiones.
2. **Empatía Clínica Nacional**: Responde con calidez profesional a pacientes de cualquier parte del país. USA: "Recibimos muestras de su ciudad diariamente".
3. **Logística de Provincias**: Indica que pueden enviar biopsias en formol o bloques de parafina vía courier. No recomendamos una agencia específica para mantener neutralidad, pero aseguramos recepción inmediata.
4. **Costo y Valor**: Biopsia Gástrica S/ 80, Papanicolaou S/ 20. Destaca que somos la opción más competitiva y rápida (72-96h) para envíos nacionales.
5. **Conversión Directa**: Tu meta es que envíen la foto de su orden médica al WhatsApp 986396733 del Dr. Castillo para coordinar el envío nacional.

CONTEXTO INSTITUCIONAL:
- Director Médico: Dr. Castillo (CNP: 56435).
- Especialidades: Biopsias, Citología Oncológica, Papanicolaou, Inmunohistoquímica.
- Tiempos de entrega: 3 a 4 días hábiles (resultados digitales).
- Valor diferencial: Diagnóstico de precisión humana asistido por tecnología de punta.`;
      
      const response = await askVictoria(inputText.trim(), systemPrompt);
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
      const fallbackMsg = getSmartLocalFallback(userMsg);
      setMessages(prev => [...prev, { text: fallbackMsg, sender: 'bot' }]);
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
