import { PrismaClient, type Task } from '@prisma/client';

const prisma = new PrismaClient();

interface GetAllTasksOptions {
  sortDirection?: 'asc' | 'desc';
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

const getAllTasksWithCount = async ({
  sortBy,
  sortDirection,
  search,
  page,
  limit
}: GetAllTasksOptions): Promise<{ tasks: Task[]; total: number }> => {
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
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
            createdAt: 'desc'
          },
      skip,
      take: limit
    }),
    prisma.task.count({
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
  getAllTasksWithCount,
  getTaskById,
  updateTask
};
