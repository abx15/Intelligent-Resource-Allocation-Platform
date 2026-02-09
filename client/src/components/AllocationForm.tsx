import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useResourceStore } from "../store/useResourceStore";

const allocationSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  projectId: z.string().min(1, "Project is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  hoursPerWeek: z.number().min(1).max(100),
  role: z.string().min(2, "Role in project is required"),
});

type AllocationFormValues = z.infer<typeof allocationSchema>;

interface AllocationFormProps {
  onSubmit: (data: AllocationFormValues) => Promise<void>;
  isLoading: boolean;
  fixedEmployeeId?: string;
  fixedProjectId?: string;
}

const AllocationForm = ({
  onSubmit,
  isLoading,
  fixedEmployeeId,
  fixedProjectId,
}: AllocationFormProps) => {
  const { employees, projects } = useResourceStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AllocationFormValues>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      employeeId: fixedEmployeeId || "",
      projectId: fixedProjectId || "",
      hoursPerWeek: 40,
    },
  });

  const hours = watch("hoursPerWeek");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!fixedEmployeeId && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Employee
          </label>
          <select
            {...register("employeeId")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
          {errors.employeeId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.employeeId.message}
            </p>
          )}
        </div>
      )}

      {!fixedProjectId && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Project
          </label>
          <select
            {...register("projectId")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
          >
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.projectId.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Role in Project
        </label>
        <input
          {...register("role")}
          placeholder="e.g. Lead Developer"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
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
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
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
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Hours Per Week
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="100"
            {...register("hoursPerWeek", { valueAsNumber: true })}
            className="flex-1 accent-blue-500"
          />
          <span className="w-12 text-center font-bold text-blue-400">
            {hours}h
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition-all flex items-center gap-2 w-full justify-center"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Confirm Allocation
        </button>
      </div>
    </form>
  );
};

export default AllocationForm;
