import React from 'react';
import { BookOpen, Plus, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onToggleExplainer: () => void;
  isExplainerOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  onToggleExplainer,
  isExplainerOpen,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Logo e Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Aprendiz
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Estudo Reverso
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Organize seus objetivos aprendendo primeiro pela prática
              </p>
            </div>
          </div>

          {/* Ações do Topo */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={onToggleExplainer}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                isExplainerOpen
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="Entenda como funciona o Estudo Reverso"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>O que é Estudo Reverso?</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition shadow-sm shadow-indigo-300"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Novo Objetivo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
