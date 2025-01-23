import { taskModel } from '../model/task.model.js';
import {
  CreateTaskInput,
  SortBy,
  SortDirection,
  UpdateTaskInput
} from '../schema/task.schema.js';
import { Status, type Task } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../common/errors.js';
import { DateTime } from 'luxon';

const calculateTaskStatus = (dueDate: DateTime): Status => {
  const now = DateTime.utc().startOf('day');
  const dueDateNormalized = dueDate.startOf('day');

  const diffDays = dueDateNormalized.diff(now, 'days').days;

  if (diffDays < 0) return Status.OVERDUE;
  if (diffDays <= 7) return Status.DUE_SOON;
  return Status.NOT_URGENT;
};

const createTask = async (input: CreateTaskInput['body']): Promise<Task> => {
  const dueDate = DateTime.fromISO(input.dueDate, { zone: 'utc' });

  if (!dueDate.isValid) {
    throw new BadRequestError('Invalid due date format.');
  }

  const status = calculateTaskStatus(dueDate);

  return await taskModel.createTask({
    ...input,
    dueDate: dueDate.toJSDate(),
    status
  });
};

const getAllTasks = async (
  sortBy = SortBy.CREATED_AT,
  sortDirection = SortDirection.DESC,
  search?: string,
  page = 1,
  limit = 10
): Promise<{ tasks: Task[]; total: number }> => {
  if (page <= 0 || limit <= 0) {
    throw new BadRequestError('Page and limit must be positive numbers.');
  }

  return taskModel.getAllTasksWithCount({
    sortBy,
    sortDirection,
    search,
    page,
    limit
  });
};

const updateTask = async (
  id: string,
  input: UpdateTaskInput['body']
): Promise<Task | null> => {
  const existingTask = await taskModel.getTaskById(id);

  if (!existingTask) {
    throw new NotFoundError('Task not found.');
  }

  const dueDate = input.dueDate
    ? DateTime.fromISO(input.dueDate, { zone: 'utc' })
    : null;

  if (dueDate && !dueDate.isValid) {
    throw new BadRequestError('Invalid due date format.');
  }

  const status = dueDate ? calculateTaskStatus(dueDate) : existingTask.status;

  return await taskModel.updateTask(id, {
    ...input,
    dueDate: dueDate?.toJSDate(),
    status
  });
};

export const taskService = {
  createTask,
  getAllTasks,
  updateTask
};
