import React, { useState, useEffect } from 'react';
import './TaskFilters.css';

interface TaskFiltersProps {
  onSearch: (search: string, sortBy: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(search, sortBy);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search, sortBy, onSearch]);

  return (
    <div className="task-filters">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="filter-select"
      >
        <option value="">Sort by</option>
        <option value="dueDate">Due Date</option>
        <option value="createdAt">Created Date</option>
      </select>
    </div>
  );
};

export default TaskFilters;
