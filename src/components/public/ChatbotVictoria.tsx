'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ChatbotVictoria.css';
import { SITE_KNOWLEDGE } from '@/data/siteKnowledge';
import { callOllama } from '@/utils/ollamaClient';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotVictoria = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: '¡Hola! Soy Victoria, su asistente médica en JC PATH LAB. ¿En qué puedo ayudarle hoy? 🩺', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'hablando' | 'pensando' | 'saludo'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      handleAvatarChange('saludo');
      setTimeout(() => handleAvatarChange('idle'), 2500);
    }
  }, [isOpen]);

  const handleAvatarChange = (state: 'idle' | 'hablando' | 'pensando' | 'saludo') => {
    setAvatarState(state);
    if (!videoRef.current) return;

    let videoSrc = '/victoriaidle.mp4';
    if (state === 'hablando') videoSrc = '/victoriahablando.mp4';
    else if (state === 'pensando') videoSrc = '/victoriapensando.mp4';
    else if (state === 'saludo') videoSrc = '/victoriasaludo.mp4';

    videoRef.current.src = videoSrc;
    videoRef.current.play().catch(e => console.warn('Video play error:', e));
  };

  const normalizeText = (str: string) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  };

  const findLocalResponse = (query: string): string | null => {
    const qNorm = normalizeText(query);
    
    // Simple Keyword matching from SITE_KNOWLEDGE
    if (qNorm.match(/(precio|costo|cuanto|vale|valor)/)) {
        return "Para brindarle los precios exactos de biopsias, Papanicolaou o estudios especiales (Inmunohistoquímica), le sugiero hablar con el Dr. Castillo vía WhatsApp. Sin embargo, en nuestra web puede encontrar información general sobre nuestros servicios. 💰";
    }
    
    if (qNorm.match(/(donde|ubicacion|direccion|lugar|queda)/)) {
        return "Estamos ubicados en Av. José Pardo 601, Miraflores, Lima. Atendemos de Lunes a Sábado. ¿Desea que le envíe el mapa por WhatsApp? 📍";
    }

    if (qNorm.match(/(biopsia|cancer|tumor|maligno|estudio)/)) {
        const sections = SITE_KNOWLEDGE.split('---');
        const match = sections.find(s => normalizeText(s).includes(qNorm.split(' ')[0]));
        if (match) {
            return `Basado en nuestros protocolos: ${match.substring(0, 300)}... para más detalles, puedo escalarlo al Dr. Castillo.`;
        }
    }

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
      // 1. Local Knowledge Fallback
      const localResp = findLocalResponse(userMsg);
      if (localResp) {
        setTimeout(() => {
          setIsTyping(false);
          handleAvatarChange('hablando');
          setMessages(prev => [...prev, { text: localResp, sender: 'bot' }]);
          setTimeout(() => handleAvatarChange('idle'), 3000);
        }, 1000);
        return;
      }

      // 2. Ollama (using the utility we created)
      const systemPrompt = "Eres Victoria, la asistente virtual de JC PATH LAB. Eres profesional, empática y conoces los protocolos de patología. Responde de forma concisa y amigable.";
      const ollamaResp = await callOllama(`Consulta de paciente: ${userMsg}`, systemPrompt);
      
      setIsTyping(false);
      handleAvatarChange('hablando');
      
      if (ollamaResp) {
        setMessages(prev => [...prev, { text: ollamaResp, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { 
          text: 'Entiendo su consulta. Sin embargo, para brindarle una respuesta precisa sobre este tema médico, le sugiero contactar directamente al Dr. Castillo por WhatsApp. ¿Desea el enlace? 🩺', 
          sender: 'bot' 
        }]);
      }
      setTimeout(() => handleAvatarChange('idle'), 5000);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      handleAvatarChange('idle');
      setMessages(prev => [...prev, { 
        text: 'Lo siento, estoy experimentando dificultades técnicas. ¿Desea hablar directamente con el Dr. Castillo? 🩺', 
        sender: 'bot' 
      }]);
    }
  };

  return (
    <>
      <div className={`victoria-chat-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="avatar-wrapper">
            <video 
              ref={videoRef}
              className="avatar-video"
              src="/victoriaidle.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="status-dot" />
          </div>
          <div className="header-info">
            <h3>Victoria</h3>
            <p>IA - Asistente Médica</p>
          </div>
          <button className="close-chat" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
              {msg.text}
            </div>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>

      <button 
        className="chat-toggle-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir Chat"
      >
        💬
      </button>
    </>
  );
};

export default ChatbotVictoria;
