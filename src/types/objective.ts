export type ObjectiveStatus = 'a_iniciar' | 'em_andamento' | 'concluido';

export interface Objective {
  id: string;
  title: string;
  description: string;
  deadline: string; // Formato YYYY-MM-DD
  status: ObjectiveStatus;
  createdAt: string; // ISO String
  updatedAt?: string; // ISO String
}

export type ObjectiveFormData = {
  title: string;
  description: string;
  deadline: string;
  status: ObjectiveStatus;
};

export type FilterStatus = 'todos' | ObjectiveStatus;

export interface StatusConfig {
  label: string;
  badgeClass: string;
  borderClass: string;
  bgLight: string;
  dotColor: string;
}

export const STATUS_CONFIG: Record<ObjectiveStatus, StatusConfig> = {
  a_iniciar: {
    label: 'A Iniciar',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    borderClass: 'border-l-amber-500',
    bgLight: 'bg-amber-50/50',
    dotColor: 'bg-amber-500',
  },
  em_andamento: {
    label: 'Em Andamento',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    borderClass: 'border-l-indigo-600',
    bgLight: 'bg-indigo-50/50',
    dotColor: 'bg-indigo-600',
  },
  concluido: {
    label: 'Concluído',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    borderClass: 'border-l-emerald-600',
    bgLight: 'bg-emerald-50/50',
    dotColor: 'bg-emerald-600',
  },
};
