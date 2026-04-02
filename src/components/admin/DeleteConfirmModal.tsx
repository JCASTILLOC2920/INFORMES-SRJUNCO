'use client';
import { useState } from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#001a2d]/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative z-10 border border-red-100 animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div className="text-center">
            <h2 className="text-[1.25rem] font-black text-[#002a45] uppercase tracking-wider mb-2">Protocolo de Purga</h2>
            <p className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">¿Desea eliminar permanentemente el registro:<br/><span className="text-[#002a45]">{title}</span>?</p>
          </div>
          <div className="flex gap-4 w-full pt-4">
            <button onClick={onClose} className="flex-1 bg-gray-50 text-[#64748b] py-4 rounded-2xl font-black uppercase text-[0.75rem] tracking-widest hover:bg-gray-100 transition-all">Cancelar</button>
            <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black uppercase text-[0.75rem] tracking-widest shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95">Purga Definitiva</button>
          </div>
        </div>
      </div>
    </div>
  );
}
