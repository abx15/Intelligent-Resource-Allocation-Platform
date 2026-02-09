import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function App() {
  const { isAuthenticated } = useAuthStore();
  useSmoothScroll();

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <main
          className={isAuthenticated ? "container mx-auto px-4 py-8" : "w-full"}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/admin/login"
              element={
                !isAuthenticated ? <AdminLogin /> : <Navigate to="/dashboard" />
              }
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Admin/Manager Specific Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin", "project_manager"]} />
              }
            >
              <Route path="/projects" element={<Projects />} />
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles={["admin", "resource_manager"]} />
              }
            >
              <Route path="/employees" element={<Employees />} />
            </Route>

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
