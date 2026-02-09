import { Request, Response } from 'express';
import Employee from '../models/employee.model';
import Allocation from '../models/allocation.model';
import Project from '../models/project.model';
import { analyzeResourceEfficiency } from '../services/ai.service';

export const getAIInsights = async (req: Request, res: Response) => {
    try {
        const [employees, allocations, projects] = await Promise.all([
            Employee.find(),
            Allocation.find(),
            Project.find()
        ]);

        const insights = await analyzeResourceEfficiency(employees, allocations, projects);

        res.status(200).json({
            success: true,
            data: insights
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
