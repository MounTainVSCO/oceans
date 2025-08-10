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

interface MapLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function MapLayout({ lifeStory, onEditStory }: MapLayoutProps) {
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

  const getLocationImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=200&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop&crop=center',
    ];
    return images[index % images.length];
  };

  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title, year: chapter.year }))
  );

  // Generate random positions for map pins
  const getRandomPosition = (index: number) => ({
    top: `${15 + (index * 17) % 70}%`,
    left: `${10 + (index * 23) % 80}%`
  });

  return (
    <div className="w-3/5 bg-gradient-to-br from-[#f0f8e7] to-[#e8f5e8] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6 sticky top-0 bg-gradient-to-br from-[#f0f8e7]/95 to-[#e8f5e8]/95 backdrop-blur-sm pb-4 z-10">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
            🗺️ Journey Map
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Where life has taken you
          </p>
        </div>

        {/* Map Container */}
        <div className="relative bg-gradient-to-br from-[#c8e6c9] to-[#a5d6a7] rounded-2xl p-6 mb-6 min-h-96"
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 70%, rgba(139, 195, 74, 0.1) 0%, transparent 50%),
                 linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)
               `
             }}>
          
          {/* Map Grid Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({length: 48}).map((_, i) => (
                <div key={i} className="border border-[#4b3a2d]/10"></div>
              ))}
            </div>
          </div>

          {/* Story Pin Points */}
          {allStories.map((story, index) => {
            const position = getRandomPosition(index);
            
            return (
              <div
                key={story.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group z-10"
                style={position}
                onClick={() => onEditStory(story)}
              >
                {/* Map Pin */}
                <div className="relative">
                  <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center transform group-hover:scale-125 transition-transform duration-200">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="w-2 h-3 bg-red-500 mx-auto transform rotate-45 -mt-1"></div>
                  
                  {/* Tooltip Card */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-white rounded-lg shadow-xl p-3 w-64 border border-[#deac80]/20">
                      {/* Image */}
                      <img 
                        src={getLocationImage(index)}
                        alt="Location"
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{getMoodEmoji(story.mood)}</span>
                        <span className="text-xs bg-[#deac80]/20 px-2 py-1 rounded-full text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                          {story.year}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-[#4b3a2d] text-sm mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#6b5748] mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {story.date}
                      </p>
                      <p className="text-xs text-[#4b3a2d] leading-snug" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {story.content.length > 80 ? `${story.content.substring(0, 80)}...` : story.content}
                      </p>
                      
                      {/* Arrow pointing down */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-3 h-3 bg-white border-r border-b border-[#deac80]/20 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Compass */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 rounded-full shadow-lg flex items-center justify-center border-2 border-[#deac80]">
            <div className="text-center">
              <div className="text-xs font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>N</div>
              <div className="text-xl">🧭</div>
            </div>
          </div>
        </div>

        {/* Story List Below Map */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#4b3a2d] mb-4" style={{ fontFamily: "'Amatic SC', cursive" }}>
            📍 Journey Timeline
          </h3>
          
          {allStories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => onEditStory(story)}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex items-center space-x-4"
            >
              <div className="flex-shrink-0">
                <img 
                  src={getLocationImage(index)}
                  alt="Location"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <span className="text-lg">{getMoodEmoji(story.mood)}</span>
                  <span className="text-xs bg-[#deac80]/20 px-2 py-1 rounded-full text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    {story.year} - {story.chapterTitle}
                  </span>
                </div>
                
                <h4 className="font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {story.title}
                </h4>
                <p className="text-sm text-[#6b5748] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {story.date}
                </p>
                <p className="text-sm text-[#4b3a2d] leading-snug" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {story.content}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-[#6b5748] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
