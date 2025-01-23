import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { SortBy, SortDirection } from '../../../server/schema/task.schema';
import './TaskFilters.css';

interface TaskFiltersProps {
  onSearch: (
    search: string,
    sortBy: SortBy,
    sortDirection: SortDirection
  ) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CREATED_AT);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.DESC
  );

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    onSearch(debouncedSearch, sortBy, sortDirection);
  }, [debouncedSearch, sortBy, sortDirection, onSearch]);

  const handleSort = (field: SortBy) => {
    if (sortBy === field) {
      setSortDirection((prev) =>
        prev === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
      );
    } else {
      setSortBy(field);
      setSortDirection(SortDirection.ASC);
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
          className={`sort-option ${sortBy === SortBy.DUE_DATE ? 'active' : ''}`}
          onClick={() => handleSort(SortBy.DUE_DATE)}
        >
          Due Date{' '}
          {sortBy === SortBy.DUE_DATE &&
            (sortDirection === SortDirection.ASC ? '▲' : '▼')}
        </span>
        <span
          className={`sort-option ${sortBy === SortBy.CREATED_AT ? 'active' : ''}`}
          onClick={() => handleSort(SortBy.CREATED_AT)}
        >
          Created Date{' '}
          {sortBy === SortBy.CREATED_AT &&
            (sortDirection === SortDirection.ASC ? '▲' : '▼')}
        </span>
      </div>
    </div>
  );
};

export default TaskFilters;
