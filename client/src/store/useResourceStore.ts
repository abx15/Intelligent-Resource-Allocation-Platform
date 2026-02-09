import { create } from 'zustand';
import api from '../services/api';
import { socketService } from '../services/socket.service';

export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    jobTitle: string;
    department: string;
    skills: any[];
}

export interface Project {
    _id: string;
    name: string;
    projectCode: string;
    status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    isAllocated?: boolean; // Client-side flag for assignment
}

export interface Allocation {
    _id: string;
    employeeId: string;
    projectId: string;
    startDate: string;
    endDate: string;
    hoursPerWeek: number;
    role: string;
}

export interface AIInsight {
    type: 'optimization' | 'risk' | 'trend';
    title: string;
    description: string;
    color: 'blue' | 'rose' | 'emerald' | 'amber';
    priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ResourceState {
    employees: Employee[];
    projects: Project[];
    allocations: Allocation[];
    aiInsights: AIInsight[];
    isLoading: boolean;
    isAIConfigured: boolean;

    fetchDashboardData: () => Promise<void>;
    fetchAIInsights: () => Promise<void>;

    // Employee Actions
    fetchEmployees: () => Promise<void>;
    addEmployee: (data: any) => Promise<void>;
    updateEmployee: (id: string, data: any) => Promise<void>;
    deleteEmployee: (id: string) => Promise<void>;

    // Project Actions
    fetchProjects: () => Promise<void>;
    addProject: (data: any) => Promise<void>;
    updateProject: (id: string, data: any) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;

    // Allocation Actions
    fetchAllocations: () => Promise<void>;
    addAllocation: (data: any) => Promise<void>;
    updateAllocation: (id: string, data: any) => Promise<void>;
    deleteAllocation: (id: string) => Promise<void>;
}

export const useResourceStore = create<ResourceState>((set, get) => ({
    employees: [],
    projects: [],
    allocations: [],
    aiInsights: [],
    isLoading: false,
    isAIConfigured: true,

    fetchDashboardData: async () => {
        set({ isLoading: true });
        try {
            const [empRes, projRes, allocRes] = await Promise.all([
                api.get('/employees'),
                api.get('/projects'),
                api.get('/allocations')
            ]);
            set({
                employees: empRes.data.data,
                projects: projRes.data.data,
                allocations: allocRes.data.data,
                isLoading: false
            });
            // Trigger AI analysis in background
            get().fetchAIInsights();
        } catch (error) {
            console.error('Dashboard fetch failed', error);
            set({ isLoading: false });
        }
    },

    fetchAIInsights: async () => {
        try {
            const res = await api.get('/ai/insights');
            if (res.data.success) {
                set({ aiInsights: res.data.data.insights || [] });
            }
        } catch (error) {
            console.error('Failed to fetch AI insights', error);
        }
    },

    fetchEmployees: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/employees');
            set({ employees: res.data.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    addEmployee: async (data) => {
        const res = await api.post('/employees', data);
        set({ employees: [...get().employees, res.data.data] });
    },

    updateEmployee: async (id, data) => {
        const res = await api.put(`/employees/${id}`, data);
        set({ employees: get().employees.map(e => e._id === id ? res.data.data : e) });
    },

    deleteEmployee: async (id) => {
        await api.delete(`/employees/${id}`);
        set({ employees: get().employees.filter(e => e._id !== id) });
    },

    fetchProjects: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/projects');
            set({ projects: res.data.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    addProject: async (data) => {
        const res = await api.post('/projects', data);
        set({ projects: [...get().projects, res.data.data] });
    },

    updateProject: async (id, data) => {
        const res = await api.put(`/projects/${id}`, data);
        set({ projects: get().projects.map(p => p._id === id ? res.data.data : p) });
    },

    deleteProject: async (id) => {
        await api.delete(`/projects/${id}`);
        set({ projects: get().projects.filter(p => p._id !== id) });
    },

    fetchAllocations: async () => {
        const res = await api.get('/allocations');
        set({ allocations: res.data.data });
    },

    addAllocation: async (data) => {
        const optimisticAllocation = { _id: `temp-${Date.now()}`, ...data };
        const previousAllocations = get().allocations;
        set({ allocations: [...previousAllocations, optimisticAllocation] });

        try {
            const res = await api.post('/allocations', data);
            set({
                allocations: get().allocations.map(a => a._id === optimisticAllocation._id ? res.data.data : a)
            });
            socketService.emit('new_allocation', res.data.data);
            get().fetchAIInsights(); // Re-analyze after allocation
        } catch (error) {
            set({ allocations: previousAllocations });
            throw error;
        }
    },

    updateAllocation: async (id, data) => {
        const previousAllocations = get().allocations;
        set({
            allocations: get().allocations.map(a => a._id === id ? { ...a, ...data } : a)
        });

        try {
            const res = await api.put(`/allocations/${id}`, data);
            socketService.emit('update_allocation', res.data.data);
            get().fetchAIInsights(); // Re-analyze
        } catch (error) {
            set({ allocations: previousAllocations });
            throw error;
        }
    },

    deleteAllocation: async (id) => {
        const previousAllocations = get().allocations;
        set({ allocations: get().allocations.filter(a => a._id !== id) });

        try {
            await api.delete(`/allocations/${id}`);
            socketService.emit('delete_allocation', id);
            get().fetchAIInsights(); // Re-analyze
        } catch (error) {
            set({ allocations: previousAllocations });
            throw error;
        }
    },
}));
