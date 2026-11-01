import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Objective } from '../types/objective';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  objective: Objective | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  objective,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !objective) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-rose-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <h3
                id="delete-dialog-title"
                className="text-base sm:text-lg font-bold text-slate-900"
              >
                Excluir objetivo de estudo?
              </h3>
              <p
                id="delete-dialog-desc"
                className="text-xs sm:text-sm text-slate-500 mt-1"
              >
                Esta ação não poderá ser desfeita. O objetivo abaixo será removido definitivamente do seu painel:
              </p>

              {/* Destaque do item a ser excluído */}
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2">
                  "{objective.title}"
                </p>
                {objective.deadline && (
                  <p className="text-2xs text-slate-400 mt-1">
                    Prazo registrado: {objective.deadline}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-xl transition shadow-xs shadow-rose-300"
            >
              <Trash2 className="w-4 h-4" />
              <span>Sim, Excluir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
