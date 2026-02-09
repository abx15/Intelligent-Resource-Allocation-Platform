import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: "up" | "down";
  trendValue: string;
  color: "blue" | "emerald" | "rose" | "amber";
}

const KPICard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color,
}: KPICardProps) => {
  const colorClasses = {
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20 shadow-blue-500/10",
    emerald:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-emerald-500/10",
    rose: "text-rose-400 bg-rose-400/10 border-rose-400/20 shadow-rose-500/10",
    amber:
      "text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-amber-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="p-6 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden group shadow-lg"
    >
      <div
        className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 -mr-8 -mt-8 rounded-full ${color === "blue" ? "bg-blue-500" : color === "emerald" ? "bg-emerald-500" : color === "rose" ? "bg-rose-500" : "bg-amber-500"}`}
      ></div>

      <div className="flex items-start justify-between relative z-10">
        <div
          className={`p-4 rounded-2xl border ${colorClasses[color]} transition-colors group-hover:scale-110 duration-300`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div
          className={`text-xs font-bold px-2 py-1 rounded-full ${trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
        >
          {trendValue}
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          {title}
        </h3>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-slate-100 mt-1 tracking-tight"
        >
          {value}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KPICard;
