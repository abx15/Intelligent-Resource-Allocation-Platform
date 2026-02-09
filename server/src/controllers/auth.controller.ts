import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

const generateTokens = (userId: string, role: string) => {
    const accessToken = jwt.sign(
        { userId, role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const role = 'employee'; // Force default role for self-registration

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: { message: 'User already exists' } });
        }

        const user = await User.create({ email, password, firstName, lastName, role });
        const { accessToken, refreshToken } = generateTokens((user._id as any).toString(), user.role);

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                accessToken,
                refreshToken
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            console.warn(`🔒 Login failed: User not found [${email}]`);
            return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
        }

        if (!(await (user as any).comparePassword(password))) {
            console.warn(`🔒 Login failed: Password mismatch [${email}]`);
            return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
        }

        console.log(`✅ Login successful: ${user.email} (${user.role})`);

        const { accessToken, refreshToken } = generateTokens((user._id as any).toString(), user.role);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                accessToken,
                refreshToken
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ success: false, error: { message: 'Refresh token required' } });
        }

        const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ success: false, error: { message: 'Invalid refresh token' } });
        }

        const tokens = generateTokens((user._id as any).toString(), user.role);

        res.status(200).json({
            success: true,
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        });
    } catch (error) {
        res.status(401).json({ success: false, error: { message: 'Invalid or expired refresh token' } });
    }
};

export const logout = async (req: Request, res: Response) => {
    // In a real-world app, you might want to blacklist the refresh token in Redis
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const me = async (req: AuthRequest, res: Response) => {
    res.status(200).json({
        success: true,
        data: {
            user: {
                id: req.user._id,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                role: req.user.role
            }
        }
    });
};
