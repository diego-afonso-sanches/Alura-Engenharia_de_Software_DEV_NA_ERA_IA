import React, { useState } from 'react';
import {
  Calendar,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  Hourglass,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Objective, ObjectiveStatus, STATUS_CONFIG } from '../types/objective';

interface ObjectiveCardProps {
  objective: Objective;
  onEdit: (objective: Objective) => void;
  onRequestDelete: (objective: Objective) => void;
  onQuickStatusChange: (id: string, newStatus: ObjectiveStatus) => void;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  objective,
  onEdit,
  onRequestDelete,
  onQuickStatusChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusInfo = STATUS_CONFIG[objective.status];

  // Cálculo e formatação da data de prazo
  const formatDeadline = (dateString: string) => {
    if (!dateString) return { formatted: 'Sem prazo', urgencyClass: 'text-slate-500', label: '' };

    // Evitar problemas de timezone dividindo YYYY-MM-DD
    const [year, month, day] = dateString.split('-').map(Number);
    const deadlineDate = new Date(year, month - 1, day);
    
    // Hoje zerado
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const formatted = deadlineDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    if (objective.status === 'concluido') {
      return {
        formatted,
        urgencyClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        label: 'Meta atingida',
      };
    }

    if (diffDays < 0) {
      return {
        formatted,
        urgencyClass: 'text-rose-700 bg-rose-50 border-rose-200',
        label: `Vencido há ${Math.abs(diffDays)} dia(s)`,
      };
    } else if (diffDays === 0) {
      return {
        formatted,
        urgencyClass: 'text-amber-800 bg-amber-50 border-amber-300 font-semibold',
        label: 'Vence hoje!',
      };
    } else if (diffDays === 1) {
      return {
        formatted,
        urgencyClass: 'text-amber-700 bg-amber-50 border-amber-200',
        label: 'Amanhã',
      };
    } else {
      return {
        formatted,
        urgencyClass: 'text-slate-700 bg-slate-50 border-slate-200',
        label: `Em ${diffDays} dias`,
      };
    }
  };

  const deadlineMeta = formatDeadline(objective.deadline);

  // Status icons
  const getStatusIcon = (status: ObjectiveStatus) => {
    switch (status) {
      case 'concluido':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'em_andamento':
        return <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      case 'a_iniciar':
      default:
        return <Hourglass className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
    }
  };

  const isLongDescription = objective.description && objective.description.length > 130;

  return (
    <article
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden border-l-4 ${statusInfo.borderClass}`}
    >
      <div className="p-4 sm:p-5">
        {/* Topo do Card: Status e Prazo */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {/* Seletor rápido de status */}
          <div className="relative inline-flex items-center">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeClass}`}
            >
              {getStatusIcon(objective.status)}
              <span>{statusInfo.label}</span>
            </span>
          </div>

          {/* Prazo */}
          <div
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${deadlineMeta.urgencyClass}`}
            title={`Prazo final: ${deadlineMeta.formatted}`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{deadlineMeta.formatted}</span>
            {deadlineMeta.label && (
              <span className="text-2xs opacity-90 font-medium">({deadlineMeta.label})</span>
            )}
          </div>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 ${
            objective.status === 'concluido' ? 'line-through text-slate-500' : ''
          }`}
        >
          {objective.title}
        </h3>

        {/* Descrição */}
        {objective.description ? (
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className={!isExpanded && isLongDescription ? 'line-clamp-3' : ''}>
              {objective.description}
            </p>
            {isLongDescription && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                {isExpanded ? (
                  <>
                    <span>Ver menos</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Ler descrição completa</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Sem descrição detalhada.</p>
        )}
      </div>

      {/* Rodapé de Ações do Card */}
      <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Ação rápida de avanço de status */}
        <div className="flex items-center gap-1">
          {objective.status !== 'concluido' ? (
            <button
              type="button"
              onClick={() => onQuickStatusChange(objective.id, 'concluido')}
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/70 px-2 py-1 rounded-md transition-colors"
              title="Marcar como Concluído"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Concluir</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onQuickStatusChange(objective.id, 'em_andamento')}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 hover:text-indigo-800 hover:bg-indigo-100/70 px-2 py-1 rounded-md transition-colors"
              title="Reabrir meta em andamento"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Reabrir</span>
            </button>
          )}
        </div>

        {/* Botões Editar e Excluir */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(objective)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
            title="Editar informações do objetivo"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestDelete(objective)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition-colors"
            title="Excluir objetivo (com confirmação)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </article>
  );
};
