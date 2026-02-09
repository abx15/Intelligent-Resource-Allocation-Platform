import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    skills: [{
        name: String,
        level: { type: Number, min: 1, max: 5 },
        yearsOfExperience: Number,
        certified: Boolean
    }],
    department: String,
    jobTitle: String,
    location: String,
    costPerHour: Number,
    availability: [{
        startDate: Date,
        endDate: Date,
        type: {
            type: String,
            enum: ['available', 'vacation', 'sick_leave', 'training'],
            default: 'available'
        },
        percentage: { type: Number, default: 100 }
    }],
    preferences: {
        maxHoursPerWeek: { type: Number, default: 40 },
        preferredProjectTypes: [String],
        willingToTravel: Boolean
    },
    metrics: {
        totalProjects: { type: Number, default: 0 },
        averageProjectRating: { type: Number, default: 0 },
        utilizationRate: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default model('Employee', employeeSchema);
