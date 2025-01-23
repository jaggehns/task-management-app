import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService';
import { Task } from '../types/types';
import { notifyError } from '../errors/notifyError/notifyError';
import { SortBy, SortDirection } from '../../server/schema/task.schema';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: SortBy.CREATED_AT,
    sortDirection: SortDirection.DESC
  });

  const fetchAllTasks = async (
    search = filters.search,
    sortBy = filters.sortBy,
    sortDirection = filters.sortDirection,
    page = currentPage,
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
      notifyError(error);
    }
  };

  const applyFilters = (
    search: string,
    sortBy: SortBy,
    sortDirection: SortDirection
  ) => {
    setFilters({ search, sortBy, sortDirection });
    setCurrentPage(1);
    fetchAllTasks(search, sortBy, sortDirection, 1);
  };

  useEffect(() => {
    fetchAllTasks(
      filters.search,
      filters.sortBy,
      filters.sortDirection,
      currentPage
    );
  }, [currentPage]);

  return {
    tasks,
    currentPage,
    totalPages,
    fetchTasks: fetchAllTasks,
    goToPage: setCurrentPage,
    applyFilters
  };
};
