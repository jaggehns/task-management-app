import axios from 'axios';
import { Task } from '../types/types';

const BASE_URL = '/api/tasks';

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'An unexpected error occurred.';
  }
  return 'An unexpected error occurred.';
};

export const fetchTasks = async (
  search = '',
  sortBy = 'createdAt',
  sortDirection = 'desc',
  page = 1,
  limit = 10
): Promise<{ tasks: Task[]; totalPages: number }> => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { search, sortBy, sortDirection, page, limit }
    });
    const totalPages = Math.ceil(data.total / limit);
    return { tasks: data.tasks, totalPages };
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error fetching tasks:', errorMessage);
    throw errorMessage;
  }
};

export const createTask = async (task: {
  name: string;
  description: string;
  dueDate: string;
}): Promise<Task> => {
  try {
    const { data } = await axios.post(BASE_URL, task);
    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error creating task:', errorMessage);
    throw errorMessage;
  }
};

export const updateTask = async (
  id: string,
  task: {
    name: string;
    description: string;
    dueDate: string;
  }
): Promise<Task> => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/${id}`, task);
    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(`Error updating task (ID: ${id}):`, errorMessage);
    throw errorMessage;
  }
};
