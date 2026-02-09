import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const projectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  projectCode: z.string().min(2, "Project code is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["planning", "active", "on-hold", "completed", "cancelled"]),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  isLoading: boolean;
}

const ProjectForm = ({
  initialData,
  onSubmit,
  isLoading,
}: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      priority: "medium",
      status: "planning",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Project Name
          </label>
          <input
            {...register("name")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Project Code
          </label>
          <input
            {...register("projectCode")}
            placeholder="PRJ-2026-01"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          />
          {errors.projectCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.projectCode.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            {...register("endDate")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Priority
          </label>
          <select
            {...register("priority")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition-all flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
