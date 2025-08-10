import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/Button';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MilestoneCard } from '@/components/milestones/MilestoneCard';
import { AddMilestoneModal } from '@/components/milestones/AddMilestoneModal';
import { StatsCard } from '@/components/StatsCard';

// Mock data - replace with actual API calls
const mockMilestones = [
  {
    id: 1,
    title: "Started my first job at TechCorp",
    date: "2024-01-15",
    description: "Joined as a Software Engineer. Excited to begin this new chapter in my career journey.",
    category: "career"
  },
  {
    id: 2,
    title: "Completed marathon training",
    date: "2023-11-20",
    description: "Successfully completed my 16-week marathon training program. Ready for the big race!",
    category: "health"
  },
  {
    id: 3,
    title: "Published my first article",
    date: "2023-09-10",
    description: "Article on React performance optimization was published in TechBlog with 1000+ views.",
    category: "creative"
  }
];

interface Timeline {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  milestones: any[];
}

export function Main() {
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState(mockMilestones);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [newTimeline, setNewTimeline] = useState({
    title: '',
    description: '',
    isPublic: false
  });

  // Fetch user's timelines
  useEffect(() => {
    fetchTimelines();
  }, []);

  const fetchTimelines = async () => {
    try {
      const response = await fetch('/api/timelines', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTimelines(data);
      }
    } catch (error) {
      console.error('Failed to fetch timelines:', error);
    }
  };

  const handleCreateTimeline = async () => {
    try {
      const response = await fetch('/api/timelines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTimeline),
      });
      
      if (response.ok) {
        const createdTimeline = await response.json();
        setTimelines(prev => [...prev, createdTimeline]);
        setNewTimeline({ title: '', description: '', isPublic: false });
        setShowCreateModal(false);
        // Navigate to the new timeline editor
        navigate(`/timeline/${createdTimeline.id}`);
      }
    } catch (error) {
      console.error('Failed to create timeline:', error);
    }
  };

  const handleAddMilestone = (newMilestone: any) => {
    const milestone = {
      ...newMilestone,
      id: Date.now(), // In real app, this would come from the API
    };
    setMilestones([milestone, ...milestones]);
    setIsAddModalOpen(false);
  };

  const handleEditMilestone = (milestone: any) => {
    // TODO: Implement edit functionality
    console.log('Edit milestone:', milestone);
  };

  const handleDeleteMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const getStats = () => {
    const currentYear = new Date().getFullYear();
    const thisYearCount = milestones.filter(m => 
      new Date(m.date).getFullYear() === currentYear
    ).length;
    
    const categories = milestones.reduce((acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0];
    
    return {
      total: milestones.length,
      thisYear: thisYearCount,
      topCategory: topCategory ? topCategory[0] : 'none',
      categoryCount: Object.keys(categories).length
    };
  };

  const stats = getStats();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      
      <Typography variant="h3" className="mb-3 text-center text-amber-900 font-bold" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '2.5rem' }}>
        Start building your story
      </Typography>
      
      <Typography variant="body" className="text-center max-w-md mb-8 text-amber-800 font-light" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.5rem' }}>
        Record the moments that matter. Create a timeline of your accomplishments, 
        milestones, and turning points that shape who you are.
      </Typography>
      
      <div className="flex gap-3 mb-8">
        <Button 
          onClick={() => setShowCreateModal(true)}
          size="lg"
          className="bg-amber-800 hover:bg-amber-900 text-white font-light"
          style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.25rem' }}
        >
          Create Timeline
        </Button>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          size="lg"
          variant="outline"
          className="border-amber-800 text-amber-800 hover:bg-amber-50 font-light"
          style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.25rem' }}
        >
          Add Milestone
        </Button>
      </div>
      
      {/* Quick suggestions */}
      <div className="w-full max-w-2xl">
        <Typography variant="overline" className="text-center block mb-4 text-amber-700 font-light" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.25rem' }}>
          Need inspiration? Try adding:
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { category: 'career', title: 'Started new job', description: 'Career milestone' },
            { category: 'learning', title: 'Completed course', description: 'Education achievement' },
            { category: 'health', title: 'Fitness goal achieved', description: 'Health & wellness' },
            { category: 'creative', title: 'Published work', description: 'Creative expression' },
            { category: 'life', title: 'Moved to new city', description: 'Life transition' },
            { category: 'relationships', title: 'Met someone special', description: 'Personal connection' }
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setIsAddModalOpen(true)}
              className="text-left p-4 border border-amber-200 rounded-lg hover:bg-amber-50 hover:border-amber-300 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <Typography variant="h4" className="text-base group-hover:text-amber-900 text-amber-800 font-light" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {suggestion.title}
                </Typography>
                <span className="text-sm text-amber-600 capitalize font-light" style={{ fontFamily: "'Amatic SC', cursive" }}>{suggestion.category}</span>
              </div>
              <Typography variant="caption" className="text-amber-700 text-sm font-light" style={{ fontFamily: "'Amatic SC', cursive" }}>
                {suggestion.description}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const TimelineHeader = () => (
    <div className="mb-8">
      
      {/* Timelines Section */}
      {timelines.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h3" className="text-amber-900 font-bold" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '2rem' }}>
              Your Timelines
            </Typography>
            <Button 
              onClick={() => setShowCreateModal(true)}
              variant="outline"
              className="text-base border-amber-800 text-amber-800 hover:bg-amber-50 font-light"
              style={{ fontFamily: "'Amatic SC', cursive" }}
            >
              Create New
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timelines.map(timeline => (
              <Link 
                key={timeline.id} 
                to={`/timeline/${timeline.id}`}
                className="block p-4 border border-amber-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-amber-900 truncate text-lg" style={{ fontFamily: "'Amatic SC', cursive" }}>{timeline.title}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-light ${
                    timeline.isPublic 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`} style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {timeline.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                {timeline.description && (
                  <p className="text-base text-amber-700 mb-2 line-clamp-2 font-light" style={{ fontFamily: "'Amatic SC', cursive" }}>{timeline.description}</p>
                )}
                <div className="flex items-center text-sm text-amber-600 font-light" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {timeline.milestones.length} milestone{timeline.milestones.length !== 1 ? 's' : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Header Controls */}
      <div className="border-b border-amber-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h2" className="mb-2 text-amber-900 font-bold" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '3rem' }}>
              Your Journey
            </Typography>
            <Typography variant="body" className="text-amber-700 font-light" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.25rem' }}>
              {milestones.length} {milestones.length === 1 ? 'milestone' : 'milestones'} recorded
            </Typography>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowCreateModal(true)}
              variant="outline"
              className="text-amber-800 hover:text-amber-900 border-amber-800 hover:bg-amber-50 font-light"
              style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
            >
              Create Timeline
            </Button>
            
            {timelines.length > 0 && (
              <Link to={`/timeline/${timelines[0].id}`}>
                <Button 
                  variant="outline"
                  className="text-amber-800 hover:text-amber-900 border-amber-800 hover:bg-amber-50 font-light"
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                >
                  Edit Timeline
                </Button>
              </Link>
            )}
            
            <div className="flex items-center bg-amber-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-base font-light rounded transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-700 hover:text-amber-900'
                }`}
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-base font-light rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-700 hover:text-amber-900'
                }`}
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Grid
              </button>
            </div>
            
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-amber-800 hover:bg-amber-900 text-white font-light"
              style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
            >
              Add milestone
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const TimelineView = () => {
    const groupedByYear = milestones.reduce((acc, milestone) => {
      const year = new Date(milestone.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(milestone);
      return acc;
    }, {} as Record<number, typeof milestones>);

    const sortedYears = Object.keys(groupedByYear)
      .map(Number)
      .sort((a, b) => b - a);

    return (
      <div className="space-y-12">
        {sortedYears.map(year => (
          <div key={year} className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
                  <Typography variant="h4" className="text-white text-lg font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {year.toString().slice(-2)}
                  </Typography>
                </div>
              </div>
              
              <div className="flex-1">
                <Typography variant="h3" className="text-amber-900 mb-1 font-bold" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '2rem' }}>
                  {year}
                </Typography>
                <Typography variant="caption" className="text-amber-700 font-light" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}>
                  {groupedByYear[year].length} milestone{groupedByYear[year].length !== 1 ? 's' : ''}
                </Typography>
              </div>
              
              <div className="h-px bg-amber-200 flex-1" />
            </div>
            
            <div className="space-y-6 relative pl-16">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-amber-200" />
              
              {groupedByYear[year]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((milestone) => (
                  <div key={milestone.id} className="relative">
                    <MilestoneCard
                      milestone={milestone}
                      onEdit={handleEditMilestone}
                      onDelete={handleDeleteMilestone}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {milestones
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onEdit={handleEditMilestone}
            onDelete={handleDeleteMilestone}
          />
        ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col" style={{ backgroundColor: '#faf9f5' }}>
        <div className="max-w-4xl mx-auto px-6 py-8 flex-1 flex flex-col min-h-0">
          {milestones.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState />
            </div>
          ) : (
            <>
              <div className="flex-shrink-0">
                <TimelineHeader />
              </div>
              <div className="flex-1 overflow-y-auto min-h-0">
                {viewMode === 'timeline' ? <TimelineView /> : <GridView />}
              </div>
            </>
          )}
        </div>
        
        {isAddModalOpen && (
          <AddMilestoneModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddMilestone}
          />
        )}

        {/* Create Timeline Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "'Amatic SC', cursive" }}>Create New Timeline</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-amber-400 hover:text-amber-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-base font-light text-amber-800 mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Timeline Title *
                  </label>
                  <input
                    type="text"
                    value={newTimeline.title}
                    onChange={(e) => setNewTimeline(prev => ({...prev, title: e.target.value}))}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                    placeholder="My Life Journey"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                  />
                </div>

                <div>
                  <label className="block text-base font-light text-amber-800 mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Description
                  </label>
                  <textarea
                    value={newTimeline.description}
                    onChange={(e) => setNewTimeline(prev => ({...prev, description: e.target.value}))}
                    rows={3}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 font-light"
                    placeholder="A collection of my most important milestones and achievements"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newTimeline.isPublic}
                    onChange={(e) => setNewTimeline(prev => ({...prev, isPublic: e.target.checked}))}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-base text-amber-800 font-light" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Make timeline public
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setShowCreateModal(false)}
                  variant="outline"
                  className="flex-1 border-amber-800 text-amber-800 hover:bg-amber-50 font-light"
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTimeline}
                  className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-light"
                  disabled={!newTimeline.title.trim()}
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                >
                  Create Timeline
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
