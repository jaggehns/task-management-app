import React, { useState, useCallback } from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskFilters from '../../components/TaskFilters/TaskFilters';
import TaskList from '../../components/TaskList/TaskList';
import TaskForm from '../../components/TaskForm/TaskForm';
import Modal from '../../components/Modal/Modal';
import { createTask, updateTask } from '../../services/taskService';
import { Task } from '../../types/types';
import './TaskListPage.css';
import { notifyError } from '../../errors/notifyError/notifyError';
import { SortBy, SortDirection } from '../../../server/schema/task.schema';

const TaskListPage: React.FC = () => {
  const { tasks, currentPage, totalPages, fetchTasks, goToPage, applyFilters } =
    useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useCallback(
    (search: string, sortBy: SortBy, sortDirection: SortDirection) => {
      applyFilters(search, sortBy, sortDirection);
    },
    []
  );

  const handleCreateTask = async (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => {
    try {
      await createTask(task);
      fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      notifyError(error);
    }
  };

  const handleUpdateTask = async (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => {
    if (selectedTask) {
      try {
        await updateTask(selectedTask.id, task);
        fetchTasks();
        setIsModalOpen(false);
        setSelectedTask(null);
      } catch (error) {
        notifyError(error);
      }
    }
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="task-list-page">
      <header className="page-header">
        <h1>Task Management</h1>
        <button className="primary-button" onClick={openCreateModal}>
          Create Task
        </button>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
          initialValues={
            selectedTask
              ? {
                  name: selectedTask.name,
                  description: selectedTask.description,
                  dueDate: selectedTask.dueDate
                }
              : { name: '', description: '', dueDate: '' }
          }
        />
      </Modal>
      <TaskFilters onSearch={handleSearch} />
      <TaskList tasks={tasks} onEdit={openEditModal} />
      <div className="pagination">
        <button
          className="secondary-button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="secondary-button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskListPage;
