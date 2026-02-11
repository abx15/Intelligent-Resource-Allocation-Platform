import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Activity, Users, GitPullRequest, Zap, BarChart3, Shield, RefreshCw } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  completedProjects: number;
  codeQuality: {
    coverage: number;
    bugs: number;
    technicalDebt: number;
  };
  performance: {
    avgResponseTime: number;
    uptime: number;
    errorRate: number;
  };
  aiInsights: {
    autoReviewsCompleted: number;
    bugsAutoResolved: number;
    codeImprovements: number;
  };
}

const AIAnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoMode, setAutoMode] = useState(false);

  useEffect(() => {
    const mockData: AnalyticsData = {
      totalUsers: 1247,
      activeUsers: 892,
      totalProjects: 156,
      completedProjects: 89,
      codeQuality: {
        coverage: 94.2,
        bugs: 23,
        technicalDebt: 156
      },
      performance: {
        avgResponseTime: 234,
        uptime: 99.8,
        errorRate: 0.2
      },
      aiInsights: {
        autoReviewsCompleted: 342,
        bugsAutoResolved: 89,
        codeImprovements: 567
      }
    };

    setAnalyticsData(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-indigo-500"></div>
          <div className="text-white text-lg">AI Analytics Loading...</div>
          <div className="text-slate-400 text-sm">Analyzing code patterns and generating insights</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
                <Brain className="w-8 h-8 text-indigo-500" />
                AI Analytics Dashboard
              </h1>
              <p className="text-slate-400">Advanced analytics with AI-powered insights and automation</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAutoMode(!autoMode)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  autoMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-slate-600 hover:bg-slate-700 text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                {autoMode ? 'Auto Mode ON' : 'Auto Mode OFF'}
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-indigo-500" />
              System Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400">Total Users</span>
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-white">{analyticsData?.totalUsers}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400">Active Projects</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-white">{analyticsData?.completedProjects}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400">Code Coverage</span>
                  <Shield className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-white">{analyticsData?.codeQuality.coverage}%</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-500" />
              AI Insights
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Auto Reviews Completed</div>
                  <div className="text-3xl font-bold text-white">{analyticsData?.aiInsights.autoReviewsCompleted}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Bugs Auto Resolved</div>
                  <div className="text-3xl font-bold text-white">{analyticsData?.aiInsights.bugsAutoResolved}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Code Improvements</div>
                  <div className="text-3xl font-bold text-white">{analyticsData?.aiInsights.codeImprovements}</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-slate-800/30 rounded-lg">
                <div className="text-slate-400 text-sm mb-2">AI Performance Metrics</div>
                <div className="text-white text-sm">
                  <div>• Code review accuracy: 94%</div>
                  <div>• Bug detection rate: 87%</div>
                  <div>• Performance improvement suggestions: 156</div>
                  <div>• Automated fixes applied: 89</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-500" />
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Average Response Time</div>
                <div className="text-3xl font-bold text-white">{analyticsData?.performance.avgResponseTime}ms</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">System Uptime</div>
                <div className="text-3xl font-bold text-white">{analyticsData?.performance.uptime}%</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Error Rate</div>
                <div className="text-3xl font-bold text-white">{analyticsData?.performance.errorRate}%</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <GitPullRequest className="w-6 h-6 text-green-500" />
              Automated PRs
            </h2>
            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Auto: Optimize user authentication flow</h3>
                    <p className="text-slate-400 text-sm">AI-generated PR to optimize authentication based on performance analysis</p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs mb-1">8 files • +234 -89</div>
                    <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">COMPLETED</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Auto: Fix memory leak in dashboard</h3>
                    <p className="text-slate-400 text-sm">Automated fix for memory leak detected in dashboard component</p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs mb-1">3 files • +45 -12</div>
                    <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">MERGING</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Auto: Add performance monitoring</h3>
                    <p className="text-slate-400 text-sm">AI-suggested addition of performance monitoring and alerting system</p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs mb-1">12 files • +567 -23</div>
                    <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">READY</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-slate-800/30 rounded-lg">
              <div className="text-slate-400 text-sm mb-2">AI Automation Status</div>
              <div className="text-white text-sm">
                <div>• Auto PR generation: Active</div>
                <div>• Code review automation: Enabled</div>
                <div>• Bug detection and auto-fix: Running</div>
                <div>• Performance optimization: Scheduled</div>
              </div>
            </div>
          </motion.div>
        </div>

        {autoMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>AI Auto Mode Active</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyticsDashboard;
