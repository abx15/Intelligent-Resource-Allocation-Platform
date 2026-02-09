import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Briefcase,
  Mail,
  Loader2,
  UserPlus,
  Trash2,
} from "lucide-react";
import { useResourceStore } from "../store/useResourceStore";
import { useAuthStore } from "../store/useAuthStore";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";

const Employees = () => {
  const { user } = useAuthStore();
  const { employees, isLoading, fetchEmployees, addEmployee, deleteEmployee } =
    useResourceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAddEmployee = async (data: any) => {
    setIsSubmitting(true);
    try {
      await addEmployee(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add employee", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Employees</h1>
          <p className="text-slate-400 mt-1">
            Manage and track resource skills and availability
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors w-fit shadow-lg shadow-blue-500/20"
        >
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all font-medium">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-slate-500 animate-pulse">
              Loading talent pool...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Role & Dept
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border border-slate-700 flex items-center justify-center text-sm font-bold shadow-inner">
                          {emp.firstName?.[0]}
                          {emp.lastName?.[0]}
                        </div>
                        <span className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors cursor-pointer">
                          {emp.firstName} {emp.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-200">
                          {emp.jobTitle}
                        </span>
                        <span className="text-xs text-slate-500">
                          {emp.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-slate-500">
                        <Mail className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors" />
                        <Briefcase className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteEmployee(emp._id)}
                          className="p-2 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-lg transition-all"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20">
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                        <UserPlus className="w-10 h-10 opacity-20" />
                        <p>
                          No employees found. Start by adding your team members.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Employee"
      >
        <EmployeeForm onSubmit={handleAddEmployee} isLoading={isSubmitting} />
      </Modal>
    </div>
  );
};

export default Employees;
