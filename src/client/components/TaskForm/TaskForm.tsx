import React, { useState, useEffect } from 'react';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => void;
  initialValues?: { name: string; description: string; dueDate: string };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(
    initialValues?.description || ''
  );
  const [dueDate, setDueDate] = useState('');

  // Map the date back in the format YYYY-MM-DD for editing
  useEffect(() => {
    if (initialValues?.dueDate) {
      const formattedDate = new Date(initialValues.dueDate)
        .toISOString()
        .split('T')[0];
      setDueDate(formattedDate);
    }
  }, [initialValues?.dueDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="primary-button">
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
