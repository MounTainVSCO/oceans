import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/Button';

interface Milestone {
  id: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  videoUrl?: string;
}

interface Timeline {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  milestones: Milestone[];
}

interface NewMilestone {
  title: string;
  date: string;
  description: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
}

export function TimelineEditor() {
  const { id } = useParams<{ id: string }>();
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [activeTab, setActiveTab] = useState<'editing' | 'settings' | 'templates'>('editing');
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState({
    title: '',
    description: '',
    isPublic: false
  });
  const [newMilestone, setNewMilestone] = useState<NewMilestone>({
    title: '',
    date: '',
    description: '',
    category: 'life',
    imageUrl: '',
    videoUrl: ''
  });

  // Fetch timeline data
  useEffect(() => {
    if (id) {
      fetchTimeline();
    }
  }, [id]);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/timelines/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTimeline(data);
        setEditingTimeline({
          title: data.title,
          description: data.description || '',
          isPublic: data.isPublic
        });
      }
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTimeline = async () => {
    if (!timeline) return;
    
    try {
      const response = await fetch(`/api/timelines/${timeline.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editingTimeline),
      });
      
      if (response.ok) {
        const updatedTimeline = await response.json();
        setTimeline(updatedTimeline);
      }
    } catch (error) {
      console.error('Failed to save timeline:', error);
    }
  };

  const handleMilestoneSelect = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setActiveTab('editing');
  };

  const handleAddMilestone = async () => {
    if (!timeline) return;
    
    try {
      const response = await fetch(`/api/timelines/${timeline.id}/milestones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMilestone),
      });
      
      if (response.ok) {
        const createdMilestone = await response.json();
        setTimeline(prev => prev ? {
          ...prev,
          milestones: [...prev.milestones, createdMilestone]
        } : null);
        setNewMilestone({
          title: '',
          date: '',
          description: '',
          category: 'life',
          imageUrl: '',
          videoUrl: ''
        });
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Failed to add milestone:', error);
    }
  };

  const handleUpdateMilestone = async () => {
    if (!selectedMilestone) return;
    
    try {
      const response = await fetch(`/api/timelines/${timeline?.id}/milestones/${selectedMilestone.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(selectedMilestone),
      });
      
      if (response.ok) {
        const updatedMilestone = await response.json();
        setTimeline(prev => prev ? {
          ...prev,
          milestones: prev.milestones.map(m => 
            m.id === updatedMilestone.id ? updatedMilestone : m
          )
        } : null);
      }
    } catch (error) {
      console.error('Failed to update milestone:', error);
    }
  };

  const handleDeleteMilestone = async () => {
    if (!selectedMilestone) return;
    
    try {
      const response = await fetch(`/api/timelines/${timeline?.id}/milestones/${selectedMilestone.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        setTimeline(prev => prev ? {
          ...prev,
          milestones: prev.milestones.filter(m => m.id !== selectedMilestone.id)
        } : null);
        setSelectedMilestone(null);
      }
    } catch (error) {
      console.error('Failed to delete milestone:', error);
    }
  };

  const getLifeStage = (date: string) => {
    const birthYear = 2000; // Assume born in 2000 for this example
    const year = new Date(date).getFullYear();
    const age = year - birthYear;

    if (age <= 5) return { name: 'Early Years', color: 'bg-blue-500' };
    if (age <= 12) return { name: 'Elementary', color: 'bg-green-500' };
    if (age <= 14) return { name: 'Middle School', color: 'bg-yellow-500' };
    if (age <= 18) return { name: 'High School', color: 'bg-orange-500' };
    if (age <= 22) return { name: 'College', color: 'bg-purple-500' };
    if (age <= 29) return { name: '20s', color: 'bg-pink-500' };
    if (age <= 39) return { name: '30s', color: 'bg-indigo-500' };
    if (age <= 49) return { name: '40s', color: 'bg-red-500' };
    if (age <= 59) return { name: '50s', color: 'bg-teal-500' };
    if (age <= 69) return { name: '60s', color: 'bg-cyan-500' };
    return { name: '70s+', color: 'bg-gray-500' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      career: 'bg-blue-100 text-blue-800',
      learning: 'bg-green-100 text-green-800',
      health: 'bg-purple-100 text-purple-800',
      life: 'bg-orange-100 text-orange-800',
      creative: 'bg-pink-100 text-pink-800',
      travel: 'bg-indigo-100 text-indigo-800',
      relationships: 'bg-yellow-100 text-yellow-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (!timeline) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Timeline not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-gray-50 flex">

      {/* Left Panel - Editor */}
      <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {/* Action Buttons */}
          <div className="space-y-2 mb-4">
            <Button 
              onClick={handleSaveTimeline}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm py-2"
            >
              Save Changes
            </Button>
            <Button 
              onClick={() => setShowAddModal(true)}
              variant="outline"
              className="w-full text-sm py-2"
            >
              Add Milestone
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('editing')}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'editing'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Editing
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'templates'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'templates' ? (
            /* Templates */
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Timeline Templates</h3>
              
              <div className="space-y-3">
                {/* Template Options */}
                <div className="space-y-2">
                  <div 
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTemplate === 'default' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate('default')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Default Timeline</h4>
                      <div className="w-2 h-2 bg-gray-900 rounded-full" />
                    </div>
                    <p className="text-xs text-gray-600">Classic vertical timeline with life stages</p>
                  </div>

                  <div 
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTemplate === 'minimal' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate('minimal')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Minimal</h4>
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <p className="text-xs text-gray-600">Clean, simple design with minimal visual elements</p>
                  </div>

                  <div 
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTemplate === 'modern' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate('modern')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Modern Cards</h4>
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    </div>
                    <p className="text-xs text-gray-600">Card-based layout with modern styling</p>
                  </div>

                  <div 
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTemplate === 'professional' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate('professional')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Professional</h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <p className="text-xs text-gray-600">Business-focused design for career timelines</p>
                  </div>

                  <div 
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTemplate === 'creative' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate('creative')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Creative</h4>
                      <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    </div>
                    <p className="text-xs text-gray-600">Colorful, artistic design with creative elements</p>
                  </div>
                </div>

                {/* Template Customization */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-900 mb-2">Customization</h4>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Primary Color
                      </label>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 bg-gray-900 rounded cursor-pointer border-2 border-gray-300" />
                        <div className="w-6 h-6 bg-blue-500 rounded cursor-pointer border-2 border-transparent" />
                        <div className="w-6 h-6 bg-green-500 rounded cursor-pointer border-2 border-transparent" />
                        <div className="w-6 h-6 bg-purple-500 rounded cursor-pointer border-2 border-transparent" />
                        <div className="w-6 h-6 bg-pink-500 rounded cursor-pointer border-2 border-transparent" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Font Style
                      </label>
                      <select className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500">
                        <option value="inter">Inter (Default)</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Monospace</option>
                        <option value="display">Display</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Timeline Style
                      </label>
                      <select className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500">
                        <option value="vertical">Vertical Line</option>
                        <option value="dots">Dots Only</option>
                        <option value="cards">Card Grid</option>
                        <option value="horizontal">Horizontal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs py-1.5 mt-4">
                  Apply Template
                </Button>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            /* Timeline Settings */
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Timeline Settings</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingTimeline.title}
                    onChange={(e) => setEditingTimeline(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editingTimeline.description}
                    onChange={(e) => setEditingTimeline(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={editingTimeline.isPublic}
                    onChange={(e) => setEditingTimeline(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="h-3 w-3 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-xs text-gray-700">
                    Make timeline public
                  </label>
                </div>
              </div>
            </div>
          ) : (
            /* Milestone Editor */
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {selectedMilestone ? 'Edit Milestone' : 'Select milestone'}
              </h3>
              
              {selectedMilestone ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedMilestone.title}
                      onChange={(e) => setSelectedMilestone(prev => prev ? {...prev, title: e.target.value} : null)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedMilestone.date}
                      onChange={(e) => setSelectedMilestone(prev => prev ? {...prev, date: e.target.value} : null)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedMilestone.category || 'life'}
                      onChange={(e) => setSelectedMilestone(prev => prev ? {...prev, category: e.target.value} : null)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                      <option value="career">Career</option>
                      <option value="learning">Learning</option>
                      <option value="life">Life</option>
                      <option value="health">Health</option>
                      <option value="creative">Creative</option>
                      <option value="travel">Travel</option>
                      <option value="relationships">Relationships</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={selectedMilestone.description || ''}
                      onChange={(e) => setSelectedMilestone(prev => prev ? {...prev, description: e.target.value} : null)}
                      rows={3}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={selectedMilestone.imageUrl || ''}
                      onChange={(e) => setSelectedMilestone(prev => prev ? {...prev, imageUrl: e.target.value} : null)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={selectedMilestone.videoUrl || ''}
                      onChange={(e) => setSelectedMilestone(prev => prev ? {...prev, videoUrl: e.target.value} : null)}
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={handleUpdateMilestone}
                      className="bg-gray-900 hover:bg-gray-800 text-white flex-1 text-xs py-1.5"
                    >
                      Save
                    </Button>
                    <Button 
                      onClick={handleDeleteMilestone}
                      variant="outline" 
                      className="text-red-600 border-red-300 hover:bg-red-50 text-xs py-1.5"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-xs">Click milestone to edit</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Timeline Preview */}
      <div className="w-3/5 overflow-y-auto">
        <div className="p-4">
          {/* Timeline Info */}
          <div className="bg-white rounded border border-gray-200 p-4 mb-4">
            <h2 className="text-lg font-semibold mb-1">{timeline.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{timeline.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{timeline.milestones.length} milestones</span>
              <span>•</span>
              <span className={`inline-flex items-center gap-1 ${timeline.isPublic ? 'text-green-600' : 'text-gray-500'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {timeline.isPublic ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  )}
                </svg>
                {timeline.isPublic ? 'Public' : 'Private'}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {timeline.milestones
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .reduce((groups, milestone, index) => {
                const stage = getLifeStage(milestone.date);
                const existingGroup = groups.find(g => g.stage.name === stage.name);
                
                if (existingGroup) {
                  existingGroup.milestones.push({ ...milestone, originalIndex: index });
                } else {
                  groups.push({
                    stage,
                    milestones: [{ ...milestone, originalIndex: index }]
                  });
                }
                return groups;
              }, [] as Array<{ stage: { name: string; color: string }, milestones: Array<any> }>)
              .map((group) => (
                <div key={group.stage.name} className="relative">
                  {/* Life Stage Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 ${group.stage.color} rounded-full flex-shrink-0`} />
                    <h3 className="text-sm font-semibold text-gray-900">{group.stage.name}</h3>
                    <div className="h-px bg-gray-200 flex-1" />
                  </div>

                  {/* Milestones in this stage */}
                  <div className="space-y-3 pl-6">
                    {group.milestones.map((milestone, milestoneIndex) => (
                      <div key={milestone.id} className="flex items-start gap-3 group">
                        {/* Timeline dot and line */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-900 rounded-full" />
                          {milestoneIndex < group.milestones.length - 1 && (
                            <div className="w-px h-12 bg-gray-200 mt-1" />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0 pb-6">
                          <div 
                            className={`bg-white border rounded p-3 hover:shadow-sm transition-all cursor-pointer ${
                              selectedMilestone?.id === milestone.id ? 'border-gray-900 shadow-sm' : 'border-gray-200'
                            }`}
                            onClick={() => handleMilestoneSelect(milestone)}
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm font-medium">{milestone.title}</h4>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-gray-500">{formatDate(milestone.date)}</span>
                                  {milestone.category && (
                                    <span className={`px-1.5 py-0.5 text-xs rounded uppercase tracking-wider font-medium ${getCategoryColor(milestone.category)}`}>
                                      {milestone.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {milestone.description && (
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {milestone.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Milestone</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter milestone title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={newMilestone.date}
                  onChange={(e) => setNewMilestone(prev => ({...prev, date: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newMilestone.category}
                  onChange={(e) => setNewMilestone(prev => ({...prev, category: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="career">Career</option>
                  <option value="learning">Learning</option>
                  <option value="life">Life</option>
                  <option value="health">Health</option>
                  <option value="creative">Creative</option>
                  <option value="travel">Travel</option>
                  <option value="relationships">Relationships</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({...prev, description: e.target.value}))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Describe this milestone..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newMilestone.imageUrl}
                  onChange={(e) => setNewMilestone(prev => ({...prev, imageUrl: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={newMilestone.videoUrl}
                  onChange={(e) => setNewMilestone(prev => ({...prev, videoUrl: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowAddModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMilestone}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                disabled={!newMilestone.title || !newMilestone.date}
              >
                Add Milestone
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
