import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateRandomTasks = (count) => {
  const tasks = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const dueDate = new Date(now);
    dueDate.setDate(now.getDate() + Math.floor(Math.random() * 30) - 15);

    tasks.push({
      name: `Task ${i + 1}`,
      description: `Description for Task ${i + 1}`,
      dueDate,
      createdAt: new Date(),
      status:
        dueDate < now
          ? 'OVERDUE'
          : dueDate - now <= 7 * 24 * 60 * 60 * 1000
            ? 'DUE_SOON'
            : 'NOT_URGENT'
    });
  }

  return tasks;
};

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    await prisma.task.deleteMany();
    console.log('Existing tasks deleted.');

    const tasks = generateRandomTasks(100);
    await prisma.task.createMany({ data: tasks });

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
