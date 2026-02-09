import { Router } from 'express';
import * as allocationController from '../controllers/allocation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, allocationController.getAllocations);
router.post('/', authenticate, authorize(['admin', 'resource_manager']), allocationController.createAllocation);
router.put('/:id', authenticate, authorize(['admin', 'resource_manager']), allocationController.updateAllocation);
router.delete('/:id', authenticate, authorize(['admin', 'resource_manager']), allocationController.deleteAllocation);

export default router;
