import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/Button';
import { publishingAPI } from '@/lib/api/publishing';
import { 
  CalendarLayout, 
  ScrapbookLayout, 
  JournalLayout, 
  PolaroidLayout, 
  TimelineLayout,
  PostcardLayout,
  MapLayout,
  VinylLayout,
  BookshelfLayout,
  ArtGalleryLayout,
  LAYOUT_TYPES, 
  type LayoutType 
} from '../components/story-layouts';

// Sample life story data
const sampleLifeStory = {
  title: "My Journey",
  subtitle: "The story of who I am",
  chapters: [
    {
      id: 1,
      year: "2020",
      title: "New Beginnings",
      stories: [
        {
          id: 1,
          date: "March 2020",
          title: "Started Learning to Code",
          content: "Decided to take the leap and learn programming. It was scary at first, but I knew it was the right path for me.",
          mood: "excited",
          tags: ["career", "learning", "growth"]
        },
        {
          id: 2,
          date: "August 2020",
          title: "First Project",
          content: "Built my first website! It wasn't perfect, but seeing something I created come to life was magical.",
          mood: "proud",
          tags: ["achievement", "coding", "milestone"]
        }
      ]
    },
    {
      id: 2,
      year: "2021",
      title: "Growing Forward",
      stories: [
        {
          id: 3,
          date: "January 2021",
          title: "Joined Study Group",
          content: "Found an amazing community of learners. Having people to share the journey with made all the difference.",
          mood: "grateful",
          tags: ["community", "friendship", "learning"]
        },
        {
          id: 4,
          date: "September 2021",
          title: "First Job Offer",
          content: "After months of preparation and interviews, I finally got my first tech job! Dreams do come true.",
          mood: "excited",
          tags: ["career", "achievement", "dreams"]
        }
      ]
    }
  ]
};

interface Story {
  id: number;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
}

interface Chapter {
  id: number;
  year: string;
  title: string;
  stories: Story[];
}

export function Main() {
  const [lifeStory] = useState(sampleLifeStory);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [publishForm, setPublishForm] = useState({
    subdomain: '',
    title: '',
    description: ''
  });
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState<'available' | 'taken' | 'checking' | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(LAYOUT_TYPES.TIMELINE);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    date: '',
    mood: 'happy',
    tags: [] as string[]
  });

  const handleEditStory = (story: Story) => {
    setSelectedStory(story);
    setEditForm({
      title: story.title,
      content: story.content,
      date: story.date,
      mood: story.mood,
      tags: [...story.tags]
    });
    setIsEditing(true);
  };

  const handleSaveStory = () => {
    // In a real app, this would save to backend
    console.log('Saving story:', editForm);
    setIsEditing(false);
    setSelectedStory(null);
  };

  const getMoodEmoji = (mood: string) => {
    const moods: { [key: string]: string } = {
      happy: '😊',
      excited: '🎉',
      proud: '💪',
      grateful: '🙏',
      reflective: '🤔',
      sad: '😢'
    };
    return moods[mood] || '😊';
  };

  // Check if subdomain is available
  const checkSubdomain = async (subdomain: string) => {
    if (!subdomain || subdomain.length < 3) {
      setSubdomainStatus(null);
      return;
    }

    setIsCheckingSubdomain(true);
    setSubdomainStatus('checking');

    try {
      const result = await publishingAPI.checkSubdomainAvailability(subdomain);
      setSubdomainStatus(result.available ? 'available' : 'taken');
    } catch (error) {
      console.error('Error checking subdomain:', error);
      setSubdomainStatus(null);
    } finally {
      setIsCheckingSubdomain(false);
    }
  };

  // Handle subdomain input change
  const handleSubdomainChange = (value: string) => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setPublishForm(prev => ({ ...prev, subdomain: cleanValue }));
    
    // Debounce subdomain checking
    if (cleanValue.length >= 3) {
      setTimeout(() => checkSubdomain(cleanValue), 500);
    } else {
      setSubdomainStatus(null);
    }
  };

  // Handle publishing
  const handlePublish = async () => {
    if (subdomainStatus !== 'available' || !publishForm.subdomain) {
      return;
    }

    setIsPublishing(true);

    try {
      // Create site using the API
      const site = await publishingAPI.createSite({
        subdomain: publishForm.subdomain,
        title: publishForm.title,
        description: publishForm.description,
        layout: currentLayout,
        // TODO: Add actual timeline ID when we have user data
        // timelineId: currentTimelineId
      });
      
      // Show success message with actual URL
      alert(`✅ Published successfully!\n\nYour life story is now being built and will be live at:\n${site.url}\n\nBuild Status: ${site.buildStatus}`);
      setShowPublishDialog(false);
      
      // Optionally redirect to a sites management page
      // or show build progress
      
    } catch (error: any) {
      console.error('Publishing failed:', error);
      alert(`❌ Publishing failed: ${error.message}\n\nPlease try again.`);
    } finally {
      setIsPublishing(false);
    }
  };

  // Initialize publish form when dialog opens
  const handleOpenPublish = () => {
    setPublishForm({
      subdomain: '',
      title: lifeStory.title,
      description: lifeStory.subtitle
    });
    setSubdomainStatus(null);
    setShowPublishDialog(true);
  };

  const renderLayout = () => {
    const commonProps = {
      lifeStory,
      onEditStory: handleEditStory
    };

    switch (currentLayout) {
      case LAYOUT_TYPES.CALENDAR:
        return <CalendarLayout {...commonProps} />;
      case LAYOUT_TYPES.SCRAPBOOK:
        return <ScrapbookLayout {...commonProps} />;
      case LAYOUT_TYPES.JOURNAL:
        return <JournalLayout {...commonProps} />;
      case LAYOUT_TYPES.POLAROID:
        return <PolaroidLayout {...commonProps} />;
      case LAYOUT_TYPES.POSTCARD:
        return <PostcardLayout {...commonProps} />;
      case LAYOUT_TYPES.MAP:
        return <MapLayout {...commonProps} />;
      case LAYOUT_TYPES.VINYL:
        return <VinylLayout {...commonProps} />;
      case LAYOUT_TYPES.BOOKSHELF:
        return <BookshelfLayout {...commonProps} />;
      case LAYOUT_TYPES.ART_GALLERY:
        return <ArtGalleryLayout {...commonProps} />;
      default:
        return <TimelineLayout {...commonProps} />;
    }
  };

  const layoutOptions = [
    { type: LAYOUT_TYPES.TIMELINE, name: 'Timeline', icon: '📝' },
    { type: LAYOUT_TYPES.CALENDAR, name: 'Calendar', icon: '📅' },
    { type: LAYOUT_TYPES.SCRAPBOOK, name: 'Scrapbook', icon: '📖' },
    { type: LAYOUT_TYPES.JOURNAL, name: 'Journal', icon: '📔' },
    { type: LAYOUT_TYPES.POLAROID, name: 'Photos', icon: '📷' },
    { type: LAYOUT_TYPES.POSTCARD, name: 'Postcards', icon: '📮' },
    { type: LAYOUT_TYPES.MAP, name: 'Journey Map', icon: '🗺️' },
    { type: LAYOUT_TYPES.VINYL, name: 'Records', icon: '🎵' },
    { type: LAYOUT_TYPES.BOOKSHELF, name: 'Library', icon: '📚' },
    { type: LAYOUT_TYPES.ART_GALLERY, name: 'Gallery', icon: '🎨' }
  ];

  return (
    <DashboardLayout>
      <div className="h-screen flex">
        {/* Left Side - Editing Panel */}
        <div className="w-2/5 bg-[#f5e6d3] p-6 flex flex-col">
          <div className="max-w-sm mx-auto">
            <h2 className="text-4xl font-bold text-[#4b3a2d] mb-6" style={{ fontFamily: "'Amatic SC', cursive" }}>
              {isEditing ? 'Edit Story' : 'Story Editor'}
            </h2>

            {/* Layout Switcher */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                View Style
              </label>
              <div className="flex flex-wrap gap-2">
                {layoutOptions.map(option => (
                  <button
                    key={option.type}
                    onClick={() => setCurrentLayout(option.type)}
                    className={`px-3 py-2 rounded-xl text-sm transition-all ${
                      currentLayout === option.type
                        ? 'bg-[#4b3a2d] text-white'
                        : 'bg-white/80 text-[#4b3a2d] hover:bg-[#deac80]/20'
                    }`}
                    style={{ fontFamily: "'Amatic SC', cursive" }}
                  >
                    {option.icon} {option.name}
                  </button>
                ))}
              </div>
            </div>

            {isEditing ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({...prev, title: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-[#deac80] rounded-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d]"
                      style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      Date
                    </label>
                    <input
                      type="text"
                      value={editForm.date}
                      onChange={(e) => setEditForm(prev => ({...prev, date: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-[#deac80] rounded-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d]"
                      style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      Your Story
                    </label>
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm(prev => ({...prev, content: e.target.value}))}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-[#deac80] rounded-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d] resize-none"
                      placeholder="Tell your story..."
                      style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      How did it feel?
                    </label>
                    <select
                      value={editForm.mood}
                      onChange={(e) => setEditForm(prev => ({...prev, mood: e.target.value}))}
                      className="w-full px-4 py-3 border-2 border-[#deac80] rounded-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d]"
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

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex-1 border-2 border-[#6b5748] text-[#6b5748] hover:bg-[#6b5748] hover:text-white"
                      style={{ fontFamily: "'Amatic SC', cursive" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveStory}
                      className="flex-1 bg-[#4b3a2d] hover:bg-[#3a2922] text-white"
                      style={{ fontFamily: "'Amatic SC', cursive" }}
                    >
                      Save Story
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <p className="text-xl text-[#6b5748] mb-6" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Click on any story from your life book to edit it, or add new moments to your journey.
                </p>
                
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-[#4b3a2d] hover:bg-[#3a2922] text-white text-lg py-4 mb-4"
                  style={{ fontFamily: "'Amatic SC', cursive" }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Story
                </Button>

                <Button
                  onClick={handleOpenPublish}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#9a7b1a] text-white text-lg py-4"
                  style={{ fontFamily: "'Amatic SC', cursive" }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Publish Your Story
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Story Layouts */}
        {renderLayout()}
      </div>

      {/* Publish Dialog */}
      {showPublishDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5e6d3] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#deac80]/30">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                🌐 Publish Your Story
              </h3>
              <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Share your life journey with the world
              </p>
            </div>

            <div className="space-y-4">
              {/* Subdomain Input */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Choose Your Subdomain
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={publishForm.subdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    placeholder="yourname"
                    className="flex-1 px-4 py-3 border-2 border-[#deac80] rounded-l-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d]"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                    maxLength={20}
                  />
                  <div className="px-4 py-3 bg-[#6b5748] text-white rounded-r-xl text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    .oceans.life
                  </div>
                </div>
                
                {/* Subdomain Status */}
                <div className="mt-2 text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {isCheckingSubdomain && (
                    <div className="flex items-center text-[#6b5748]">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#6b5748] border-t-transparent mr-2"></div>
                      Checking availability...
                    </div>
                  )}
                  {subdomainStatus === 'available' && (
                    <div className="flex items-center text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Great! {publishForm.subdomain}.oceans.life is available
                    </div>
                  )}
                  {subdomainStatus === 'taken' && (
                    <div className="flex items-center text-red-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Sorry, {publishForm.subdomain}.oceans.life is already taken
                    </div>
                  )}
                </div>
              </div>

              {/* Site Title */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Site Title
                </label>
                <input
                  type="text"
                  value={publishForm.title}
                  onChange={(e) => setPublishForm(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-[#deac80] rounded-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d]"
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                />
              </div>

              {/* Site Description */}
              <div>
                <label className="block text-lg font-semibold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Site Description
                </label>
                <input
                  type="text"
                  value={publishForm.description}
                  onChange={(e) => setPublishForm(prev => ({...prev, description: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-[#deac80] rounded-xl focus:outline-none focus:border-[#4b3a2d] bg-white text-[#4b3a2d]"
                  style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.125rem' }}
                />
              </div>

              {/* Current Layout Preview */}
              <div className="bg-white/50 rounded-xl p-4 border border-[#deac80]/20">
                <p className="text-sm text-[#6b5748] mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Publishing with layout:
                </p>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {layoutOptions.find(option => option.type === currentLayout)?.icon}
                  </span>
                  <span className="text-lg font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {layoutOptions.find(option => option.type === currentLayout)?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button
                onClick={() => setShowPublishDialog(false)}
                variant="outline"
                className="flex-1 border-2 border-[#6b5748] text-[#6b5748] hover:bg-[#6b5748] hover:text-white"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePublish}
                disabled={subdomainStatus !== 'available' || isPublishing}
                className={`flex-1 text-white ${
                  subdomainStatus === 'available' && !isPublishing
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#9a7b1a]'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                {isPublishing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Publishing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Publish Now
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
