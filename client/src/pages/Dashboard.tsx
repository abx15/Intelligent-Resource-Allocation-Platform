import { useEffect } from "react";
import {
  Users,
  Briefcase,
  Activity,
  Target,
  TrendingUp,
  AlertCircle,
  Clock,
} from "lucide-react";
import KPICard from "../components/KPICard";
import CapacityHeatmap from "../components/CapacityHeatmap";
import AIInsightsPanel from "../components/AIInsightsPanel";
import { useResourceStore } from "../store/useResourceStore";

const Dashboard = () => {
  const { fetchDashboardData, employees, projects } = useResourceStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const kpis = [
    {
      title: "Total Resources",
      value: employees.length,
      icon: Users,
      trend: "up" as const,
      trendValue: "+12%",
      color: "blue" as const,
    },
    {
      title: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      icon: Briefcase,
      trend: "up" as const,
      trendValue: "+5%",
      color: "emerald" as const,
    },
    {
      title: "Avg. Utilization",
      value: "78%",
      icon: Activity,
      trend: "up" as const,
      trendValue: "+4%",
      color: "amber" as const,
    },
    {
      title: "Conflicts",
      value: 3,
      icon: AlertCircle,
      trend: "down" as const,
      trendValue: "-2%",
      color: "rose" as const,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight">
            Intelligence Dashboard
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Real-time resource orchestration and predictive insights
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 px-4 h-fit">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
            Live Syncing
          </span>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                  Resource Capacity
                </h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                  Heatmap Analysis
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                Optimal Range
              </div>
            </div>
            <div className="relative z-10">
              <CapacityHeatmap />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                  Project Health Feed
                </h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                  Real-time System Events
                </p>
              </div>
              <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                Clear All
              </button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex-1 border-b border-slate-800/50 pb-6 group-last:border-0 group-last:pb-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-200 text-sm">
                        System Optimization Triggered
                      </h4>
                      <span className="text-[10px] text-slate-500 font-bold">
                        2m ago
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      AI engine recalculated allocations for Project Phoenix to
                      resolve resource conflict in Q1.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 h-full">
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
