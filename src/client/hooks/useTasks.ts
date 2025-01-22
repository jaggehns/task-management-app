import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService';
import { Task } from '../types/types';
import { notifyError } from '../errors/notifyError/notifyError';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllTasks = async (
    search = '',
    sortBy = '',
    sortDirection = 'asc',
    page = 1,
    limit = 10
  ) => {
    try {
      const { tasks, totalPages } = await fetchTasks(
        search,
        sortBy,
        sortDirection,
        page,
        limit
      );
      setTasks(tasks || []);
      setTotalPages(totalPages || 1);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : 'An unexpected error occurred';
      notifyError(errorMessage);
    }
  };

  useEffect(() => {
    fetchAllTasks('', '', 'asc', currentPage, 10);
  }, [currentPage]);

  return {
    tasks,
    currentPage,
    totalPages,
    fetchTasks: fetchAllTasks,
    goToPage: setCurrentPage
  };
};
