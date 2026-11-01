import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Hourglass,
  Tag,
} from 'lucide-react';
import { Objective, ObjectiveFormData, ObjectiveStatus } from '../types/objective';

interface ObjectiveFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ObjectiveFormData, id?: string) => void;
  initialData?: Objective | null;
  defaultFormData?: ObjectiveFormData | null;
}

export const ObjectiveFormModal: React.FC<ObjectiveFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  defaultFormData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ObjectiveStatus>('a_iniciar');
  const [error, setError] = useState('');

  // Sincroniza dados quando o modal abre ou muda o initialData
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setDeadline(initialData.deadline || '');
      setStatus(initialData.status);
      setError('');
    } else if (defaultFormData) {
      setTitle(defaultFormData.title);
      setDescription(defaultFormData.description);
      setDeadline(defaultFormData.deadline);
      setStatus(defaultFormData.status);
      setError('');
    } else {
      // Padrão para novo objetivo: data sugerida em 7 dias
      const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setTitle('');
      setDescription('');
      setDeadline(defaultDate);
      setStatus('a_iniciar');
      setError('');
    }
  }, [initialData, defaultFormData, isOpen]);

  if (!isOpen) return null;

  const handleShortcutDays = (days: number) => {
    const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    setDeadline(d.toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor, informe o título do seu objetivo de estudo.');
      return;
    }

    if (!deadline) {
      setError('Por favor, selecione um prazo para o seu objetivo.');
      return;
    }

    setError('');
    onSubmit(
      {
        title: title.trim(),
        description: description.trim(),
        deadline,
        status,
      },
      initialData?.id
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Topo do Modal */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-bold text-slate-900">
                {isEditing ? 'Editar Objetivo de Estudo' : 'Cadastrar Novo Objetivo'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? 'Atualize os dados e acompanhe o avanço da sua meta'
                  : 'Comece definindo o resultado prático que quer alcançar'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            title="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Campo Título */}
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ex: Resolver 10 questões da prova de 2024 de Biologia"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-slate-900 placeholder-slate-400"
              maxLength={120}
              autoFocus
            />
            <p className="mt-1 text-2xs text-slate-500 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-indigo-500" />
              Dica: No estudo reverso, comece pelo desafio ou projeto prático que você quer resolver.
            </p>
          </div>

          {/* Campo Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Descrição e Contexto
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que vai fazer na prática e quais conceitos teóricos espera revisar se tiver dúvidas..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-slate-900 placeholder-slate-400"
              maxLength={500}
            />
            <div className="flex justify-between items-center text-2xs text-slate-400 mt-0.5">
              <span>Opcional, mas ajuda a manter o foco pedagógico</span>
              <span>{description.length}/500</span>
            </div>
          </div>

          {/* Campo Prazo com atalhos */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="deadline"
                className="text-xs font-semibold text-slate-700 flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>Prazo de Conclusão</span> <span className="text-rose-500">*</span>
              </label>

              {/* Atalhos de data */}
              <div className="flex items-center gap-1 text-2xs">
                <span className="text-slate-400 hidden sm:inline">Sugerir:</span>
                <button
                  type="button"
                  onClick={() => handleShortcutDays(3)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200"
                >
                  +3 dias
                </button>
                <button
                  type="button"
                  onClick={() => handleShortcutDays(7)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200"
                >
                  +1 semana
                </button>
                <button
                  type="button"
                  onClick={() => handleShortcutDays(30)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200"
                >
                  +1 mês
                </button>
              </div>
            </div>

            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-slate-900"
            />
          </div>

          {/* Campo Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Status do Objetivo
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                  status === 'a_iniciar'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 ring-1 ring-amber-400 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="a_iniciar"
                  checked={status === 'a_iniciar'}
                  onChange={() => setStatus('a_iniciar')}
                  className="sr-only"
                />
                <Hourglass className="w-4 h-4 mb-1 text-amber-600" />
                <span className="text-xs">A Iniciar</span>
              </label>

              <label
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                  status === 'em_andamento'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-900 ring-1 ring-indigo-400 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="em_andamento"
                  checked={status === 'em_andamento'}
                  onChange={() => setStatus('em_andamento')}
                  className="sr-only"
                />
                <Clock className="w-4 h-4 mb-1 text-indigo-600" />
                <span className="text-xs">Em Andamento</span>
              </label>

              <label
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                  status === 'concluido'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="concluido"
                  checked={status === 'concluido'}
                  onChange={() => setStatus('concluido')}
                  className="sr-only"
                />
                <CheckCircle2 className="w-4 h-4 mb-1 text-emerald-600" />
                <span className="text-xs">Concluído</span>
              </label>
            </div>
          </div>

          {/* Botões do Rodapé */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl transition shadow-sm shadow-indigo-300"
            >
              {isEditing ? 'Atualizar Objetivo' : 'Salvar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
