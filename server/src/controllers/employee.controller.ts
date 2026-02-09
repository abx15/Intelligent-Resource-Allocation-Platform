import { Request, Response } from 'express';
import Employee from '../models/employee.model';
import { eventEmitter, EVENTS } from '../services/event.service';

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find().populate('userId', 'email firstName lastName');
        res.status(200).json({ success: true, data: employees });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.create(req.body);
        eventEmitter.emit(EVENTS.EMPLOYEE_JOINED, employee);
        res.status(201).json({ success: true, data: employee });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('userId');
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
        res.status(200).json({ success: true, data: employee });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: employee });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
        res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};
