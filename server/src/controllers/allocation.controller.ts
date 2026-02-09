import { Request, Response } from 'express';
import Allocation from '../models/allocation.model';
import { eventEmitter, EVENTS } from '../services/event.service';

export const getAllocations = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        const query: any = {};

        if (startDate && endDate) {
            query.$or = [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ];
        }

        const allocations = await Allocation.find(query)
            .populate('employeeId')
            .populate('projectId');

        res.status(200).json({ success: true, data: allocations });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const createAllocation = async (req: Request, res: Response) => {
    try {
        const allocation = await Allocation.create(req.body);
        eventEmitter.emit(EVENTS.ALLOCATION_CREATED, allocation);
        res.status(201).json({ success: true, data: allocation });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const updateAllocation = async (req: Request, res: Response) => {
    try {
        const allocation = await Allocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        eventEmitter.emit(EVENTS.ALLOCATION_UPDATED, allocation);
        res.status(200).json({ success: true, data: allocation });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const deleteAllocation = async (req: Request, res: Response) => {
    try {
        await Allocation.findByIdAndDelete(req.params.id);
        eventEmitter.emit(EVENTS.ALLOCATION_DELETED, req.params.id);
        res.status(200).json({ success: true, message: 'Allocation deleted' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};
