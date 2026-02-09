import { Request, Response } from 'express';
import Project from '../models/project.model';
import { eventEmitter, EVENTS } from '../services/event.service';
import { AuthRequest } from '../middleware/auth.middleware';
import Allocation from '../models/allocation.model';

export const getProjects = async (req: AuthRequest, res: Response) => {
    try {
        let query = {};

        // If user is an employee, only show projects they are allocated to
        if (req.user.role === 'employee') {
            const allocations = await Allocation.find({ employeeId: req.user._id });
            const projectIds = allocations.map(a => a.projectId);
            query = { _id: { $in: projectIds } };
        }

        const projects = await Project.find(query).populate('projectManager', 'firstName lastName email');
        res.status(200).json({ success: true, data: projects });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.create(req.body);
        eventEmitter.emit(EVENTS.PROJECT_CREATED, project);
        res.status(201).json({ success: true, data: project });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findById(req.params.id).populate('projectManager');
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        // Security: Employees can only view their assigned projects
        if (req.user.role === 'employee') {
            const isAllocated = await Allocation.findOne({ employeeId: req.user._id, projectId: project._id });
            if (!isAllocated) {
                return res.status(403).json({ success: false, message: 'Access denied: You are not assigned to this project' });
            }
        }

        res.status(200).json({ success: true, data: project });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        // Security: Managers and Admins can update. Employees can only update if assigned
        if (req.user.role === 'employee') {
            const isAllocated = await Allocation.findOne({ employeeId: req.user._id, projectId: project._id });
            if (!isAllocated) {
                return res.status(403).json({ success: false, message: 'Forbidden: You cannot update a project you are not assigned to' });
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedProject });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};
