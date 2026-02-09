import axios from 'axios';
import Webhook from '../models/webhook.model';
import { eventEmitter, EVENTS } from './event.service';

export const dispatchWebhook = async (event: string, data: any) => {
    const webhooks = await Webhook.find({
        events: event,
        isActive: true
    });

    const promises = webhooks.map(async (webhook) => {
        try {
            await axios.post(webhook.url, {
                event,
                data,
                timestamp: new Date()
            }, {
                headers: {
                    'X-Webhook-Secret': webhook.secret || '',
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            });

            await Webhook.findByIdAndUpdate(webhook._id, {
                $set: { lastTriggered: new Date() },
                $inc: { successCount: 1 }
            });
        } catch (error) {
            console.error(`Webhook failed for ${webhook.url}`, error);
            await Webhook.findByIdAndUpdate(webhook._id, {
                $inc: { failureCount: 1 }
            });
        }
    });

    await Promise.all(promises);
};

// Map Internal Events to Webhook Events
eventEmitter.on(EVENTS.ALLOCATION_CREATED, (data) => dispatchWebhook('allocation.created', data));
eventEmitter.on(EVENTS.ALLOCATION_UPDATED, (data) => dispatchWebhook('allocation.updated', data));
eventEmitter.on(EVENTS.PROJECT_CREATED, (data) => dispatchWebhook('project.created', data));
eventEmitter.on(EVENTS.EMPLOYEE_JOINED, (data) => dispatchWebhook('employee.joined', data));
