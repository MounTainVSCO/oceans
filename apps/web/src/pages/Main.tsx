import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/Button';

interface Timeline {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  milestones: any[];
}

export function Main() {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [newTimeline, setNewTimeline] = useState({
    title: '',
    description: '',
    isPublic: false
  });
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'personal',
    importance: 5,
    location: '',
    tags: [] as string[],
    mood: 'happy' as 'happy' | 'sad' | 'excited' | 'reflective' | 'proud' | 'grateful'
  });
  const [currentTag, setCurrentTag] = useState('');

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
      console.error('Error fetching timelines:', error);
    }
  };

  const handleCreateTimeline = async () => {
    if (!newTimeline.title.trim()) return;

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
        const timeline = await response.json();
        setTimelines([...timelines, timeline]);
        setNewTimeline({ title: '', description: '', isPublic: false });
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating timeline:', error);
    }
  };

  const handleCreateMilestone = async () => {
    if (!newMilestone.title.trim()) return;

    try {
      // For now, just add to local state - replace with API call
      const milestone = {
        ...newMilestone,
        id: Date.now(),
        date: newMilestone.date
      };
      
      // Add to milestones array (this would be an API call in real app)
      console.log('Creating milestone:', milestone);
      
      // Reset form
      setNewMilestone({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: 'personal',
        importance: 5,
        location: '',
        tags: [],
        mood: 'happy'
      });
      setShowMilestoneModal(false);
    } catch (error) {
      console.error('Error creating milestone:', error);
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !newMilestone.tags.includes(tag.trim())) {
      setNewMilestone(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewMilestone(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const EmptyState = () => (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Decorative illustration */}
        <div className="mb-12 relative">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg ring-1 ring-[#5b4636]/10">
            <svg className="w-24 h-24 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-300 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <h2 className="text-8xl font-bold tracking-tight text-[#4b3a2d] mb-8" style={{ fontFamily: "'Amatic SC', cursive" }}>
          Welcome to Oceans
        </h2>
        
        <p className="text-3xl text-[#6b5748] mb-16 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Amatic SC', cursive" }}>
          Create your first timeline and start documenting the important moments of your life
        </p>
        
        <Button 
          onClick={() => setShowCreateModal(true)}
          size="lg"
          className="bg-[#4b3a2d] hover:bg-[#3a2922] text-white text-3xl px-16 py-8 shadow-xl hover:-translate-y-1 transition-all duration-200 rounded-3xl"
          style={{ fontFamily: "'Amatic SC', cursive" }}
        >
          <svg className="w-8 h-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Your Timeline
        </Button>
      </div>
    </div>
  );

  const DashboardContent = () => (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Welcome Header */}
        <div className="mb-16 text-center">
          <h1 className="text-8xl font-bold tracking-tight text-[#4b3a2d] mb-6" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Your Timelines
          </h1>
          <p className="text-3xl text-[#6b5748] max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Create beautiful timelines to organize and share the important moments of your life
          </p>
          
          <Button 
            onClick={() => setShowCreateModal(true)}
            size="lg"
            className="bg-[#4b3a2d] hover:bg-[#3a2922] text-white text-2xl px-12 py-6 shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-2xl"
            style={{ fontFamily: "'Amatic SC', cursive" }}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Your First Timeline
          </Button>
        </div>

        {/* Timeline Section */}
        {timelines.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-6xl font-bold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Your Timelines
                </h2>
                <p className="text-2xl text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {timelines.length} {timelines.length === 1 ? 'timeline' : 'timelines'} created
                </p>
              </div>
              <Button 
                onClick={() => setShowCreateModal(true)}
                variant="outline"
                className="border-2 border-[#4b3a2d] text-[#4b3a2d] hover:bg-[#f5e6d3] text-xl px-8 py-4"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timelines.map(timeline => (
                <Link 
                  key={timeline.id} 
                  to={`/timeline/${timeline.id}`}
                  className="group block bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-amber-900 truncate group-hover:text-amber-800" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {timeline.title}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      timeline.isPublic 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`} style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {timeline.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                  {timeline.description && (
                    <p className="text-lg text-amber-700 mb-4 line-clamp-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {timeline.description}
                    </p>
                  )}
                  <div className="flex items-center text-amber-600" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeline.milestones.length} milestone{timeline.milestones.length !== 1 ? 's' : ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {timelines.length === 0 ? <EmptyState /> : <DashboardContent />}
      
      {/* Create Timeline Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md border border-[#5b4636]/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Create Timeline
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-10 h-10 bg-amber-100 hover:bg-amber-200 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Timeline Title
                </label>
                <input
                  type="text"
                  value={newTimeline.title}
                  onChange={(e) => setNewTimeline(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                  placeholder="My Amazing Journey"
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Description
                </label>
                <textarea
                  value={newTimeline.description}
                  onChange={(e) => setNewTimeline(prev => ({...prev, description: e.target.value}))}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d] resize-none"
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
                  className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-3 text-lg text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Make timeline public
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                onClick={() => setShowCreateModal(false)}
                variant="outline"
                className="flex-1 border-2 border-amber-200 text-amber-800 hover:bg-amber-50 text-lg py-3"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTimeline}
                className="flex-1 bg-amber-800 hover:bg-amber-900 text-white text-lg py-3 shadow-lg"
                disabled={!newTimeline.title.trim()}
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Create Timeline
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Milestone Modal */}
      {showMilestoneModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-2xl border border-[#5b4636]/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Add Life Moment
              </h2>
              <button
                onClick={() => setShowMilestoneModal(false)}
                className="w-10 h-10 bg-amber-100 hover:bg-amber-200 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  What happened?
                </label>
                <input
                  type="text"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                  placeholder="Started my first job, Graduated college, Moved to NYC..."
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                />
              </div>

              {/* Date and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    When?
                  </label>
                  <input
                    type="date"
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone(prev => ({...prev, date: e.target.value}))}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Where?
                  </label>
                  <input
                    type="text"
                    value={newMilestone.location}
                    onChange={(e) => setNewMilestone(prev => ({...prev, location: e.target.value}))}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                    placeholder="San Francisco, Home, Office..."
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Tell me more about it...
                </label>
                <textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({...prev, description: e.target.value}))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d] resize-none"
                  placeholder="How did it feel? What did you learn? What was special about this moment?"
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                />
              </div>

              {/* Category and Mood */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Category
                  </label>
                  <select
                    value={newMilestone.category}
                    onChange={(e) => setNewMilestone(prev => ({...prev, category: e.target.value}))}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                  >
                    <option value="personal">Personal</option>
                    <option value="career">Career</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="travel">Travel</option>
                    <option value="relationships">Relationships</option>
                    <option value="achievements">Achievements</option>
                    <option value="creative">Creative</option>
                    <option value="financial">Financial</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    How did it feel?
                  </label>
                  <select
                    value={newMilestone.mood}
                    onChange={(e) => setNewMilestone(prev => ({...prev, mood: e.target.value as any}))}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                  >
                    <option value="happy">😊 Happy</option>
                    <option value="excited">🎉 Excited</option>
                    <option value="proud">💪 Proud</option>
                    <option value="grateful">🙏 Grateful</option>
                    <option value="reflective">🤔 Reflective</option>
                    <option value="sad">😢 Sad</option>
                  </select>
                </div>
              </div>

              {/* Importance Scale */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  How important is this? ({newMilestone.importance}/10)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newMilestone.importance}
                    onChange={(e) => setNewMilestone(prev => ({...prev, importance: parseInt(e.target.value)}))}
                    className="flex-1 h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${newMilestone.importance * 10}%, #fde68a ${newMilestone.importance * 10}%, #fde68a 100%)`
                    }}
                  />
                  <span className="text-amber-600">10</span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newMilestone.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 border border-amber-200"
                      style={{ fontFamily: "'Amatic SC', cursive" }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 w-4 h-4 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center text-amber-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(currentTag);
                      }
                    }}
                    className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 bg-amber-50/50 text-[#4b3a2d]"
                    placeholder="Add tags like 'milestone', 'new-beginnings'..."
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => addTag(currentTag)}
                    className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-xl transition-colors"
                    style={{ fontFamily: "'Amatic SC', cursive" }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                onClick={() => setShowMilestoneModal(false)}
                variant="outline"
                className="flex-1 border-2 border-amber-200 text-amber-800 hover:bg-amber-50 text-lg py-3"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateMilestone}
                className="flex-1 bg-amber-800 hover:bg-amber-900 text-white text-lg py-3 shadow-lg"
                disabled={!newMilestone.title.trim()}
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Save Moment
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
