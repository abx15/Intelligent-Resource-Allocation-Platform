import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    projectCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'],
        default: 'planning'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: Number,
    client: String,
    projectManager: { type: Schema.Types.ObjectId, ref: 'User' },
    requiredSkills: [{
        skill: String,
        level: Number,
        count: Number
    }],
    milestones: [{
        name: String,
        deadline: Date,
        status: { type: String, default: 'pending' },
        completionPercentage: { type: Number, default: 0 }
    }],
    aiHealthScore: { type: Number, default: 100 },
    riskFactors: [String]
}, { timestamps: true });

export default model('Project', projectSchema);
