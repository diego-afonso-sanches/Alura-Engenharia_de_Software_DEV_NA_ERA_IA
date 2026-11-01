import React from 'react';
import { BookOpenCheck, SearchX, Plus, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onOpenCreate: () => void;
  onClearFilters?: () => void;
  onRestoreExamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onOpenCreate,
  onClearFilters,
  onRestoreExamples,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
          <SearchX className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Não localizamos nenhuma meta com os filtros ou termo de busca informado. Tente buscar com outros termos.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200"
          >
            Limpar filtros de busca
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50/30 border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-xs">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-xs">
        <BookOpenCheck className="w-8 h-8" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
        Nenhum objetivo de estudo cadastrado
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-md mx-auto">
        No <strong>Aprendiz</strong>, o estudo começa quando você define um problema ou desafio real a ser vencido. Que tal registrar sua primeira meta prática agora?
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl transition shadow-sm shadow-indigo-300"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar primeiro objetivo</span>
        </button>

        {onRestoreExamples && (
          <button
            type="button"
            onClick={onRestoreExamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Ver exemplos pedagógicos</span>
          </button>
        )}
      </div>
    </div>
  );
};
