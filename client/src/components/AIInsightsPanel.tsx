import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Zap,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useResourceStore } from "../store/useResourceStore";

const AIInsightsPanel = () => {
  const { aiInsights, isLoading } = useResourceStore();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
            <Lightbulb className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">AI Insights</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Real-time Predictions
            </p>
          </div>
        </div>
        {isLoading && (
          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
        )}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {aiInsights.length > 0 ? (
            aiInsights.map((insight, index) => {
              const Icon =
                insight.type === "risk"
                  ? AlertTriangle
                  : insight.type === "optimization"
                    ? Zap
                    : TrendingUp;
              const colorClass =
                insight.color === "rose"
                  ? "rose"
                  : insight.color === "emerald"
                    ? "emerald"
                    : insight.color === "amber"
                      ? "amber"
                      : "blue";

              return (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg bg-${colorClass}-500/10 border border-${colorClass}-500/20`}
                    >
                      <Icon className={`w-4 h-4 text-${colorClass}-400`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-200 text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                          {insight.title}
                        </h4>
                        <span
                          className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            insight.priority === "critical"
                              ? "bg-rose-500/10 text-rose-400"
                              : insight.priority === "high"
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {insight.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-600">
              <p className="text-sm">No insights available yet.</p>
              <p className="text-[10px] uppercase font-bold tracking-widest mt-1">
                Analyzing resource patterns...
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-8 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all uppercase tracking-widest"
      >
        Deep Analysis →
      </motion.button>
    </div>
  );
};

export default AIInsightsPanel;
