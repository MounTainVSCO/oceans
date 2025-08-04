import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function TimelinePage() {
  const { user } = useAuthContext();
  const [view, setView] = useState<'timeline' | 'yearly' | 'stats'>('timeline');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data - replace with actual data fetching
  const milestones = [
    {
      id: 1,
      title: "Started learning TypeScript",
      date: "2025-01-15",
      description: "Finally diving deep into type safety",
      category: "learning"
    },
    {
      id: 2,
      title: "Moved to new apartment",
      date: "2024-12-01", 
      description: "Found a place with natural light and a good kitchen",
      category: "life"
    },
    {
      id: 3,
      title: "Launched side project",
      date: "2024-11-20",
      description: "Simple todo app with 100+ users now",
      category: "career"
    },
    {
      id: 4,
      title: "Completed meditation challenge",
      date: "2024-10-30",
      description: "30 days of morning meditation, actually stuck with it",
      category: "health"
    },
    {
      id: 5,
      title: "Published first Medium article",
      date: "2024-09-15",
      description: "1,200 words on sustainable design practices",
      category: "career"
    },
    {
      id: 6,
      title: "Started therapy",
      date: "2024-08-01",
      description: "Finally prioritized my mental health",
      category: "health"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      career: 'bg-blue-100 text-blue-800',
      learning: 'bg-green-100 text-green-800',
      health: 'bg-purple-100 text-purple-800',
      life: 'bg-orange-100 text-orange-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <Container>
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-gray-900 rounded-sm mr-3 flex items-center justify-center">
                  <div className="w-3 h-3 border border-white rounded-sm" />
                </div>
                <span className="text-lg font-semibold text-gray-900 tracking-tight">
                  milestones
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Typography variant="caption" className="text-gray-600">
                {user?.name || 'Welcome back'}
              </Typography>
              <Button 
                size="sm" 
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide"
                onClick={() => setShowAddForm(true)}
              >
                Add Milestone
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Section>
        <Container size="lg">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm border border-gray-200 p-6 sticky top-6">
                <div className="mb-6">
                  <Typography variant="h4" className="mb-2">
                    Your Timeline
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {milestones.length} milestones recorded
                  </Typography>
                </div>

                {/* View Toggle */}
                <div className="space-y-1 mb-8">
                  <button
                    onClick={() => setView('timeline')}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                      view === 'timeline' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Timeline View
                  </button>
                  <button
                    onClick={() => setView('yearly')}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                      view === 'yearly' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Year in Review
                  </button>
                  <button
                    onClick={() => setView('stats')}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                      view === 'stats' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Insights
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                  <div>
                    <Typography variant="caption" className="text-gray-500 uppercase tracking-wider mb-1 block">
                      This Month
                    </Typography>
                    <Typography variant="h3" className="text-gray-900">2</Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-500 uppercase tracking-wider mb-1 block">
                      This Year
                    </Typography>
                    <Typography variant="h3" className="text-gray-900">6</Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="text-gray-500 uppercase tracking-wider mb-1 block">
                      All Time
                    </Typography>
                    <Typography variant="h3" className="text-gray-900">47</Typography>
                  </div>
                </div>

                {/* Categories */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Typography variant="caption" className="text-gray-500 uppercase tracking-wider mb-4 block">
                    Categories
                  </Typography>
                  <div className="space-y-2">
                    {['career', 'learning', 'health', 'life'].map(category => (
                      <div key={category} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 capitalize">{category}</span>
                        <span className="text-gray-500">
                          {milestones.filter(m => m.category === category).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {view === 'timeline' && (
                <div className="space-y-6">
                  {/* Timeline Header */}
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <Typography variant="h3" className="mb-2">
                          Recent Milestones
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Your latest achievements and turning points
                        </Typography>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Filter
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Items */}
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="bg-white rounded-sm border border-gray-200 p-6 hover:shadow-sm transition-shadow group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <Typography variant="h4" className="text-gray-900">
                                  {milestone.title}
                                </Typography>
                                <span className={`px-2 py-1 text-xs rounded-sm uppercase tracking-wider font-medium ${getCategoryColor(milestone.category)}`}>
                                  {milestone.category}
                                </span>
                              </div>
                              <Typography variant="caption" className="text-gray-600 mb-3 block">
                                {milestone.description}
                              </Typography>
                              <Typography variant="caption" className="text-gray-500">
                                {formatDate(milestone.date)} • {getRelativeDate(milestone.date)}
                              </Typography>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h.01M12 12h.01M18 12h.01" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Milestone CTA */}
                  <div 
                    className="bg-white rounded-sm border border-gray-200 border-dashed p-8 text-center hover:border-gray-300 transition-colors cursor-pointer"
                    onClick={() => setShowAddForm(true)}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-sm mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <Typography variant="h4" className="mb-2">
                      Add your next milestone
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 mb-4">
                      What's worth remembering from today?
                    </Typography>
                    <Button 
                      className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide"
                      onClick={() => setShowAddForm(true)}
                    >
                      Add Milestone
                    </Button>
                  </div>
                </div>
              )}

              {view === 'yearly' && (
                <div className="bg-white rounded-sm border border-gray-200 p-8">
                  <Typography variant="h3" className="mb-6 text-center">
                    2024 Year in Review
                  </Typography>
                  <div className="text-center mb-8">
                    <ImagePlaceholder 
                      height={400} 
                      label="Year Summary Visualization"
                      className="rounded-sm"
                    />
                  </div>
                  <div className="max-w-2xl mx-auto text-center space-y-4">
                    <Typography variant="body">
                      Your yearly summary will show milestone patterns, growth areas, 
                      and reflection prompts based on your achievements.
                    </Typography>
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      <div className="p-4 bg-gray-50 rounded-sm">
                        <Typography variant="h3" className="text-gray-900 mb-1">6</Typography>
                        <Typography variant="caption" className="text-gray-500">Total Milestones</Typography>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-sm">
                        <Typography variant="h3" className="text-gray-900 mb-1">4</Typography>
                        <Typography variant="caption" className="text-gray-500">Categories</Typography>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-sm">
                        <Typography variant="h3" className="text-gray-900 mb-1">2</Typography>
                        <Typography variant="caption" className="text-gray-500">Most Active Month</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {view === 'stats' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <Typography variant="h3" className="mb-6">
                      Your Progress Insights
                    </Typography>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gray-50 rounded-sm">
                        <Typography variant="h2" className="text-gray-900 mb-2">6</Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Milestones this year
                        </Typography>
                      </div>
                      <div className="text-center p-6 bg-gray-50 rounded-sm">
                        <Typography variant="h2" className="text-gray-900 mb-2">4</Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Different categories
                        </Typography>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <Typography variant="h4" className="mb-6">
                      Category Breakdown
                    </Typography>
                    <div className="space-y-4">
                      {[
                        { category: 'Career', count: 2, percentage: 33 },
                        { category: 'Learning', count: 2, percentage: 33 },
                        { category: 'Health', count: 1, percentage: 17 },
                        { category: 'Life', count: 1, percentage: 17 }
                      ].map(item => (
                        <div key={item.category} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                            <div className="w-32 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-gray-900 rounded-full" 
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{item.count} milestones</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <Typography variant="h4" className="mb-4">
                      Monthly Activity
                    </Typography>
                    <div className="h-32">
                      <ImagePlaceholder 
                        height={128} 
                        label="Monthly Activity Chart"
                        className="rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Add Milestone Modal/Form - Simple placeholder */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm max-w-md w-full p-6">
            <Typography variant="h4" className="mb-4">
              Add New Milestone
            </Typography>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="What did you accomplish?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                  rows={3}
                  placeholder="Tell the story..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900">
                  <option>Career</option>
                  <option>Learning</option>
                  <option>Health</option>
                  <option>Life</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide flex-1"
              >
                Save Milestone
              </Button>
              <Button 
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
