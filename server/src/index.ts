import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import connectDB from './config/db';
import employeeRoutes from './routes/employee.routes';
import projectRoutes from './routes/project.routes';
import allocationRoutes from './routes/allocation.routes';
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import { setupSocket } from './services/socket.service';
import { setupCronJobs } from './jobs/cron';
import './jobs'; // Initialize Bull Queues and Event Listeners
import './services/webhook.service'; // Initialize Webhook Listeners

const app = express();
const httpServer = createServer(app);

// Automation & Jobs
setupCronJobs();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date(), message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/ai', aiRoutes);

// Real-time
setupSocket(httpServer);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        httpServer.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
