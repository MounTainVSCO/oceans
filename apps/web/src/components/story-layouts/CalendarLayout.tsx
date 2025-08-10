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

interface LifeStory {
  title: string;
  subtitle: string;
  chapters: Chapter[];
}

interface CalendarLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function CalendarLayout({ lifeStory, onEditStory }: CalendarLayoutProps) {
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

  // Group stories by month for calendar view
  const storiesByMonth: { [key: string]: Story[] } = {};
  lifeStory.chapters.forEach(chapter => {
    chapter.stories.forEach(story => {
      const date = new Date(story.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!storiesByMonth[monthKey]) {
        storiesByMonth[monthKey] = [];
      }
      storiesByMonth[monthKey].push(story);
    });
  });

  const months = Object.keys(storiesByMonth).sort().reverse(); // Most recent first

  return (
    <div className="w-3/5 bg-white overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6 sticky top-0 bg-white/95 backdrop-blur-sm pb-4 border-b border-[#deac80]/20">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
            📅 Life Calendar
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Your memories organized by time
          </p>
        </div>

        {/* Calendar Months */}
        <div className="space-y-6">
          {months.map((monthKey) => {
            const [year, month] = monthKey.split('-');
            const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' });
            
            return (
              <div key={monthKey} className="bg-[#faf6f1] rounded-2xl p-4 shadow-sm">
                {/* Month Header */}
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-[#deac80] to-[#b5c18e] text-white px-4 py-2 rounded-full">
                    <span className="font-bold text-lg" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {monthName} {year}
                    </span>
                  </div>
                  <div className="ml-3 text-[#6b5748] text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {storiesByMonth[monthKey].length} memories
                  </div>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {storiesByMonth[monthKey].map((story) => {
                    const storyDate = new Date(story.date);
                    const day = storyDate.getDate();
                    
                    return (
                      <div
                        key={story.id}
                        onClick={() => onEditStory(story)}
                        className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-[#deac80]/20"
                      >
                        {/* Date Badge */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="bg-[#deac80] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                            {day}
                          </div>
                          <span className="text-xl">{getMoodEmoji(story.mood)}</span>
                        </div>

                        {/* Story Info */}
                        <h3 className="text-lg font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                          {story.title}
                        </h3>
                        
                        <p className="text-[#4b3a2d] text-sm leading-snug mb-2 line-clamp-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                          {story.content}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {story.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-[#deac80]/20 text-[#6b5748] rounded-full text-xs" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              #{tag}
                            </span>
                          ))}
                          {story.tags.length > 2 && (
                            <span className="text-xs text-[#6b5748]">+{story.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
