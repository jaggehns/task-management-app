import React from 'react';
import { Task } from '../../types/types';
import { formatDate } from '../../utils/dateUtils';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'NOT_URGENT':
        return 'status not-urgent';
      case 'DUE_SOON':
        return 'status due-soon';
      case 'OVERDUE':
        return 'status overdue';
      default:
        return 'status unknown';
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.name}</h3>
        <span className={getStatusClass(task.status)}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-dates">
        <p>
          <strong>Due Date:</strong> {formatDate(task.dueDate)}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(task.createdAt)}
        </p>
      </div>
      <button className="edit-button" onClick={() => onEdit(task.id)}>
        Edit Task
      </button>
    </div>
  );
};

export default TaskCard;
