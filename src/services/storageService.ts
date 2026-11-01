import { Objective, ObjectiveFormData } from '../types/objective';

const STORAGE_KEY = 'aprendiz_objetivos_estudo_v1';

// Dados iniciais acolhedores para estudantes iniciantes entenderem o Estudo Reverso na prática
const INITIAL_DEMO_OBJECTIVES: Objective[] = [
  {
    id: 'obj-exemplo-1',
    title: 'Construir meu primeiro Todo-List em React',
    description: 'Em vez de assistir 40 horas de teoria, vou tentar criar o projeto primeiro. Quando travar no estado de formulários, estudo o hook useState focado na solução.',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obj-exemplo-2',
    title: 'Resolver 5 questões de prova antiga de Matemática Financeira',
    description: 'Estudo reverso: fazer a prova sem estudar antes para descobrir quais fórmulas realmente caem e onde sinto maior dificuldade.',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'a_iniciar',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'obj-exemplo-3',
    title: 'Escrever uma apresentação pessoal de 1 minuto em Inglês',
    description: 'Redigir a apresentação e praticar a pronúncia. O estudo da gramática virá da correção das frases que eu mesmo montei.',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date().toISOString(),
  },
];

export const storageService = {
  /**
   * Obtém todos os objetivos salvos no localStorage.
   * Se for o primeiro acesso, inicializa com exemplos acolhedores.
   */
  getObjectives(): Objective[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Inicializa com dados amigáveis de exemplo para demonstrar o conceito
        this.saveObjectives(INITIAL_DEMO_OBJECTIVES);
        return INITIAL_DEMO_OBJECTIVES;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista de objetivos no localStorage.
   */
  saveObjectives(objectives: Objective[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  /**
   * Cria e salva um novo objetivo.
   */
  createObjective(formData: ObjectiveFormData): Objective {
    const objectives = this.getObjectives();
    const newObjective: Objective = {
      id: `obj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      status: formData.status,
      createdAt: new Date().toISOString(),
    };

    const updated = [newObjective, ...objectives];
    this.saveObjectives(updated);
    return newObjective;
  },

  /**
   * Atualiza um objetivo existente.
   */
  updateObjective(id: string, formData: Partial<ObjectiveFormData>): Objective | null {
    const objectives = this.getObjectives();
    const index = objectives.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updatedObjective: Objective = {
      ...objectives[index],
      ...formData,
      title: formData.title ? formData.title.trim() : objectives[index].title,
      description: formData.description !== undefined ? formData.description.trim() : objectives[index].description,
      updatedAt: new Date().toISOString(),
    };

    objectives[index] = updatedObjective;
    this.saveObjectives(objectives);
    return updatedObjective;
  },

  /**
   * Remove um objetivo pelo ID.
   */
  deleteObjective(id: string): boolean {
    const objectives = this.getObjectives();
    const filtered = objectives.filter((item) => item.id !== id);
    if (filtered.length !== objectives.length) {
      this.saveObjectives(filtered);
      return true;
    }
    return false;
  },

  /**
   * Restaura exemplos didáticos de estudo reverso
   */
  resetWithExamples(): Objective[] {
    this.saveObjectives(INITIAL_DEMO_OBJECTIVES);
    return INITIAL_DEMO_OBJECTIVES;
  },

  /**
   * Limpa todos os objetivos
   */
  clearAll(): void {
    this.saveObjectives([]);
  },
};
