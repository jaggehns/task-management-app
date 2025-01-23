import { Task } from '../types/types';
import { SortBy, SortDirection } from '../../server/schema/task.schema';
import apiClient from '../utils/axiosClient';

export const fetchTasks = async (
  search = '',
  sortBy: SortBy = SortBy.CREATED_AT,
  sortDirection: SortDirection = SortDirection.DESC,
  page = 1,
  limit = 10
): Promise<{ tasks: Task[]; totalPages: number }> => {
  const { data } = await apiClient.get('/tasks', {
    params: { search, sortBy, sortDirection, page, limit }
  });
  const totalPages = Math.ceil(data.total / limit);
  return { tasks: data.tasks, totalPages };
};

export const createTask = async (task: {
  name: string;
  description: string;
  dueDate: string;
}): Promise<Task> => {
  const { data } = await apiClient.post('/tasks', task);
  return data;
};

export const updateTask = async (
  id: string,
  task: {
    name: string;
    description: string;
    dueDate: string;
  }
): Promise<Task> => {
  const { data } = await apiClient.patch(`/tasks/${id}`, task);
  return data;
};
