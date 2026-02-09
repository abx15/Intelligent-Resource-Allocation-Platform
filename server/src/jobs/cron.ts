import cron from 'node-cron';
import { aiQueue } from './index';

export const setupCronJobs = () => {
    // Daily AI Re-analysis at Midnight
    cron.schedule('0 0 * * *', () => {
        console.log('[CRON]: Running deep nightly resource analysis...');
        aiQueue.add({ type: 'deep_analysis' });
    });

    // Weekly System Health Check (Monday at 1 AM)
    cron.schedule('0 1 * * 1', () => {
        console.log('[CRON]: Running weekly system health check...');
    });

    console.log('Cron jobs scheduled successfully.');
};
