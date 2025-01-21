-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_URGENT', 'DUE_SOON', 'OVERDUE');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'NOT_URGENT',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
