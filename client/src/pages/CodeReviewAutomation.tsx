import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar, 
  Search,
  Plus, 
  Edit, 
  Eye,
  Zap,
  TrendingUp,
  Users,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

interface CodeReview {
  id: string;
  title: string;
  author: string;
  repository: string;
  branch: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'merged';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  reviewers: string[];
  changes: {
    additions: number;
    deletions: number;
    files: number;
  };
  description: string;
  automatedChecks: {
    tests: boolean;
    linting: boolean;
    security: boolean;
    coverage: number;
  };
}

const CodeReviewAutomation = () => {
  const [reviews, setReviews] = useState<CodeReview[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [autoReviewEnabled, setAutoReviewEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock data - in real app, this would be API calls
    const mockReviews: CodeReview[] = [
      {
        id: '1',
        title: 'Add AI-powered resource optimization',
        author: 'John Doe',
        repository: 'resource-allocation-frontend',
        branch: 'feature/ai-optimization',
        status: 'in-review',
        priority: 'high',
        createdAt: '2024-01-20T08:30:00Z',
        updatedAt: '2024-01-20T10:15:00Z',
        reviewers: ['Jane Smith', 'Mike Johnson'],
        changes: {
          additions: 245,
          deletions: 89,
          files: 12
        },
        description: 'Implemented machine learning algorithms for optimal resource allocation based on historical data and predictive analytics.',
        automatedChecks: {
          tests: true,
          linting: true,
          security: true,
          coverage: 87
        }
      },
      {
        id: '2',
        title: 'Fix authentication bug in admin panel',
        author: 'Sarah Wilson',
        repository: 'resource-allocation-backend',
        branch: 'fix/auth-bug',
        status: 'pending',
        priority: 'critical',
        createdAt: '2024-01-20T07:45:00Z',
        updatedAt: '2024-01-20T07:45:00Z',
        reviewers: ['Admin User'],
        changes: {
          additions: 15,
          deletions: 8,
          files: 3
        },
        description: 'Fixed critical security vulnerability in admin authentication that allowed unauthorized access.',
        automatedChecks: {
          tests: false,
          linting: true,
          security: false,
          coverage: 92
        }
      },
      {
        id: '3',
        title: 'Improve dashboard performance',
        author: 'Mike Johnson',
        repository: 'resource-allocation-frontend',
        branch: 'perf/dashboard-optimization',
        status: 'approved',
        priority: 'medium',
        createdAt: '2024-01-19T14:20:00Z',
        updatedAt: '2024-01-20T09:30:00Z',
        reviewers: ['Jane Smith'],
        changes: {
          additions: 156,
          deletions: 203,
          files: 8
        },
        description: 'Optimized dashboard rendering and reduced bundle size by 40%. Added lazy loading for components.',
        automatedChecks: {
          tests: true,
          linting: true,
          security: true,
          coverage: 95
        }
      }
    ];

    setReviews(mockReviews);
    setFilteredReviews(mockReviews);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.repository.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(review => review.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(review => review.priority === priorityFilter);
    }

    setFilteredReviews(filtered);
  }, [reviews, searchTerm, statusFilter, priorityFilter]);

  const handleAutoReview = (reviewId: string) => {
    console.log('Starting automated review for:', reviewId);
    // Implement automated review logic here
    // This would run AI code analysis, security scans, etc.
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'in-review':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'approved':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'merged':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCheckIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-red-500" />
    );
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    inReview: reviews.filter(r => r.status === 'in-review').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    avgReviewTime: '2.5 hours',
    autoReviewRate: '78%'
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Code Review Automation</h1>
              <p className="text-slate-400">Automated code review and PR management</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <GitPullRequest className="w-4 h-4" />
                Create PR
              </button>
              <button
                onClick={() => setAutoReviewEnabled(!autoReviewEnabled)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  autoReviewEnabled 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-slate-600 hover:bg-slate-700 text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                {autoReviewEnabled ? 'Auto-Review ON' : 'Auto-Review OFF'}
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Total Reviews</span>
              <Code className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Pending</span>
              <Clock className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.pending}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">In Review</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.inReview}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Approved</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.approved}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Auto-Review Rate</span>
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.autoReviewRate}</div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="merged">Merged</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{review.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(review.priority)}`}>
                      {review.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {review.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{review.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch className="w-4 h-4" />
                      <span>{review.repository}:{review.branch}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAutoReview(review.id)}
                    disabled={!autoReviewEnabled}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      autoReviewEnabled
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Auto Review
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </button>
                </div>
              </div>

              <p className="text-slate-300 mb-4">{review.description}</p>

              {/* Changes Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-400">
                    <span className="text-2xl font-bold text-white">+{review.changes.additions}</span>
                    <span className="text-sm">Additions</span>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-red-400">
                    <span className="text-2xl font-bold text-white">-{review.changes.deletions}</span>
                    <span className="text-sm">Deletions</span>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <span className="text-2xl font-bold text-white">{review.changes.files}</span>
                    <span className="text-sm">Files</span>
                  </div>
                </div>
              </div>

              {/* Automated Checks */}
              <div className="bg-slate-800/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Automated Checks</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    {getCheckIcon(review.automatedChecks.tests)}
                    <span className="text-sm text-slate-300">Tests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCheckIcon(review.automatedChecks.linting)}
                    <span className="text-sm text-slate-300">Linting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCheckIcon(review.automatedChecks.security)}
                    <span className="text-sm text-slate-300">Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-white font-medium">{review.automatedChecks.coverage}%</div>
                    <span className="text-sm text-slate-300">Coverage</span>
                  </div>
                </div>
              </div>

              {/* Reviewers */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">
                    Reviewers: {review.reviewers.join(', ')}
                  </span>
                </div>
                <div className="text-sm text-slate-500">
                  Updated: {new Date(review.updatedAt).toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeReviewAutomation;
