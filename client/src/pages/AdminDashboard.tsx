import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Settings, 
  Code, 
  Bug, 
  TrendingUp, 
  Shield, 
  Activity,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  pendingReviews: number;
  openBugs: number;
  systemHealth: number;
  recentActivity: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'project' | 'review' | 'bug';
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeProjects: 0,
    pendingReviews: 0,
    openBugs: 0,
    systemHealth: 0,
    recentActivity: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching admin data
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Mock data - in real app, this would be API calls
        setStats({
          totalUsers: 156,
          activeProjects: 23,
          pendingReviews: 8,
          openBugs: 12,
          systemHealth: 98,
          recentActivity: 47
        });

        setRecentActivity([
          {
            id: '1',
            type: 'user',
            action: 'New user registration',
            user: 'John Doe',
            timestamp: '2024-01-20T10:30:00Z',
            status: 'success'
          },
          {
            id: '2',
            type: 'project',
            action: 'Project created',
            user: 'Jane Smith',
            timestamp: '2024-01-20T09:15:00Z',
            status: 'success'
          },
          {
            id: '3',
            type: 'review',
            action: 'Code review requested',
            user: 'Mike Johnson',
            timestamp: '2024-01-20T08:45:00Z',
            status: 'pending'
          },
          {
            id: '4',
            type: 'bug',
            action: 'Bug report filed',
            user: 'Sarah Wilson',
            timestamp: '2024-01-20T08:00:00Z',
            status: 'error'
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: Code,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      change: '-3%',
      changeType: 'decrease'
    },
    {
      title: 'Open Bugs',
      value: stats.openBugs,
      icon: Bug,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      change: '+2%',
      changeType: 'increase'
    },
    {
      title: 'Recent Activity',
      value: stats.recentActivity,
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600',
      link: '/admin/users'
    },
    {
      title: 'Project Review',
      description: 'Review and approve project submissions',
      icon: Code,
      color: 'bg-green-500 hover:bg-green-600',
      link: '/admin/reviews'
    },
    {
      title: 'Bug Tracking',
      description: 'Monitor and resolve bug reports',
      icon: Bug,
      color: 'bg-red-500 hover:bg-red-600',
      link: '/admin/bugs'
    },
    {
      title: 'System Settings',
      description: 'Configure system settings and policies',
      icon: Settings,
      color: 'bg-purple-500 hover:bg-purple-600',
      link: '/admin/settings'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="w-4 h-4" />;
      case 'project':
        return <TrendingUp className="w-4 h-4" />;
      case 'review':
        return <GitBranch className="w-4 h-4" />;
      case 'bug':
        return <Bug className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">System overview and management controls</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} backdrop-blur-sm border border-slate-800 rounded-2xl p-6 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.a
                key={action.title}
                href={action.link}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${action.color} text-white rounded-xl p-6 block transition-all duration-200 hover:shadow-xl`}
              >
                <action.icon className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-800 p-2 rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-slate-400 text-sm">by {activity.user}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusIcon(activity.status)}
                      <p className="text-slate-500 text-xs mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Performance */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">System Performance</h2>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">CPU Usage</span>
                    <span className="text-white font-medium">45%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Memory</span>
                    <span className="text-white font-medium">67%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Storage</span>
                    <span className="text-white font-medium">23%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Network</span>
                    <span className="text-white font-medium">12%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
