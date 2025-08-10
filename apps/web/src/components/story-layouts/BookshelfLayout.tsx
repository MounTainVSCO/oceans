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

interface BookshelfLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function BookshelfLayout({ lifeStory, onEditStory }: BookshelfLayoutProps) {
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

  const getBookColor = (index: number) => {
    const colors = [
      'from-red-600 to-red-800',
      'from-blue-600 to-blue-800', 
      'from-green-600 to-green-800',
      'from-purple-600 to-purple-800',
      'from-orange-600 to-orange-800',
      'from-teal-600 to-teal-800',
      'from-pink-600 to-pink-800',
      'from-indigo-600 to-indigo-800'
    ];
    return colors[index % colors.length];
  };

  const getBookHeight = (index: number) => {
    const heights = ['h-48', 'h-52', 'h-44', 'h-56', 'h-50', 'h-46'];
    return heights[index % heights.length];
  };

  const getBookImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=200&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop&crop=center',
    ];
    return images[index % images.length];
  };

  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title, year: chapter.year }))
  );

  // Group stories into "shelves" of 6-8 books each
  const shelves = [];
  for (let i = 0; i < allStories.length; i += 7) {
    shelves.push(allStories.slice(i, i + 7));
  }

  return (
    <div className="w-3/5 bg-gradient-to-br from-[#8b4513] to-[#654321] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6 sticky top-0 bg-gradient-to-br from-[#8b4513]/95 to-[#654321]/95 backdrop-blur-sm pb-4 z-10">
          <h1 className="text-4xl font-bold text-[#f5e6d3] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
            📚 Memory Library
          </h1>
          <p className="text-lg text-[#d4af37]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Your personal collection of life stories
          </p>
        </div>

        {/* Bookshelves */}
        <div className="space-y-8">
          {shelves.map((shelf, shelfIndex) => (
            <div key={shelfIndex} className="relative">
              {/* Shelf Wood Background */}
              <div 
                className="bg-gradient-to-b from-[#8b4513] to-[#654321] rounded-lg shadow-2xl p-4 border-2 border-[#5d4037]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 1px,
                      rgba(0,0,0,0.1) 1px,
                      rgba(0,0,0,0.1) 2px
                    )
                  `
                }}
              >
                {/* Shelf Label */}
                <div className="absolute -top-6 left-4 bg-[#f5e6d3] px-3 py-1 rounded-t-lg shadow-md">
                  <span className="text-sm font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Shelf {shelfIndex + 1}
                  </span>
                </div>

                {/* Books Row */}
                <div className="flex items-end justify-start space-x-1 min-h-[14rem]">
                  {shelf.map((story, bookIndex) => {
                    const globalIndex = shelfIndex * 7 + bookIndex;
                    
                    return (
                      <div
                        key={story.id}
                        onClick={() => onEditStory(story)}
                        className={`${getBookHeight(globalIndex)} w-12 cursor-pointer group transform hover:-translate-y-2 transition-all duration-300 hover:z-10`}
                        style={{ 
                          transform: bookIndex % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                          zIndex: bookIndex
                        }}
                      >
                        {/* Book Spine */}
                        <div className={`h-full bg-gradient-to-r ${getBookColor(globalIndex)} rounded-sm shadow-lg border-l-2 border-black/20 relative overflow-hidden`}>
                          {/* Book Cover Image */}
                          <div className="absolute inset-0 opacity-30">
                            <img 
                              src={getBookImage(globalIndex)}
                              alt="Book cover"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Book Spine Text */}
                          <div className="absolute inset-0 p-1 flex flex-col items-center justify-center text-center">
                            {/* Mood Emoji at top */}
                            <div className="text-lg mb-2">
                              {getMoodEmoji(story.mood)}
                            </div>
                            
                            {/* Title - rotated for spine effect */}
                            <div 
                              className="text-white text-xs font-bold leading-tight transform -rotate-90 whitespace-nowrap overflow-hidden"
                              style={{ fontFamily: "'Amatic SC', cursive" }}
                            >
                              {story.title.length > 15 ? `${story.title.substring(0, 15)}...` : story.title}
                            </div>
                            
                            {/* Year at bottom */}
                            <div className="text-[#d4af37] text-xs font-bold mt-2 transform -rotate-90">
                              {story.year}
                            </div>
                          </div>

                          {/* Book Details Hover Card */}
                          <div className="absolute left-full top-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                            <div className="bg-[#f5e6d3] p-4 rounded-lg shadow-xl w-64 border border-[#deac80]/20">
                              {/* Cover Image */}
                              <img 
                                src={getBookImage(globalIndex)}
                                alt="Story cover"
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xl">{getMoodEmoji(story.mood)}</span>
                                <span className="text-xs bg-[#d4af37] text-black px-2 py-1 rounded-full font-bold">
                                  {story.year}
                                </span>
                              </div>
                              
                              <h4 className="font-bold text-[#4b3a2d] mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                                {story.title}
                              </h4>
                              <p className="text-xs text-[#6b5748] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                                {story.date} • Chapter: {story.chapterTitle}
                              </p>
                              <p className="text-xs text-[#4b3a2d] leading-snug mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                                {story.content.length > 120 ? `${story.content.substring(0, 120)}...` : story.content}
                              </p>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-1">
                                {story.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="text-xs bg-[#deac80]/20 px-2 py-1 rounded-full text-[#6b5748]"
                                    style={{ fontFamily: "'Amatic SC', cursive" }}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              
                              {/* Arrow pointing to book */}
                              <div className="absolute right-full top-8 mr-1">
                                <div className="w-3 h-3 bg-[#f5e6d3] border-l border-t border-[#deac80]/20 transform rotate-45"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Book Ends */}
                  <div className="w-8 h-52 bg-gradient-to-b from-[#8b4513] to-[#654321] rounded-sm border-2 border-[#5d4037] flex items-center justify-center">
                    <div className="text-[#d4af37] text-xs font-bold transform -rotate-90" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      📖
                    </div>
                  </div>
                </div>
              </div>

              {/* Shelf Shadow */}
              <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/20 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Library Footer */}
        <div className="mt-8 text-center">
          <div className="bg-[#f5e6d3]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20">
            <h3 className="text-2xl font-bold text-[#f5e6d3] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
              📖 Library Catalog
            </h3>
            <div className="flex justify-center space-x-8 text-[#d4af37]">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {allStories.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Books
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {shelves.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Shelves
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {lifeStory.chapters.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Collections
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
