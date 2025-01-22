import axios from 'axios';
import { Task } from '../types/types';

const BASE_URL = '/api/tasks';

export const fetchTasks = async (
  search = '',
  sortBy = 'createdAt',
  sortDirection = 'desc',
  page = 1,
  limit = 10
): Promise<{ tasks: Task[]; totalPages: number }> => {
  const { data } = await axios.get(BASE_URL, {
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
  const { data } = await axios.post(BASE_URL, task);
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
  const { data } = await axios.patch(`${BASE_URL}/${id}`, task);
  return data;
};
