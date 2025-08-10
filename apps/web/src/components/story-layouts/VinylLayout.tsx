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

interface VinylLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function VinylLayout({ lifeStory, onEditStory }: VinylLayoutProps) {
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

  const getGenreColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      happy: 'from-yellow-400 to-orange-400',
      excited: 'from-pink-400 to-purple-400',
      proud: 'from-blue-400 to-indigo-400',
      grateful: 'from-green-400 to-teal-400',
      reflective: 'from-gray-400 to-slate-400',
      sad: 'from-blue-300 to-gray-400'
    };
    return colors[mood] || 'from-yellow-400 to-orange-400';
  };

  const getVinylImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop&crop=center',
    ];
    return images[index % images.length];
  };

  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title, year: chapter.year }))
  );

  return (
    <div className="w-3/5 bg-gradient-to-br from-[#2a1810] to-[#1a1a1a] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6 sticky top-0 bg-gradient-to-br from-[#2a1810]/95 to-[#1a1a1a]/95 backdrop-blur-sm pb-4 z-10">
          <h1 className="text-4xl font-bold text-[#f5e6d3] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
            🎵 Life Records
          </h1>
          <p className="text-lg text-[#d4af37]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Your personal soundtrack collection
          </p>
        </div>

        {/* Vinyl Grid */}
        <div className="grid grid-cols-2 gap-6">
          {allStories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => onEditStory(story)}
              className="group cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              {/* Vinyl Record */}
              <div className="relative">
                {/* Outer Ring */}
                <div className="w-64 h-64 rounded-full bg-black shadow-2xl mx-auto relative overflow-hidden">
                  {/* Vinyl Texture */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full rounded-full" 
                         style={{
                           background: `
                             radial-gradient(circle at center, transparent 15%, rgba(255,255,255,0.1) 15.5%, rgba(255,255,255,0.1) 16%, transparent 16.5%),
                             radial-gradient(circle at center, transparent 25%, rgba(255,255,255,0.05) 25.5%, rgba(255,255,255,0.05) 26%, transparent 26.5%),
                             radial-gradient(circle at center, transparent 35%, rgba(255,255,255,0.05) 35.5%, rgba(255,255,255,0.05) 36%, transparent 36.5%),
                             radial-gradient(circle at center, transparent 45%, rgba(255,255,255,0.05) 45.5%, rgba(255,255,255,0.05) 46%, transparent 46.5%)
                           `
                         }}>
                    </div>
                  </div>

                  {/* Album Cover */}
                  <div className="absolute inset-8 rounded-full overflow-hidden shadow-inner">
                    <img 
                      src={getVinylImage(index)}
                      alt="Album Cover"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGenreColor(story.mood)} opacity-40`}></div>
                    
                    {/* Mood Emoji in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/80 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                        {getMoodEmoji(story.mood)}
                      </div>
                    </div>
                  </div>

                  {/* Center Hole */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-2 border-[#d4af37] shadow-inner"></div>
                  
                  {/* Spinning Animation on Hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>

                {/* Record Label/Info */}
                <div className="bg-[#f5e6d3] p-4 mt-4 rounded-lg shadow-lg transform group-hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#4b3a2d] text-lg" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.title}
                    </h4>
                    <span className="text-xs bg-[#d4af37] text-black px-2 py-1 rounded-full font-bold">
                      {story.year}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#6b5748] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.date} • {story.chapterTitle}
                  </p>
                  
                  <p className="text-sm text-[#4b3a2d] leading-snug mb-3" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.content.length > 100 ? `${story.content.substring(0, 100)}...` : story.content}
                  </p>
                  
                  {/* Tags as Genre Labels */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {story.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-black text-[#d4af37] px-2 py-1 rounded-full"
                        style={{ fontFamily: "'Amatic SC', cursive" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Play Button */}
                  <div className="flex items-center justify-center">
                    <div className="bg-[#d4af37] hover:bg-[#b8941f] transition-colors w-10 h-10 rounded-full flex items-center justify-center text-black">
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Record Collection Footer */}
        <div className="mt-8 text-center">
          <div className="bg-[#f5e6d3]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20">
            <h3 className="text-2xl font-bold text-[#f5e6d3] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
              🎼 Collection Stats
            </h3>
            <div className="flex justify-center space-x-8 text-[#d4af37]">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {allStories.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Records
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {lifeStory.chapters.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Albums
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {new Set(allStories.flatMap(story => story.tags)).size}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Genres
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
