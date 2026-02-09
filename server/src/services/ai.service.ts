import OpenAI from 'openai';
import Employee from '../models/employee.model';
import Project from '../models/project.model';
import Allocation from '../models/allocation.model';

let openai: OpenAI;

const getOpenAIClient = () => {
    if (!openai) {
        if (!process.env.OPENAI_API_KEY) {
            console.warn('⚠️ OPENAI_API_KEY is not defined. AI features will use fallback.');
            return null;
        }
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
};

export const analyzeResourceEfficiency = async (
    employees: any[],
    allocations: any[],
    projects: any[]
) => {
    const prompt = `
    Analyze the following resource data for an corporate resource management platform:
    
    Employees: ${JSON.stringify(employees.map(e => ({ id: e._id, name: `${e.firstName} ${e.lastName}`, jobTitle: e.jobTitle, skills: e.skills })))}
    Allocations: ${JSON.stringify(allocations.map(a => ({ empId: a.employeeId, projId: a.projectId, hours: a.hoursPerWeek, role: a.role })))}
    Projects: ${JSON.stringify(projects.map(p => ({ id: p._id, name: p.name, status: p.status, priority: p.priority })))}

    Tasks:
    1. Conflict Prediction: Detect overlapping allocations that exceed 40h total per employee per week.
    2. Burnout Risk: Identify employees with high-priority project roles and high weekly hours.
    3. Utilization Optimization: Find senior employees with < 20h allocation.
    4. Team Composition Suggestion: Recommend a team for a hypothetical high-priority project based on skills.

    Requirements:
    - Return a JSON object with a key "insights" which is an array of objects.
    - Each insight object must have: type ('optimization' | 'risk' | 'trend'), title, description, color ('blue' | 'rose' | 'emerald' | 'amber'), and priority ('low' | 'medium' | 'high' | 'critical').
  `;

    try {
        const client = getOpenAIClient();
        if (!client) throw new Error('OpenAI client not initialized');

        const response = await client.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
        });

        return JSON.parse(response.choices[0].message.content || '{"insights": []}');
    } catch (error) {
        console.error('AI Analysis failed:', error);
        return {
            insights: [
                {
                    type: 'risk',
                    title: 'Heuristic Drift detected',
                    description: 'AI synchronization error. Heuristic analysis suggests checking resource utilization trends safely.',
                    color: 'amber',
                    priority: 'medium'
                }
            ]
        };
    }
};
