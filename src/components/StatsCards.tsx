import React from 'react';
import { Target, CheckCircle2, Clock, Hourglass, TrendingUp } from 'lucide-react';
import { Objective } from '../types/objective';

interface StatsCardsProps {
  objectives: Objective[];
  onFilterByStatus?: (status: string) => void;
  currentFilter?: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  objectives,
  onFilterByStatus,
  currentFilter = 'todos',
}) => {
  const total = objectives.length;
  const concluidos = objectives.filter((o) => o.status === 'concluido').length;
  const emAndamento = objectives.filter((o) => o.status === 'em_andamento').length;
  const aIniciar = objectives.filter((o) => o.status === 'a_iniciar').length;

  const percentualConclusao = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  const cards = [
    {
      id: 'todos',
      label: 'Total de Objetivos',
      count: total,
      icon: Target,
      color: 'text-slate-700',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      activeRing: 'ring-2 ring-slate-400 bg-slate-100/80',
    },
    {
      id: 'a_iniciar',
      label: 'A Iniciar',
      count: aIniciar,
      icon: Hourglass,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
      activeRing: 'ring-2 ring-amber-400 bg-amber-100/60',
    },
    {
      id: 'em_andamento',
      label: 'Em Andamento',
      count: emAndamento,
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50/60',
      borderColor: 'border-indigo-200',
      activeRing: 'ring-2 ring-indigo-400 bg-indigo-100/60',
    },
    {
      id: 'concluido',
      label: 'Concluídos',
      count: concluidos,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200',
      activeRing: 'ring-2 ring-emerald-400 bg-emerald-100/60',
    },
  ];

  return (
    <div className="mb-6 space-y-3">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isActive = currentFilter === card.id;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onFilterByStatus && onFilterByStatus(card.id)}
              className={`p-3 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                card.bgColor
              } ${card.borderColor} ${
                isActive ? card.activeRing : 'hover:shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-500">
                  {card.label}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {card.count}
                </span>
                <span className="text-2xs text-slate-400">
                  {card.count === 1 ? 'meta' : 'metas'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Barra de Progresso Geral */}
      {total > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span>Progresso dos seus estudos</span>
            </div>
            <span className="font-bold text-slate-900">
              {percentualConclusao}% concluído
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{ width: `${(concluidos / total) * 100}%` }}
              title={`Concluídos: ${concluidos}`}
            />
            <div
              className="bg-indigo-500 transition-all duration-500"
              style={{ width: `${(emAndamento / total) * 100}%` }}
              title={`Em Andamento: ${emAndamento}`}
            />
            <div
              className="bg-amber-400 transition-all duration-500"
              style={{ width: `${(aIniciar / total) * 100}%` }}
              title={`A Iniciar: ${aIniciar}`}
            />
          </div>

          <div className="flex items-center gap-4 text-2xs text-slate-500 mt-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>{concluidos} concluído(s)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              <span>{emAndamento} em andamento</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>{aIniciar} a iniciar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
