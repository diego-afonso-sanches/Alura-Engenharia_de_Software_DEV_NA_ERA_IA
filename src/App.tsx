/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  BookOpen,
  Sparkles,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  GraduationCap,
} from 'lucide-react';
import { Objective, ObjectiveFormData, ObjectiveStatus, FilterStatus } from './types/objective';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { FilterBar } from './components/FilterBar';
import { ObjectiveCard } from './components/ObjectiveCard';
import { ObjectiveFormModal } from './components/ObjectiveFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { ReverseStudyExplainer } from './components/ReverseStudyExplainer';

export default function App() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('todos');
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  // Estados dos Modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState<Objective | null>(null);
  const [defaultTemplateData, setDefaultTemplateData] = useState<ObjectiveFormData | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [objectiveToDelete, setObjectiveToDelete] = useState<Objective | null>(null);

  // Mensagem toast de feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Carrega os objetivos persistidos no localStorage na inicialização
  useEffect(() => {
    const loaded = storageService.getObjectives();
    setObjectives(loaded);
  }, []);

  // Salvar / Atualizar
  const handleSaveObjective = (formData: ObjectiveFormData, id?: string) => {
    if (id) {
      // Atualizar existente
      const updated = storageService.updateObjective(id, formData);
      if (updated) {
        setObjectives((prev) => prev.map((item) => (item.id === id ? updated : item)));
        showToast('Objetivo atualizado com sucesso!');
      }
    } else {
      // Criar novo
      const created = storageService.createObjective(formData);
      setObjectives((prev) => [created, ...prev]);
      showToast('Novo objetivo cadastrado com sucesso!');
    }
  };

  // Mudança rápida de status direto no card
  const handleQuickStatusChange = (id: string, newStatus: ObjectiveStatus) => {
    const updated = storageService.updateObjective(id, { status: newStatus });
    if (updated) {
      setObjectives((prev) => prev.map((item) => (item.id === id ? updated : item)));
      const statusLabel =
        newStatus === 'concluido'
          ? 'Concluído! Parabéns!'
          : newStatus === 'em_andamento'
          ? 'Em Andamento'
          : 'A Iniciar';
      showToast(`Status atualizado para: ${statusLabel}`);
    }
  };

  // Fluxo de Exclusão com confirmação
  const handleRequestDelete = (objective: Objective) => {
    setObjectiveToDelete(objective);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (objectiveToDelete) {
      const success = storageService.deleteObjective(objectiveToDelete.id);
      if (success) {
        setObjectives((prev) => prev.filter((item) => item.id !== objectiveToDelete.id));
        showToast('Objetivo excluído com sucesso.');
      }
      setIsDeleteModalOpen(false);
      setObjectiveToDelete(null);
    }
  };

  // Abrir modal de criação
  const handleOpenCreateModal = () => {
    setEditingObjective(null);
    setDefaultTemplateData(null);
    setIsFormModalOpen(true);
  };

  // Abrir modal de edição
  const handleOpenEditModal = (obj: Objective) => {
    setEditingObjective(obj);
    setDefaultTemplateData(null);
    setIsFormModalOpen(true);
  };

  // Usar sugestão rápida do explicador de estudo reverso
  const handleUseTemplate = (template: ObjectiveFormData) => {
    setEditingObjective(null);
    setDefaultTemplateData(template);
    setIsFormModalOpen(true);
  };

  // Restaurar dados de exemplo
  const handleRestoreExamples = () => {
    const restored = storageService.resetWithExamples();
    setObjectives(restored);
    showToast('Exemplos práticos de Estudo Reverso restaurados!');
  };

  // Filtragem de objetivos
  const filteredObjectives = useMemo(() => {
    return objectives.filter((item) => {
      // Filtro de status
      const matchesStatus =
        selectedStatus === 'todos' ? true : item.status === selectedStatus;

      // Filtro de busca textual
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [objectives, selectedStatus, searchTerm]);

  // Contadores para o FilterBar
  const counts = useMemo(() => {
    return {
      todos: objectives.length,
      a_iniciar: objectives.filter((o) => o.status === 'a_iniciar').length,
      em_andamento: objectives.filter((o) => o.status === 'em_andamento').length,
      concluido: objectives.filter((o) => o.status === 'concluido').length,
    };
  }, [objectives]);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 border border-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        onToggleExplainer={() => setIsExplainerOpen(!isExplainerOpen)}
        isExplainerOpen={isExplainerOpen}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Painel Explicativo de Estudo Reverso (colapsável) */}
        <ReverseStudyExplainer
          isOpen={isExplainerOpen}
          onClose={() => setIsExplainerOpen(false)}
          onUseTemplate={handleUseTemplate}
        />

        {/* Estatísticas e Quantidade de Objetivos */}
        <StatsCards
          objectives={objectives}
          onFilterByStatus={(status) => setSelectedStatus(status as FilterStatus)}
          currentFilter={selectedStatus}
        />

        {/* Barra de Filtros e Busca (somente se houver objetivos cadastrados) */}
        {objectives.length > 0 && (
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            counts={counts}
          />
        )}

        {/* Listagem de Objetivos ou Estados Vazios */}
        {objectives.length === 0 ? (
          <EmptyState
            isFiltered={false}
            onOpenCreate={handleOpenCreateModal}
            onRestoreExamples={handleRestoreExamples}
          />
        ) : filteredObjectives.length === 0 ? (
          <EmptyState
            isFiltered={true}
            onOpenCreate={handleOpenCreateModal}
            onClearFilters={() => {
              setSearchTerm('');
              setSelectedStatus('todos');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredObjectives.map((obj) => (
              <ObjectiveCard
                key={obj.id}
                objective={obj}
                onEdit={handleOpenEditModal}
                onRequestDelete={handleRequestDelete}
                onQuickStatusChange={handleQuickStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Rodapé Acolhedor */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">Aprendiz</span>
            <span>— Seu aliado no estudo reverso focado em resultados.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestoreExamples}
              type="button"
              className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
              title="Restaurar dados de exemplo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar exemplos</span>
            </button>
            <span>•</span>
            <span>Salvo localmente no seu navegador</span>
          </div>
        </div>
      </footer>

      {/* Modal de Cadastro / Edição */}
      <ObjectiveFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingObjective(null);
          setDefaultTemplateData(null);
        }}
        onSubmit={handleSaveObjective}
        initialData={editingObjective}
        defaultFormData={defaultTemplateData}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        objective={objectiveToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setObjectiveToDelete(null);
        }}
      />
    </div>
  );
}
