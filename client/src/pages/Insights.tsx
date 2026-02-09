import { motion } from "framer-motion";
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  LineChart,
  BrainCircuit,
  PieChart,
  BarChart3,
} from "lucide-react";
import AIInsightsPanel from "../components/AIInsightsPanel";

const InsightCard = ({
  title,
  value,
  icon: Icon,
  color,
  delay,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group"
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-3 rounded-2xl ${color} bg-opacity-10 border border-opacity-20`}
      >
        <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
      </div>
      <div className="h-6 w-12 bg-slate-800/50 rounded-full animate-pulse" />
    </div>
    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-none mb-2">
      {title}
    </h3>
    <div className="text-3xl font-black text-white">{value}</div>
  </motion.div>
);

const Insights = () => {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white leading-none">
              Cognitive Analysis
            </h1>
          </div>
          <p className="text-slate-400 font-medium">
            Strategic intelligence and predictive resource optimizations.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/20">
            Real-time Analysis
          </button>
          <button className="px-5 py-2 text-slate-400 text-xs font-bold hover:text-white transition-colors">
            Historical Trends
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard
          title="Optimization Level"
          value="84.2%"
          icon={TrendingUp}
          color="bg-green-500"
          delay={0.1}
        />
        <InsightCard
          title="Critical Conflicts"
          value="0"
          icon={AlertTriangle}
          color="bg-blue-500"
          delay={0.2}
        />
        <InsightCard
          title="Utilization Rate"
          value="92.1%"
          icon={BarChart3}
          color="bg-indigo-500"
          delay={0.3}
        />
        <InsightCard
          title="Health Score"
          value="A+"
          icon={CheckCircle2}
          color="bg-emerald-500"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analysis Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <PieChart className="w-24 h-24 text-indigo-500/5" />
            </div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <LineChart className="w-5 h-5 text-indigo-400" />
              Resource Allocation Distribution
            </h3>
            <div className="space-y-6">
              {[
                { label: "Engineering", value: 65, color: "bg-blue-500" },
                { label: "Product Design", value: 45, color: "bg-indigo-500" },
                {
                  label: "Quality Assurance",
                  value: 30,
                  color: "bg-emerald-500",
                },
                { label: "Operations", value: 20, color: "bg-slate-700" },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest">
                      {item.label}
                    </span>
                    <span className="text-xs font-black text-indigo-400">
                      {item.value}% Load
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${item.color} shadow-[0_0_15px_rgba(37,99,235,0.2)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all">
              <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Strategic Recommendation
              </h4>
              <p className="text-slate-200 font-medium leading-relaxed">
                Increasing "Product Design" capacity by 15% would reduce
                delivery bottlenecks in Q3 by an estimated 22 days.
              </p>
            </div>
            <div className="p-8 rounded-[40px] bg-indigo-600/10 border border-indigo-500/20">
              <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                AI Confidence
              </h4>
              <div className="text-4xl font-black text-white mb-2">98.4%</div>
              <p className="text-indigo-400/60 text-xs font-bold uppercase tracking-widest">
                Model: AllocAI-Turbo V2
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Insights Panel Integration */}
        <div className="flex flex-col gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-1 overflow-hidden h-fit">
            <AIInsightsPanel />
          </div>
          <div className="p-8 rounded-[40px] border border-dashed border-slate-800 text-center group cursor-help">
            <Lightbulb className="w-8 h-8 text-slate-600 mx-auto mb-4 group-hover:text-yellow-500 transition-colors" />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              Pro Tip
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Use the Timeline engine to manually resolve conflicts flagged by
              our predictive analysis for 100% control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
