import { type Task } from '@prisma/client';
import db from '../modules/db.js';
import { GetAllTasksOptions, SortDirection } from '../schema/task.schema.js';

const createTask = async (
  taskData: Omit<Task, 'id' | 'createdAt'>
): Promise<Task> => {
  return await db.task.create({ data: taskData });
};

const getAllTasksWithCount = async ({
  sortBy,
  sortDirection,
  search,
  page,
  limit
}: GetAllTasksOptions): Promise<{ tasks: Task[]; total: number }> => {
  const skip = (page - 1) * limit;

  const [tasks, total] = await db.$transaction([
    db.task.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        : undefined,
      orderBy: sortBy
        ? {
            [sortBy]: sortDirection
          }
        : {
            createdAt: SortDirection.DESC
          },
      skip,
      take: limit
    }),
    db.task.count({
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        : undefined
    })
  ]);

  return { tasks, total };
};

const getTaskById = async (id: string): Promise<Task | null> => {
  return await db.task.findUnique({ where: { id } });
};

const updateTask = async (
  id: string,
  data: Partial<Omit<Task, 'id' | 'createdAt'>>
): Promise<Task | null> => {
  return await db.task.update({ where: { id }, data });
};

export const taskModel = {
  createTask,
  getAllTasksWithCount,
  getTaskById,
  updateTask
};
