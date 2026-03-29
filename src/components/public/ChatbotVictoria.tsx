'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ChatbotVictoria.css';
import { SITE_KNOWLEDGE } from '@/data/siteKnowledge';
import { callOllama } from '@/utils/ollamaClient';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotVictoria = ({ initialOpen = false }: { initialOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
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
    
    if (qNorm.match(/(precio|costo|cuanto|vale|valor)/)) {
        return "Contamos con los precios más competitivos del mercado. Por ejemplo, una Biopsia Gástrica cuesta solo S/ 80 y los resultados están en 4 días. ¿Le gustaría que le envíe el tarifario completo por WhatsApp? 💰";
    }
    
    if (qNorm.match(/(donde|ubicacion|direccion|lugar|queda)/)) {
        return "Nuestra sede central está en Mz M2 lote 13 Jardines de Chillón, Puente Piedra, Lima. También ofrecemos recojo de muestras a domicilio en todo Lima. ¿Desea agendar un recojo? 📍";
    }

    if (qNorm.match(/(biopsia|cancer|tumor|maligno|estudio|citologia|papanicolaou)/)) {
        return "Somos expertos en diagnósticos oncológicos de alta precisión con más de 15 años de experiencia. Entregamos resultados en 3-4 días, lo cual es vital para iniciar cualquier tratamiento. ¿Tiene su orden médica a la mano? 🩺";
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
      // Logic: Contextual prompt including knowledge base
      const fullPrompt = `Contexto del Laboratorio: ${SITE_KNOWLEDGE}\n\nPregunta del Usuario: ${userMsg}`;
      
      const response = await callOllama(fullPrompt);
      
      setIsTyping(false);
      handleAvatarChange('hablando');
      
      if (response) {
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      } else {
        // Fallback to local simplified matching if Ollama fails
        const localResp = findLocalResponse(userMsg);
        setMessages(prev => [...prev, { 
          text: localResp || 'Entiendo perfectamente su consulta. Para darle una respuesta con la precisión médica que su caso requiere, me gustaría derivarlo con el Dr. Castillo vía WhatsApp. ¿Le parece bien? 🩺', 
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

    </>
  );
};

export default ChatbotVictoria;
