import { PrismaClient, type Task } from '@prisma/client';

const prisma = new PrismaClient();

interface GetAllTasksOptions {
  sortBy?: string;
  search?: string;
  page: number;
  limit: number;
}

const createTask = async (
  taskData: Omit<Task, 'id' | 'createdAt'>
): Promise<Task> => {
  return await prisma.task.create({ data: taskData });
};

const getAllTasks = async ({
  sortBy,
  search,
  page,
  limit
}: GetAllTasksOptions): Promise<Task[]> => {
  const skip = (page - 1) * limit;

  return await prisma.task.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      : undefined,
    orderBy:
      sortBy === 'dueDate'
        ? { dueDate: 'asc' }
        : sortBy === 'createdAt'
          ? { createdAt: 'asc' }
          : undefined,
    skip,
    take: limit
  });
};

const getTaskById = async (id: string): Promise<Task | null> => {
  return await prisma.task.findUnique({ where: { id } });
};

const updateTask = async (
  id: string,
  data: Partial<Omit<Task, 'id' | 'createdAt'>>
): Promise<Task | null> => {
  return await prisma.task.update({ where: { id }, data });
};

export const taskModel = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask
};
