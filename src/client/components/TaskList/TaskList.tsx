import React from 'react';
import { Task } from '../../types/types';
import TaskCard from '../TaskCard/TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], onEdit }) => {
  if (!tasks.length) {
    return <div>No tasks available.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;
