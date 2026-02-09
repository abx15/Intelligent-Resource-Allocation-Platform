import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, authorize(['admin', 'resource_manager', 'project_manager']), employeeController.getEmployees);
router.post('/', authenticate, authorize(['admin', 'resource_manager']), employeeController.createEmployee);
router.get('/:id', authenticate, authorize(['admin', 'resource_manager', 'project_manager']), employeeController.getEmployeeById);
router.put('/:id', authenticate, authorize(['admin', 'resource_manager']), employeeController.updateEmployee);
router.delete('/:id', authenticate, authorize(['admin', 'resource_manager']), employeeController.deleteEmployee);

export default router;
