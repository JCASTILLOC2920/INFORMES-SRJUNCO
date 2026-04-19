'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SITE_KNOWLEDGE } from '@/data/siteKnowledge';
import { callOllama } from '@/utils/ollamaClient';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const SentinelChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            text: "Hola. Soy **Sentinel-V**, el asistente avanzado de JC PATH LAB. He sido desplegado para guiarle con precisión milimétrica en sus consultas médicas. ¿Qué estudio o informe desea coordinar hoy?",
            sender: 'bot'
          }
        ]);
      }, 500)
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);

    try {
      const systemPrompt = `Eres Sentinel-V, la IA soberana de JC PATH LAB.
      CONTEXTO: Eres parte de la infraestructura de Dictado y Patología del Dr. Josehp Castillo.
      PERSONALIDAD: Fría pero eficiente, extremadamente profesional, con matices de asistente militar (estilo Cortana). No usas emojis innecesarios.
      MISIÓN: Resolver dudas médicas y derivar pacientes al WhatsApp 986396733 para agendar.
      KNOWLEDGE: ${SITE_KNOWLEDGE.substring(0, 3000)}`;

      const response = await callOllama(userMsg, systemPrompt);
      setIsTyping(false);

      if (response) {
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "Detecto una interrupción en el enlace neural. Para una respuesta de precisión inmediata, le sugiero contactar directamente con nuestra central de despacho vía WhatsApp: **986 396 733**.", 
          sender: 'bot' 
        }]);
      }
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "Error de sistema. Por favor, contacte manualmente al 986 396 733.", sender: 'bot' }]);
    }
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--secondary)]">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="fixed bottom-6 right-6 z-chat pointer-events-none sm:bottom-10 sm:right-10">
      {/* NÚCLEO PULSANTE (TOGGLE) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto cursor-pointer relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-700 transform hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90 opacity-0 scale-0 invisible' : 'opacity-100 visible'}`}
      >
        <div className="absolute inset-0 bg-[var(--secondary)] rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 border-2 border-[var(--cyan-pulse)] rounded-full animate-pulse opacity-40"></div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--nexus-void)] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,141,227,0.4)] border border-white/20">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--cyan-pulse)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      {/* INTERFAZ DE CRISTAL (VENTANA) */}
      <div className={`pointer-events-auto absolute bottom-0 right-0 w-[90vw] max-w-[400px] h-[70vh] max-h-[600px] glass-card elite-shadow flex flex-col transition-all duration-700 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-90 translate-y-10 invisible'}`}>
        
        {/* HEADER DE COMANDO */}
        <div className="p-5 border-b border-white/10 bg-[var(--nexus-void)]/30 flex justify-between items-center rounded-t-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[var(--nexus-void)] border border-[var(--cyan-pulse)]/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 animate-pulse bg-[var(--cyan-pulse)]/10"></div>
                <div className="text-[var(--cyan-pulse)] text-xs font-black">S-V</div>
            </div>
            <div>
              <h3 className="text-white font-black text-sm tracking-widest uppercase">Sentinel-V</h3>
              <p className="text-[var(--secondary)] text-[10px] font-bold uppercase tracking-tighter">Interface Neuronal Activa</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* FEED DE DATOS (MENSAJES) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-500 animate-reveal ${
                msg.sender === 'user' 
                ? 'bg-[var(--secondary)] text-white shadow-lg rounded-tr-none' 
                : 'bg-white/10 text-white/90 border border-white/5 shadow-inner rounded-tl-none backdrop-blur-md'
              }`}
              dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
              />
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 px-4 py-2 rounded-2xl flex gap-1 items-center">
                <span className="w-1 h-1 bg-[var(--cyan-pulse)] rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-[var(--cyan-pulse)] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-[var(--cyan-pulse)] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* MÓDULO DE INYECCIÓN DE TEXTO */}
        <div className="p-4 bg-black/20 border-t border-white/5 rounded-b-[1.5rem]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Inyectar consulta..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--secondary)]/50 transition-colors"
            />
            <button 
                onClick={handleSend}
                className="bg-[var(--secondary)] text-white p-3 rounded-xl hover:bg-[var(--cyan-pulse)] hover:text-[var(--nexus-void)] transition-all active:scale-95 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentinelChatbot;
