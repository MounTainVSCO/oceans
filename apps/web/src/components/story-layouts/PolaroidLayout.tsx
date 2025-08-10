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

interface PolaroidLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function PolaroidLayout({ lifeStory, onEditStory }: PolaroidLayoutProps) {
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
  );

  const getRandomColor = (index: number) => {
    const colors = [
      'from-pink-100 to-pink-50',
      'from-blue-100 to-blue-50', 
      'from-yellow-100 to-yellow-50',
      'from-green-100 to-green-50',
      'from-purple-100 to-purple-50',
      'from-orange-100 to-orange-50'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-3/5 bg-gradient-to-br from-[#f0e6d2] to-[#e8dcc0] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-8 sticky top-0 bg-gradient-to-br from-[#f0e6d2]/95 to-[#e8dcc0]/95 backdrop-blur-sm pb-4">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-2 transform -rotate-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
            📷 Memory Wall
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Snapshots of life's beautiful moments
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {allStories.map((story, index) => {
            const rotation = [
              'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-3', '-rotate-3'
            ][index % 6];
            
            return (
              <div
                key={story.id}
                onClick={() => onEditStory(story)}
                className={`bg-white p-4 pb-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group transform ${rotation} hover:rotate-0 hover:scale-105 break-inside-avoid mb-4 border border-gray-200`}
                style={{
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {/* Polaroid Photo Area */}
                <div className={`bg-gradient-to-br ${getRandomColor(index)} h-48 rounded-sm mb-4 flex items-center justify-center relative overflow-hidden`}>
                  {/* Photo placeholder with mood */}
                  <div className="text-center">
                    <div className="text-6xl mb-2">{getMoodEmoji(story.mood)}</div>
                    <div className="text-sm text-[#6b5748] font-semibold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.year}
                    </div>
                  </div>
                  
                  {/* Photo corner tape */}
                  <div className="absolute top-2 left-2 w-8 h-4 bg-yellow-200/70 rounded-sm shadow transform -rotate-12"></div>
                  <div className="absolute top-2 right-2 w-6 h-4 bg-yellow-200/70 rounded-sm shadow transform rotate-12"></div>
                </div>

                {/* Polaroid Caption Area */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.title}
                  </h3>
                  <p className="text-sm text-[#6b5748] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.date}
                  </p>
                  <p className="text-[#4b3a2d] text-sm leading-snug mb-3" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.content.length > 100 ? `${story.content.substring(0, 100)}...` : story.content}
                  </p>
                  
                  {/* Tags as hashtags */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {story.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-[#6b5748]/70" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Handwritten note effect */}
                <div className="absolute bottom-1 right-2 transform rotate-12">
                  <svg className="w-4 h-4 text-[#6b5748] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>

                {/* Push pin effect */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full shadow-lg border-2 border-red-500"></div>
              </div>
            );
          })}
        </div>

        {/* Cork board texture hint */}
        <div className="fixed inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJjb3JrIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjOGI0NTEzIi8+CiAgICAgIDxjaXJjbGUgY3g9IjMwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0iIzY1NDMyMSIvPgogICAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUiIHI9IjAuNSIgZmlsbD0iIzhhNTkzMiIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NvcmspIi8+Cjwvc3ZnPg==')]"></div>
      </div>
    </div>
  );
}
