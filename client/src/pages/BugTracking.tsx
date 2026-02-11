import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bug, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar, 
  Search,
  Plus, 
  Edit, 
  Trash2, 
  MessageSquare, 
  GitBranch,
  TrendingUp,
  Tag,
  RefreshCw,
  Download,
  ExternalLink
} from 'lucide-react';

interface BugReport {
  id: string;
  title: string;
  description: string;
  reporter: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'reopened';
  category: 'bug' | 'feature' | 'improvement' | 'question';
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  project: string;
  labels: string[];
  attachments: number;
  comments: number;
  reproducible: boolean;
  environment: string;
  browser?: string;
  os?: string;
}

const BugTracking = () => {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [filteredBugs, setFilteredBugs] = useState<BugReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBugs, setSelectedBugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewBugForm, setShowNewBugForm] = useState(false);

  useEffect(() => {
    // Mock data - in real app, this would be API calls
    const mockBugs: BugReport[] = [
      {
        id: '1',
        title: 'Authentication fails on mobile devices',
        description: 'Users cannot log in using mobile browsers due to CORS policy issue. Desktop browsers work correctly.',
        reporter: 'John Doe',
        assignee: 'Jane Smith',
        priority: 'high',
        status: 'in-progress',
        category: 'bug',
        createdAt: '2024-01-20T08:30:00Z',
        updatedAt: '2024-01-20T10:15:00Z',
        dueDate: '2024-01-25',
        project: 'Resource Allocation Frontend',
        labels: ['mobile', 'authentication', 'critical'],
        attachments: 3,
        comments: 8,
        reproducible: true,
        environment: 'production',
        browser: 'Safari Mobile',
        os: 'iOS'
      },
      {
        id: '2',
        title: 'Memory leak in dashboard',
        description: 'Dashboard component continues to consume memory even when not visible. Memory usage increases by ~50MB per hour.',
        reporter: 'Sarah Wilson',
        priority: 'medium',
        status: 'open',
        category: 'bug',
        createdAt: '2024-01-19T14:20:00Z',
        updatedAt: '2024-01-19T14:20:00Z',
        project: 'Resource Allocation Frontend',
        labels: ['performance', 'memory'],
        attachments: 2,
        comments: 5,
        reproducible: true,
        environment: 'production'
      },
      {
        id: '3',
        title: 'Add dark mode support',
        description: 'Users have requested dark mode for better accessibility during night time.',
        reporter: 'Mike Johnson',
        priority: 'medium',
        status: 'open',
        category: 'feature',
        createdAt: '2024-01-18T16:45:00Z',
        updatedAt: '2024-01-18T16:45:00Z',
        project: 'Resource Allocation Frontend',
        labels: ['enhancement', 'ui'],
        attachments: 0,
        comments: 12,
        reproducible: false,
        environment: 'all'
      },
      {
        id: '4',
        title: 'API rate limiting not working',
        description: 'API endpoints are not properly rate limiting requests, causing potential DDoS vulnerability.',
        reporter: 'Admin User',
        assignee: 'Dev Team',
        priority: 'critical',
        status: 'resolved',
        category: 'bug',
        createdAt: '2024-01-17T09:30:00Z',
        updatedAt: '2024-01-20T11:00:00Z',
        project: 'Resource Allocation Backend',
        labels: ['security', 'api', 'critical'],
        attachments: 5,
        comments: 15,
        reproducible: true,
        environment: 'production'
      }
    ];

    setBugs(mockBugs);
    setFilteredBugs(mockBugs);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = bugs;

    if (searchTerm) {
      filtered = filtered.filter(bug =>
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.reporter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(bug => bug.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(bug => bug.priority === priorityFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(bug => bug.category === categoryFilter);
    }

    setFilteredBugs(filtered);
  }, [bugs, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const handleSelectAll = () => {
    if (selectedBugs.length === filteredBugs.length) {
      setSelectedBugs([]);
    } else {
      setSelectedBugs(filteredBugs.map(bug => bug.id));
    }
  };

  const handleSelectBug = (bugId: string) => {
    setSelectedBugs(prev =>
      prev.includes(bugId)
        ? prev.filter(id => id !== bugId)
        : [...prev, bugId]
    );
  };

  const handleBulkAction = (action: 'resolve' | 'close' | 'assign' | 'delete' | 'export') => {
    console.log(`Bulk action: ${action} on bugs:`, selectedBugs);
    // Implement bulk action logic here
    setSelectedBugs([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'resolved':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'closed':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'reopened':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug':
        return <Bug className="w-4 h-4" />;
      case 'feature':
        return <Plus className="w-4 h-4" />;
      case 'improvement':
        return <TrendingUp className="w-4 h-4" />;
      case 'question':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const stats = {
    total: bugs.length,
    open: bugs.filter(b => b.status === 'open').length,
    inProgress: bugs.filter(b => b.status === 'in-progress').length,
    resolved: bugs.filter(b => b.status === 'resolved').length,
    critical: bugs.filter(b => b.priority === 'critical').length,
    avgResolutionTime: '3.2 days'
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
              <h1 className="text-3xl font-bold text-white mb-2">Bug Tracking</h1>
              <p className="text-slate-400">Track and manage bug reports and issues</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowNewBugForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Report Bug
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
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
              <span className="text-slate-400 text-sm">Total Issues</span>
              <Bug className="w-4 h-4 text-indigo-500" />
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
              <span className="text-slate-400 text-sm">Open</span>
              <AlertTriangle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.open}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">In Progress</span>
              <Clock className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Resolved</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.resolved}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Critical</span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.critical}</div>
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
                  placeholder="Search bugs..."
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
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="reopened">Reopened</option>
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
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="improvement">Improvement</option>
                <option value="question">Question</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedBugs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-white">
                  {selectedBugs.length} issue{selectedBugs.length !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => handleSelectAll()}
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                >
                  {selectedBugs.length === filteredBugs.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('assign')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Assign
                </button>
                <button
                  onClick={() => handleBulkAction('resolve')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleBulkAction('close')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bugs List */}
        <div className="space-y-4">
          {filteredBugs.map((bug, index) => (
            <motion.div
              key={bug.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{bug.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                      {bug.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bug.status)}`}>
                      {bug.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                      {bug.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Reported by {bug.reporter}</span>
                    </div>
                    {bug.assignee && (
                      <div className="flex items-center space-x-1">
                        <span>Assigned to {bug.assignee}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <GitBranch className="w-4 h-4" />
                      <span>{bug.project}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-slate-300 mb-4">{bug.description}</p>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-slate-400">Environment:</span>
                    <span className="text-white">{bug.environment}</span>
                  </div>
                </div>
                {bug.browser && (
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-slate-400">Browser:</span>
                      <span className="text-white">{bug.browser}</span>
                    </div>
                  </div>
                )}
                {bug.os && (
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-slate-400">OS:</span>
                      <span className="text-white">{bug.os}</span>
                    </div>
                  </div>
                )}
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-slate-400">Reproducible:</span>
                    <span className={bug.reproducible ? 'text-green-400' : 'text-red-400'}>
                      {bug.reproducible ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-slate-400">Attachments:</span>
                    <span className="text-white">{bug.attachments}</span>
                  </div>
                </div>
              </div>

              {/* Labels */}
              {bug.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {bug.labels.map((label, labelIndex) => (
                    <span
                      key={labelIndex}
                      className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{bug.comments} comments</span>
                  </div>
                  {bug.dueDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(bug.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-slate-500">
                  Updated: {new Date(bug.updatedAt).toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BugTracking;
