import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model';
import Employee from './models/employee.model';
import Project from './models/project.model';
import Allocation from './models/allocation.model';
import connectDB from './config/db';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();
        console.log('🌱 Starting comprehensive data seed...');

        // 1. Clear existing non-admin data
        await User.deleteMany({ role: { $ne: 'admin' } });
        await Employee.deleteMany({});
        await Project.deleteMany({});
        await Allocation.deleteMany({});

        // 2. Ensure Admin
        const adminEmail = 'admin@allocai.com';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            await User.create({
                email: adminEmail,
                password: 'AdminPassword123!',
                firstName: 'Platform',
                lastName: 'Admin',
                role: 'admin'
            });
            console.log('✅ Default Admin created.');
        }

        // 3. Create Users for Employees
        const employeeData = [
            { firstName: 'Sarah', lastName: 'Chen', email: 's.chen@allocai.com', jobTitle: 'Senior Full Stack Engineer', department: 'Engineering' },
            { firstName: 'Marcus', lastName: 'Rodriguez', email: 'm.rod@allocai.com', jobTitle: 'UI/UX Designer', department: 'Product' },
            { firstName: 'Elena', lastName: 'Petrova', email: 'e.petrova@allocai.com', jobTitle: 'Data Scientist', department: 'AI/ML' },
        ];

        const seededEmployees = [];

        for (const data of employeeData) {
            const user = await User.create({
                email: data.email,
                password: 'Password123!',
                firstName: data.firstName,
                lastName: data.lastName,
                role: 'employee'
            });

            const employee = await Employee.create({
                userId: user._id,
                employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
                jobTitle: data.jobTitle,
                department: data.department,
                skills: [
                    { name: 'TypeScript', level: 5, yearsOfExperience: 4, certified: true },
                    { name: 'Node.js', level: 4, yearsOfExperience: 3, certified: false }
                ],
                availability: [{
                    startDate: new Date(),
                    endDate: new Date(2027, 0, 1),
                    type: 'available',
                    percentage: 100
                }]
            });
            seededEmployees.push(employee);
        }
        console.log(`✅ Seeded ${seededEmployees.length} employees with linked user accounts.`);

        // 4. Seed Projects
        const projects = await Project.insertMany([
            { projectCode: 'TITAN-01', name: 'Project Titan', description: 'Next-gen enterprise storage engine', status: 'active', priority: 'high', budget: 500000, startDate: new Date(2026, 0, 1), endDate: new Date(2026, 5, 30) },
            { projectCode: 'NEBULA-99', name: 'Nebula App', description: 'Cross-platform mobile wellness experience', status: 'active', priority: 'medium', budget: 250000, startDate: new Date(2026, 1, 15), endDate: new Date(2026, 8, 15) }
        ]);
        console.log(`✅ Seeded ${projects.length} projects.`);

        // 5. Seed Allocations
        await Allocation.insertMany([
            { employeeId: seededEmployees[0]._id, projectId: projects[0]._id, role: 'Lead Developer', hoursPerWeek: 30, percentage: 75, startDate: projects[0].startDate, endDate: projects[0].endDate },
            { employeeId: seededEmployees[1]._id, projectId: projects[1]._id, role: 'Visual Designer', hoursPerWeek: 40, percentage: 100, startDate: projects[1].startDate, endDate: projects[1].endDate },
            { employeeId: seededEmployees[2]._id, projectId: projects[0]._id, role: 'ML Advisor', hoursPerWeek: 20, percentage: 50, startDate: projects[0].startDate, endDate: projects[0].endDate }
        ]);
        console.log('✅ Seeded initial allocations.');

        console.log('✨ Data seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
