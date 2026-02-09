import { Schema, model } from 'mongoose';

const conflictSchema = new Schema({
    type: {
        type: String,
        enum: ['allocation_overlap', 'overallocation', 'skill_gap', 'budget_exceeded'],
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
    },
    status: {
        type: String,
        enum: ['detected', 'acknowledged', 'resolved', 'ignored'],
        default: 'detected'
    },
    affectedAllocations: [{ type: Schema.Types.ObjectId, ref: 'Allocation' }],
    affectedEmployees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
    affectedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    detectedAt: { type: Date, default: Date.now },
    detectedBy: {
        type: String,
        enum: ['system', 'ai', 'user'],
        default: 'system'
    },
    aiSuggestions: [{
        action: String,
        reasoning: String,
        confidence: Number,
        impact: String
    }],
    resolution: {
        resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        resolvedAt: Date,
        action: String,
        notes: String
    }
}, { timestamps: true });

export default model('Conflict', conflictSchema);
