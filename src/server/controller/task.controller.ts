import { type Request, type Response } from 'express';
import {
  CreateTaskInput,
  SortBy,
  SortDirection,
  UpdateTaskInput
} from '../schema/task.schema.js';
import { HTTP_STATUS } from '../utils/httpsUtils.js';
import { taskService } from '../service/task.service.js';

export const createTask = async (
  req: Request<unknown, unknown, CreateTaskInput['body']>,
  res: Response
): Promise<void> => {
  const task = await taskService.createTask(req.body);
  res.status(HTTP_STATUS.OK_POST).json(task);
};

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    sortBy,
    sortDirection,
    search,
    page = '1',
    limit = '10'
  } = req.query as {
    sortBy?: SortBy;
    sortDirection?: SortDirection;
    search?: string;
    page?: string;
    limit?: string;
  };

  const { tasks, total } = await taskService.getAllTasks(
    sortBy,
    sortDirection,
    search,
    parseInt(page, 10),
    parseInt(limit, 10)
  );

  res.status(HTTP_STATUS.OK_GET).json({ tasks, total });
};

export const updateTask = async (
  req: Request<{ id: string }, unknown, UpdateTaskInput['body']>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updatedTask = await taskService.updateTask(id, req.body);

  res.status(HTTP_STATUS.OK_POST).json(updatedTask);
};
