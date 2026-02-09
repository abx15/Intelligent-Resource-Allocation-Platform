import { Schema, model } from 'mongoose';

const aiInsightSchema = new Schema({
    type: {
        type: String,
        enum: ['conflict_prediction', 'burnout_risk', 'team_optimization', 'project_delay', 'skill_gap', 'utilization_forecast'],
        required: true
    },
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetType: {
        type: String,
        enum: ['employee', 'project', 'allocation'],
        required: true
    },
    prediction: {
        outcome: String,
        probability: Number,
        timeframe: String,
        confidence: Number
    },
    recommendation: {
        action: String,
        reasoning: String,
        expectedImpact: String,
        priority: String
    },
    factors: [{
        factor: String,
        weight: Number,
        value: Schema.Types.Mixed
    }],
    status: {
        type: String,
        enum: ['pending', 'applied', 'dismissed', 'expired'],
        default: 'pending'
    },
    appliedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    appliedAt: Date,
    expiresAt: Date
}, { timestamps: true });

export default model('AIInsight', aiInsightSchema);
