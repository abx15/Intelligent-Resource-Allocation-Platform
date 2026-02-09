import { Schema, model } from 'mongoose';

const webhookSchema = new Schema({
    url: { type: String, required: true },
    events: [{
        type: String,
        enum: ['allocation.created', 'allocation.updated', 'project.created', 'employee.joined'],
        required: true
    }],
    secret: String,
    isActive: { type: Boolean, default: true },
    description: String,
    lastTriggered: Date,
    successCount: { type: Number, default: 0 },
    failureCount: { type: Number, default: 0 }
}, { timestamps: true });

export default model('Webhook', webhookSchema);
