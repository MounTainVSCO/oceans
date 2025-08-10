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

interface TimelineLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function TimelineLayout({ lifeStory, onEditStory }: TimelineLayoutProps) {
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

  return (
    <div className="w-3/5 bg-white overflow-y-auto">
      <div className="max-w-none mx-auto">
        {/* Book Header */}
        <div className="text-center mb-6 sticky top-0 bg-white/95 backdrop-blur-sm pb-4 border-b border-[#deac80]/20">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
            {lifeStory.title}
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            {lifeStory.subtitle}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#deac80] to-[#b5c18e] mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="p-4">
          {/* Chapters */}
          <div className="space-y-6">
            {lifeStory.chapters.map((chapter) => (
              <div key={chapter.id} className="relative">
                {/* Chapter Header */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#deac80] to-[#b5c18e] rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                    <span className="text-sm font-bold text-white" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {chapter.year}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {chapter.title}
                    </h2>
                  </div>
                </div>

                {/* Stories */}
                <div className="ml-5 space-y-3">
                  {chapter.stories.map((story, index) => (
                    <div 
                      key={story.id} 
                      className="relative bg-[#faf6f1] p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border-l-2 border-[#deac80]"
                      onClick={() => onEditStory(story)}
                    >
                      {/* Connection line to next story */}
                      {index < chapter.stories.length - 1 && (
                        <div className="absolute left-[-1px] bottom-[-6px] w-0.5 h-3 bg-[#deac80]"></div>
                      )}
                      
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getMoodEmoji(story.mood)}</span>
                          <div>
                            <h3 className="text-lg font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              {story.title}
                            </h3>
                            <span className="text-sm text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              {story.date}
                            </span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-[#6b5748] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      
                      <p className="text-[#4b3a2d] leading-snug mb-3 text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {story.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {story.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-[#deac80]/20 text-[#6b5748] rounded-full text-xs" style={{ fontFamily: "'Amatic SC', cursive" }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chapter continuation line */}
                {chapter.id < lifeStory.chapters.length && (
                  <div className="ml-5 mt-4 flex justify-center">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-[#deac80] to-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
