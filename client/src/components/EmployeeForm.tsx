import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const employeeSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  employeeId: z.string().min(3, "Employee ID is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  department: z.string().min(2, "Department is required"),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  initialData?: any;
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  isLoading: boolean;
}

const EmployeeForm = ({
  initialData,
  onSubmit,
  isLoading,
}: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Employee ID
        </label>
        <input
          {...register("employeeId")}
          placeholder="EGL-1001"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
        />
        {errors.employeeId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.employeeId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Job Title
        </label>
        <input
          {...register("jobTitle")}
          placeholder="Senior Software Engineer"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Department
        </label>
        <select
          {...register("department")}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none"
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Operations">Operations</option>
        </select>
        {errors.department && (
          <p className="text-red-500 text-xs mt-1">
            {errors.department.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition-all flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
