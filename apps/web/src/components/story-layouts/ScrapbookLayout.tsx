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

interface ScrapbookLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function ScrapbookLayout({ lifeStory, onEditStory }: ScrapbookLayoutProps) {
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

  // Flatten all stories and mix them up for scrapbook feel
  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title }))
  );

  return (
    <div className="w-3/5 bg-[#f7f3ef] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6 sticky top-0 bg-[#f7f3ef]/95 backdrop-blur-sm pb-4">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-1 transform -rotate-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
            📖 Memory Scrapbook
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Scattered memories, beautifully preserved
          </p>
        </div>

        {/* Scrapbook Style Layout */}
        <div className="space-y-4">
          {allStories.map((story, index) => {
            // Alternate story sizes and rotations for scrapbook effect
            const isLarge = index % 3 === 0;
            const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
            const bgColor = index % 4 === 0 ? 'bg-[#fff8e7]' : 
                           index % 4 === 1 ? 'bg-[#f0f9ff]' : 
                           index % 4 === 2 ? 'bg-[#fef7f0]' : 'bg-white';
            
            return (
              <div
                key={story.id}
                onClick={() => onEditStory(story)}
                className={`${bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform ${rotation} hover:rotate-0 hover:scale-105 border-4 border-white ${isLarge ? 'col-span-2' : ''}`}
                style={{
                  background: `${bgColor}`,
                  boxShadow: '0 8px 25px rgba(75, 58, 45, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                }}
              >
                {/* Tape Effect */}
                <div className="absolute -top-3 left-6 w-12 h-6 bg-yellow-200/70 rounded-sm shadow-sm transform -rotate-12"></div>
                <div className="absolute -top-2 right-8 w-10 h-5 bg-yellow-200/70 rounded-sm shadow-sm transform rotate-12"></div>

                {/* Story Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getMoodEmoji(story.mood)}</span>
                      <span className="text-sm bg-[#deac80]/30 px-2 py-1 rounded-full text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {story.chapterTitle}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.title}
                    </h3>
                    <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <svg className="w-5 h-5 text-[#6b5748] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>

                {/* Story Content */}
                <div className="relative">
                  <p className="text-[#4b3a2d] leading-relaxed mb-4 text-lg" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.content}
                  </p>

                  {/* Handwritten style underline */}
                  <div className="h-0.5 bg-gradient-to-r from-[#deac80] via-transparent to-[#b5c18e] mb-4 transform -rotate-1"></div>

                  {/* Tags as handwritten notes */}
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag, tagIndex) => (
                      <span 
                        key={tag} 
                        className={`px-3 py-1 bg-yellow-100/70 text-[#6b5748] rounded-full text-sm border border-yellow-200 transform ${tagIndex % 2 === 0 ? 'rotate-1' : '-rotate-1'}`} 
                        style={{ fontFamily: "'Amatic SC', cursive" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#deac80]/30 rounded-br-lg"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
