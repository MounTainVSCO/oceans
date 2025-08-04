import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/Button';

// Mock data - in real app this would come from API based on timeline ID
const mockTimelineData = {
  id: '1',
  title: 'My Life Journey',
  description: 'A collection of my most important milestones and achievements',
  isPublic: false,
  milestones: [
    {
      id: 1,
      title: "Started my first job at TechCorp",
      date: "2024-01-15",
      description: "Joined as a Software Engineer. Excited to begin this new chapter in my career journey.",
      category: "career",
      emoji: "💼"
    },
    {
      id: 2,
      title: "Graduated from College",
      date: "2023-05-20",
      description: "Received my Bachelor's degree in Computer Science from State University. Four years of hard work paid off!",
      category: "learning",
      emoji: "🎓"
    },
    {
      id: 3,
      title: "Got my driver's license",
      date: "2022-08-14",
      description: "Finally passed my driving test on the third try. Freedom at last!",
      category: "life",
      emoji: "🚗"
    },
    {
      id: 4,
      title: "Started college",
      date: "2019-09-01",
      description: "First day at State University. New city, new friends, new adventures ahead.",
      category: "learning",
      emoji: "🏫"
    },
    {
      id: 5,
      title: "High school graduation",
      date: "2019-06-15",
      description: "Graduated from Springfield High School. Ready for the next chapter!",
      category: "learning",
      emoji: "🎓"
    },
    {
      id: 6,
      title: "Got my first job",
      date: "2018-06-20",
      description: "Started working part-time at the local coffee shop. First taste of earning my own money.",
      category: "career",
      emoji: "☕"
    },
    {
      id: 7,
      title: "Turned 18",
      date: "2018-03-15",
      description: "Officially an adult! Can vote, sign contracts, and make my own decisions.",
      category: "life",
      emoji: "🗳️"
    },
    {
      id: 8,
      title: "Started high school",
      date: "2015-09-08",
      description: "First day at Springfield High School. Nervous but excited for high school life.",
      category: "learning",
      emoji: "🏫"
    },
    {
      id: 9,
      title: "Learned to ride a bike",
      date: "2008-07-04",
      description: "Dad finally took off the training wheels and I rode my first solo bike ride around the block!",
      category: "life",
      emoji: "🚲"
    },
    {
      id: 10,
      title: "Started elementary school",
      date: "2006-09-05",
      description: "My first day of school at Maple Elementary. Met my best friend Sarah in kindergarten.",
      category: "learning",
      emoji: "🏫"
    },
    {
      id: 11,
      title: "Born",
      date: "2000-03-15",
      description: "I entered the world today in Springfield General Hospital. My life's journey begins!",
      category: "life",
      emoji: "🐣"
    }
  ]
};

export function TimelineEditor() {
  const { id } = useParams<{ id: string }>();
  const [timeline, setTimeline] = useState(mockTimelineData);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'editing' | 'settings' | 'templates'>('editing');
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [editingTimeline, setEditingTimeline] = useState({
    title: timeline.title,
    description: timeline.description,
    isPublic: timeline.isPublic
  });

  const handleSaveTimeline = () => {
    // TODO: Save timeline to backend
    setTimeline(prev => ({
      ...prev,
      ...editingTimeline
    }));
  };

  const handleMilestoneSelect = (milestone: any) => {
    setSelectedMilestone(milestone);
    setActiveTab('editing');
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

  return (
    <div className="h-screen bg-gray-50 flex">

      {/* Left Panel - Editor */}
      <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {/* Save Button */}
          <Button 
            onClick={handleSaveTimeline}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white mb-4 text-sm py-2"
          >
            Save Changes
          </Button>

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
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedMilestone.category}
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
                      value={selectedMilestone.description}
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
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white flex-1 text-xs py-1.5">
                      Save
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs py-1.5">
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
                                  <span className="text-sm">{milestone.emoji}</span>
                                  <h4 className="text-sm font-medium">{milestone.title}</h4>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-gray-500">{formatDate(milestone.date)}</span>
                                  <span className={`px-1.5 py-0.5 text-xs rounded uppercase tracking-wider font-medium ${getCategoryColor(milestone.category)}`}>
                                    {milestone.category}
                                  </span>
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
    </div>
  );
}
