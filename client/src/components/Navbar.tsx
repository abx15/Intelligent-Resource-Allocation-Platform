import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GanttChartSquare,
  Briefcase,
  Users,
  Lightbulb,
  Bell,
  LogOut,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuthStore();

  const navItems = isAuthenticated
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
          roles: ["admin", "employee", "project_manager", "resource_manager"],
        },
        {
          name: "Timeline",
          path: "/timeline",
          icon: GanttChartSquare,
          roles: ["admin", "employee", "project_manager", "resource_manager"],
        },
        {
          name: "Projects",
          path: "/projects",
          icon: Briefcase,
          roles: ["admin", "project_manager"],
        },
        {
          name: "Employees",
          path: "/employees",
          icon: Users,
          roles: ["admin", "resource_manager"],
        },
        {
          name: "Insights",
          path: "/insights",
          icon: Lightbulb,
          roles: ["admin", "resource_manager", "project_manager"],
        },
      ].filter((item) => item.roles.includes(user?.role || ""))
    : [
        { name: "Features", path: "/#features", icon: Lightbulb },
        { name: "Documentation", path: "/docs", icon: Briefcase },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic tracking-tighter"
            >
              AllocAI
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all",
                    location.pathname === item.path
                      ? "text-blue-400 bg-blue-400/10 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                  <div className="hidden lg:block text-right">
                    <div className="text-xs font-bold text-slate-200">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest text-blue-400">
                      {user?.role.replace("_", " ")}
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                    Log In
                  </button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
