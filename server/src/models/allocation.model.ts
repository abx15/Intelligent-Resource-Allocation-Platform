import { Schema, model } from 'mongoose';

const allocationSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    hoursPerWeek: { type: Number, required: true },
    percentage: { type: Number, required: true },
    role: String,
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled'],
        default: 'pending'
    },
    billable: { type: Boolean, default: true },
    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    conflicts: [{
        type: {
            type: String,
            enum: ['overlap', 'overallocation', 'skill_mismatch']
        },
        severity: String,
        detectedAt: { type: Date, default: Date.now },
        resolvedAt: Date,
        resolution: String
    }]
}, { timestamps: true });

// Index for efficient conflict detection
allocationSchema.index({ employeeId: 1, startDate: 1, endDate: 1 });

export default model('Allocation', allocationSchema);
