import Queue from 'bull';
import { analyzeResourceEfficiency } from '../services/ai.service';
import Employee from '../models/employee.model';
import Allocation from '../models/allocation.model';
import Project from '../models/project.model';
import { eventEmitter, EVENTS } from '../services/event.service';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Queues
export const aiQueue = new Queue('ai-analysis', REDIS_URL);
export const notificationQueue = new Queue('notifications', REDIS_URL);

// Processors
aiQueue.process(async (job) => {
    console.log('Processing AI Analysis background job...', job.id);

    try {
        const [employees, allocations, projects] = await Promise.all([
            Employee.find(),
            Allocation.find(),
            Project.find()
        ]);

        const insights = await analyzeResourceEfficiency(employees, allocations, projects);

        // Emit event when AI analysis is complete
        eventEmitter.emit(EVENTS.AI_INSIGHTS_GENERATED, insights);

        return insights;
    } catch (error) {
        console.error('AI Processing job failed', error);
        throw error;
    }
});

notificationQueue.process(async (job) => {
    // Logic for sending emails/webhooks
    console.log('Processing notification job...', job.data);
});

// Event Listeners to trigger background jobs
eventEmitter.on(EVENTS.ALLOCATION_CREATED, () => {
    aiQueue.add({}, { delay: 1000, removeOnComplete: true });
});

eventEmitter.on(EVENTS.ALLOCATION_UPDATED, () => {
    aiQueue.add({}, { delay: 1000, removeOnComplete: true });
});
