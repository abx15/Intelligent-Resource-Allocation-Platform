import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'resource_manager', 'project_manager', 'employee'],
        default: 'employee'
    },
    department: String,
    avatar: String,
    permissions: [String],
    isActive: { type: Boolean, default: true },
    lastLogin: Date
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (this: any, candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model('User', userSchema);
