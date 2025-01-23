import { object, string, TypeOf } from 'zod';
import { DateTime } from 'luxon';

const isValidDate = (value: string): boolean => {
  const date = DateTime.fromISO(value, { zone: 'utc' });
  return date.isValid;
};

export const createTaskSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }).min(
      1,
      'Name must not be empty'
    ),
    description: string({ required_error: 'Description is required' }).min(
      1,
      'Description must not be empty'
    ),
    dueDate: string({ required_error: 'Due date is required' }).refine(
      isValidDate,
      { message: 'Invalid ISO 8601 date format' }
    )
  })
});

export const updateTaskSchema = object({
  body: object({
    name: string().min(1, 'Name must not be empty').optional(),
    description: string().min(1, 'Description must not be empty').optional(),
    dueDate: string()
      .refine((value) => (value ? isValidDate(value) : true), {
        message: 'Invalid ISO 8601 date format'
      })
      .optional()
  })
});

export const getTasksSchema = object({
  query: object({
    sortBy: string().optional(),
    search: string().optional(),
    page: string()
      .refine((val) => !isNaN(parseInt(val, 10)), {
        message: 'Page must be a valid number'
      })
      .optional(),
    limit: string()
      .refine((val) => !isNaN(parseInt(val, 10)), {
        message: 'Limit must be a valid number'
      })
      .optional()
  })
});

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortBy {
  DUE_DATE = 'dueDate',
  CREATED_AT = 'createdAt'
}

export interface GetAllTasksOptions {
  sortDirection?: SortDirection;
  sortBy?: SortBy;
  search?: string;
  page: number;
  limit: number;
}

export type GetTasksInput = TypeOf<typeof getTasksSchema>;
export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
