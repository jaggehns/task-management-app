import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService';
import { Task } from '../types/types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllTasks = async (search = '', sortBy = '', page = 1) => {
    try {
      const data = await fetchTasks(search, sortBy, page);
      setTasks(data.tasks || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchAllTasks('', '', currentPage);
  }, [currentPage]);

  return {
    tasks,
    currentPage,
    totalPages,
    fetchTasks: fetchAllTasks,
    goToPage: setCurrentPage
  };
};
