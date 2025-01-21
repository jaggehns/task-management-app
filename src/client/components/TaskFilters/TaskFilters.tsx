import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './TaskFilters.css';

interface TaskFiltersProps {
  onSearch: (search: string, sortBy: string, sortDirection: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    onSearch(debouncedSearch, sortBy, sortDirection);
  }, [debouncedSearch, sortBy, sortDirection, onSearch]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="task-filters">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
      />
      <div className="sort-options">
        <span>Sort by:</span>
        <span
          className={`sort-option ${sortBy === 'dueDate' ? 'active' : ''}`}
          onClick={() => handleSort('dueDate')}
        >
          Due Date{' '}
          {sortBy === 'dueDate' && (sortDirection === 'asc' ? '▲' : '▼')}
        </span>
        <span
          className={`sort-option ${sortBy === 'createdAt' ? 'active' : ''}`}
          onClick={() => handleSort('createdAt')}
        >
          Created Date{' '}
          {sortBy === 'createdAt' && (sortDirection === 'asc' ? '▲' : '▼')}
        </span>
      </div>
    </div>
  );
};

export default TaskFilters;
