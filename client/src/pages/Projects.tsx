import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Clock,
  Loader2,
  Briefcase,
  Trash2,
  Edit,
} from "lucide-react";
import { useResourceStore } from "../store/useResourceStore";
import { useAuthStore } from "../store/useAuthStore";
import Modal from "../components/Modal";
import ProjectForm from "../components/ProjectForm";

const ProjectsPage = () => {
  const { user } = useAuthStore();
  const { projects, isLoading, fetchProjects, addProject, deleteProject } =
    useResourceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RBAC permissions
  const canCreate = user?.role === "admin" || user?.role === "project_manager";

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (data: any) => {
    setIsSubmitting(true);
    try {
      await addProject(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create project", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Projects</h1>
          <p className="text-slate-400 mt-1">
            Monitor project health and team allocations
          </p>
        </div>
        {canCreate && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors w-fit shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all font-medium">
          <Filter className="w-4 h-4" />
          Status
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-slate-500 animate-pulse">
            Syncing project portfolio...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group cursor-pointer shadow-lg hover:shadow-emerald-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    {project.projectCode}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                      project.status === "active"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : project.status === "on-hold"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-slate-800/50 text-slate-400 border-slate-800"
                    }`}
                  >
                    {project.status.replace("-", " ")}
                  </div>
                  {user?.role === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project._id);
                      }}
                      className="p-1.5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-lg transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 uppercase tracking-tighter">
                    AI Health Check
                  </span>
                  <span className={`text-emerald-400`}>Optimal (85%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-[1px]">
                  <div
                    className={`h-full transition-all duration-1000 bg-emerald-500 rounded-full`}
                    style={{ width: `85%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">Active Q1 2026</span>
                  </div>
                  <div
                    className={`text-xs font-bold uppercase ${
                      project.priority === "critical"
                        ? "text-rose-400"
                        : project.priority === "high"
                          ? "text-amber-400"
                          : "text-slate-500"
                    }`}
                  >
                    {project.priority} Prio
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between relative z-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold"
                    >
                      {i}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-500">
                    +2
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-1.5 hover:bg-blue-500/10 text-slate-500 hover:text-blue-400 rounded-lg transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-xs font-bold text-slate-100 hover:text-emerald-400 transition-colors uppercase tracking-widest">
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-24 text-slate-500 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl gap-4">
              <Briefcase className="w-12 h-12 opacity-10" />
              <div className="text-center">
                <p className="font-semibold text-slate-400">
                  Project list is empty
                </p>
                <p className="text-sm">
                  Initiate your first resource-bound project to begin tracking.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initialize New Project"
      >
        <ProjectForm onSubmit={handleCreateProject} isLoading={isSubmitting} />
      </Modal>
    </div>
  );
};

export default ProjectsPage;
