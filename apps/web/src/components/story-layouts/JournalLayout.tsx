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

interface JournalLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function JournalLayout({ lifeStory, onEditStory }: JournalLayoutProps) {
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

  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title, year: chapter.year }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-3/5 bg-[#fefdfb] overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6">
        {/* Journal Cover */}
        <div className="text-center mb-8 sticky top-0 bg-[#fefdfb]/95 backdrop-blur-sm pb-6">
          <div className="bg-gradient-to-br from-[#8b4513] to-[#654321] p-6 rounded-lg shadow-2xl border-4 border-[#8b4513] relative">
            <div className="absolute inset-2 border-2 border-[#d4af37]/30 rounded"></div>
            <h1 className="text-4xl font-bold text-[#f5e6d3] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
              📔 My Life Journal
            </h1>
            <p className="text-[#f5e6d3]/80 text-lg" style={{ fontFamily: "'Amatic SC', cursive" }}>
              Personal reflections & memories
            </p>
            {/* Journal binding holes */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-3">
              <div className="w-3 h-3 bg-[#654321] rounded-full"></div>
              <div className="w-3 h-3 bg-[#654321] rounded-full"></div>
              <div className="w-3 h-3 bg-[#654321] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Journal Pages */}
        <div className="space-y-8">
          {allStories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => onEditStory(story)}
              className="bg-white p-8 rounded-r-lg shadow-lg cursor-pointer group relative border-l-4 border-[#e0e0e0] hover:border-[#deac80] transition-all duration-300"
              style={{
                background: 'linear-gradient(to right, #fff 0%, #fff 95%, #f8f8f8 95%, #f8f8f8 100%)',
                backgroundImage: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 24px,
                    #e8f4f8 24px,
                    #e8f4f8 25px
                  )
                `
              }}
            >
              {/* Page binding holes */}
              <div className="absolute left-0 top-6 w-2 h-2 bg-[#e0e0e0] rounded-full"></div>
              <div className="absolute left-0 top-16 w-2 h-2 bg-[#e0e0e0] rounded-full"></div>
              <div className="absolute left-0 top-26 w-2 h-2 bg-[#e0e0e0] rounded-full"></div>

              {/* Journal Entry Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getMoodEmoji(story.mood)}</span>
                    <div className="bg-[#deac80]/20 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {story.year} - {story.chapterTitle}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.title}
                  </h3>
                  <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {new Date(story.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#6b5748]/60 mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Entry #{allStories.length - index}
                  </div>
                  <svg className="w-5 h-5 text-[#6b5748] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>

              {/* Journal Entry Content */}
              <div className="pl-4">
                <div className="mb-6">
                  <p className="text-[#4b3a2d] leading-relaxed text-xl" style={{ fontFamily: "'Amatic SC', cursive", lineHeight: '1.8' }}>
                    Dear Journal,
                  </p>
                  <p className="text-[#4b3a2d] leading-relaxed text-lg mt-2 indent-8" style={{ fontFamily: "'Amatic SC', cursive", lineHeight: '1.8' }}>
                    {story.content}
                  </p>
                </div>

                {/* Tags as margin notes */}
                <div className="border-t border-[#e0e0e0] pt-4 mt-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-[#6b5748]/70" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      Keywords:
                    </span>
                    {story.tags.map(tag => (
                      <span key={tag} className="text-sm text-[#6b5748] italic" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {tag},
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature */}
                <div className="text-right mt-4">
                  <p className="text-lg text-[#6b5748] italic" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    - Me 💭
                  </p>
                </div>
              </div>

              {/* Page corner fold effect */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-[#f0f0f0] transform rotate-45 origin-bottom-left"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
