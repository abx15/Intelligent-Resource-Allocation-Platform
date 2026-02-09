import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Cpu, BarChart3, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
  >
    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-100">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Landing = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 inline-block">
              AI-Powered Resource Orchestration
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1] bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              {isAuthenticated ? (
                <>
                  Welcome Back, <br />
                  <span className="text-blue-500">{user?.firstName}</span>
                </>
              ) : (
                <>
                  Orchestrate Your <br />
                  <span className="text-blue-500">Intelligent Workforce</span>
                </>
              )}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              {isAuthenticated
                ? "Your workspace is ready. Dive back into your projects and manage your team's capacity with AI-driven precision."
                : "Maximize efficiency with our next-gen platform. AI-driven insights, real-time capacity tracking, and predictive conflict resolution."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg flex items-center gap-3 shadow-2xl shadow-blue-600/30 group"
                  >
                    Launch Platform
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-600/20 group"
                    >
                      Get Started for Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="px-8 py-4 border border-slate-800 text-slate-300 rounded-2xl font-bold"
                    >
                      Sign In to Dashboard
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Abstract Dashboard Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] -z-10" />
            <div className="bg-slate-900/80 backdrop-blur-3xl border border-slate-800 rounded-[40px] p-4 p-8 shadow-[0_0_100px_rgba(37,99,235,0.1)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="h-6 w-48 bg-slate-800 rounded-full animate-pulse" />
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 space-y-4">
                  <div className="h-32 bg-slate-800/50 rounded-3xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-48 bg-slate-800/30 rounded-3xl" />
                    <div className="h-48 bg-slate-800/30 rounded-3xl" />
                  </div>
                </div>
                <div className="col-span-4 h-full bg-slate-800/50 rounded-3xl" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">Powerful Core Features</h2>
            <p className="text-slate-400 font-medium">
              Built for scale, designed for simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Cpu}
              title="AI Prediction"
              description="Our GPT-4 powered engine identifies resource conflicts and burnout risks before they happen."
            />
            <FeatureCard
              icon={BarChart3}
              title="Real-time Analytics"
              description="High-performance Gantt views and capacity heatmaps provide instant visibility."
            />
            <FeatureCard
              icon={Zap}
              title="Smart Automation"
              description="Automated background jobs and event-driven updates keep your data synced instantly."
            />
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="py-20 border-y border-slate-900">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Predictive Accuracy", value: "99%" },
              { label: "Time Saved", value: "40h/mo" },
              { label: "Efficiency Boost", value: "2.5x" },
              { label: "System Uptime", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-xs uppercase font-bold tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-slate-900 text-center">
          <div className="mb-8">
            <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic">
              AllocAI
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Intelligent Resource Allocation Platform. Open Source under
            MIT License.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
