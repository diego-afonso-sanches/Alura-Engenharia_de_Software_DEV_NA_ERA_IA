import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { FilterStatus, STATUS_CONFIG } from '../types/objective';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  counts: {
    todos: number;
    a_iniciar: number;
    em_andamento: number;
    concluido: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  counts,
}) => {
  const filterOptions: Array<{ id: FilterStatus; label: string; count: number }> = [
    { id: 'todos', label: 'Todos', count: counts.todos },
    { id: 'a_iniciar', label: STATUS_CONFIG.a_iniciar.label, count: counts.a_iniciar },
    { id: 'em_andamento', label: STATUS_CONFIG.em_andamento.label, count: counts.em_andamento },
    { id: 'concluido', label: STATUS_CONFIG.concluido.label, count: counts.concluido },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 mb-6 shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título ou descrição do objetivo..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              title="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">Filtrar:</span>
        </div>
      </div>

      {/* Abas / Filtros de Status */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {filterOptions.map((opt) => {
          const isSelected = selectedStatus === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onStatusChange(opt.id)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-2xs ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
