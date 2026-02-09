import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, projectController.getProjects as any);
router.post('/', authenticate, authorize(['admin', 'project_manager']), projectController.createProject);
router.get('/:id', authenticate, projectController.getProjectById as any);
router.put('/:id', authenticate, projectController.updateProject as any);
router.delete('/:id', authenticate, authorize(['admin', 'project_manager']), projectController.deleteProject);

export default router;
