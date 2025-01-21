export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  createdAt: string;
  status: 'NOT_URGENT' | 'DUE_SOON' | 'OVERDUE';
}
