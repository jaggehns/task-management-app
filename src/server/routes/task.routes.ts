import express from 'express';
import validateResource from '../middleware/validateResource.js';
import {
  createTaskSchema,
  getTasksSchema,
  updateTaskSchema
} from '../schema/task.schema.js';
import {
  createTask,
  getAllTasks,
  updateTask
} from '../controller/task.controller.js';

const router = express.Router();

router.post('/tasks', validateResource(createTaskSchema), createTask);
router.get('/tasks', validateResource(getTasksSchema), getAllTasks);
router.patch('/tasks/:id', validateResource(updateTaskSchema), updateTask);

export default router;
