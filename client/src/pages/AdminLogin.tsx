import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../services/auth.service";
import { ShieldAlert, Loader2, KeyRound, Lock } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;

        if (user.role !== "admin") {
          setError(
            "Access Restricted: This portal is for Administrators only.",
          );
          authService.logout(); // Optional: client side cleanup
          return;
        }

        setAuth(user, accessToken);
        localStorage.setItem("refresh-token", refreshToken);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message || "Admin authentication failed.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
            <ShieldAlert className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            Admin Command
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Restricted access for platform administrators
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-rose-500/10 border border-rose-500/50 text-rose-500 text-xs p-4 rounded-xl mb-8 flex items-start gap-3"
          >
            <Lock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 ml-1">
              Secure Email
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                placeholder="admin@allocai.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 ml-1">
              Access Key
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
              />
            </div>
            {errors.password && (
              <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <KeyRound className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Initialize Admin Session</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-800/50 text-center">
          <Link
            to="/login"
            className="text-slate-500 hover:text-indigo-400 text-sm font-bold transition-colors"
          >
            Return to Employee Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
