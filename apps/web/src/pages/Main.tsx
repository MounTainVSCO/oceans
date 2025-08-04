import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export function Main() {
  const [milestones, setMilestones] = useState(mockMilestones);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

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
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      
      <Typography variant="h3" className="mb-3 text-center">
        Start building your story
      </Typography>
      
      <Typography variant="body" className="text-center max-w-md mb-8">
        Record the moments that matter. Create a timeline of your accomplishments, 
        milestones, and turning points that shape who you are.
      </Typography>
      
      <Button 
        onClick={() => setIsAddModalOpen(true)}
        size="lg"
        className="bg-gray-900 hover:bg-gray-800 text-white mb-8"
      >
        Add your first milestone
      </Button>
      
      {/* Quick suggestions */}
      <div className="w-full max-w-2xl">
        <Typography variant="overline" className="text-center block mb-4">
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
              className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <Typography variant="h4" className="text-sm group-hover:text-gray-900">
                  {suggestion.title}
                </Typography>
                <span className="text-xs text-gray-400 capitalize">{suggestion.category}</span>
              </div>
              <Typography variant="caption" className="text-gray-500 text-xs">
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
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Milestones"
          value={stats.total}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <StatsCard
          label="This Year"
          value={stats.thisYear}
          description={`${stats.thisYear} new milestone${stats.thisYear !== 1 ? 's' : ''}`}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatsCard
          label="Categories"
          value={stats.categoryCount}
          description={stats.topCategory !== 'none' ? `Most: ${stats.topCategory}` : ''}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
        />
        <StatsCard
          label="Journey"
          value={milestones.length > 0 ? `${new Date().getFullYear() - Math.min(...milestones.map(m => new Date(m.date).getFullYear()))} years` : '0 years'}
          description="of memories"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>
      
      {/* Header Controls */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h2" className="mb-2">
              Your Journey
            </Typography>
            <Typography variant="body" className="text-gray-500">
              {milestones.length} {milestones.length === 1 ? 'milestone' : 'milestones'} recorded
            </Typography>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/timeline/1">
              <Button 
                variant="outline"
                className="text-gray-600 hover:text-gray-900"
              >
                Edit Timeline
              </Button>
            </Link>
            
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
            </div>
            
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white"
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
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <Typography variant="h4" className="text-white text-sm font-bold">
                    {year.toString().slice(-2)}
                  </Typography>
                </div>
              </div>
              
              <div className="flex-1">
                <Typography variant="h3" className="text-gray-900 mb-1">
                  {year}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {groupedByYear[year].length} milestone{groupedByYear[year].length !== 1 ? 's' : ''}
                </Typography>
              </div>
              
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            
            <div className="space-y-6 relative pl-16">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
              
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
      <div className="bg-white h-screen flex flex-col">
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
      </div>
    </DashboardLayout>
  );
}
