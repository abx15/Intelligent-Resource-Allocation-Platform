import { EventEmitter } from 'events';

class AppEventEmitter extends EventEmitter { }

export const eventEmitter = new AppEventEmitter();

// Event Constants
export const EVENTS = {
    ALLOCATION_CREATED: 'allocation:created',
    ALLOCATION_UPDATED: 'allocation:updated',
    ALLOCATION_DELETED: 'allocation:deleted',
    PROJECT_CREATED: 'project:created',
    EMPLOYEE_JOINED: 'employee:joined',
    AI_INSIGHTS_GENERATED: 'ai:insights_generated',
};

// Log errors for debugging
eventEmitter.on('error', (err) => {
    console.error('[EVENT BUS ERROR]:', err);
});
