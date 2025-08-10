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

interface ArtGalleryLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function ArtGalleryLayout({ lifeStory, onEditStory }: ArtGalleryLayoutProps) {
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

  const getFrameStyle = (index: number) => {
    const styles = [
      'border-8 border-[#8b4513] shadow-2xl',
      'border-4 border-[#d4af37] shadow-xl',
      'border-6 border-white shadow-2xl',
      'border-4 border-black shadow-xl',
      'border-8 border-[#cd853f] shadow-2xl',
    ];
    return styles[index % styles.length];
  };

  const getFrameSize = (index: number) => {
    const sizes = [
      'w-64 h-48', // Landscape
      'w-48 h-64', // Portrait
      'w-56 h-56', // Square
      'w-72 h-48', // Wide
      'w-48 h-72', // Tall
    ];
    return sizes[index % sizes.length];
  };

  const getArtworkImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=300&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=350&h=350&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=450&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=300&h=450&fit=crop&crop=center',
    ];
    return images[index % images.length];
  };

  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title, year: chapter.year }))
  );

  // Create gallery walls (rows) with varying heights
  const walls = [];
  for (let i = 0; i < allStories.length; i += 3) {
    walls.push(allStories.slice(i, i + 3));
  }

  return (
    <div className="w-3/5 bg-gradient-to-b from-[#f8f8f8] to-[#e8e8e8] overflow-y-auto">
      <div className="p-6">
        {/* Gallery Header */}
        <div className="text-center mb-8 sticky top-0 bg-gradient-to-b from-[#f8f8f8]/95 to-[#e8e8e8]/95 backdrop-blur-sm pb-6 z-10">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
            🎨 Life Gallery
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Curated memories on display
          </p>
          
          {/* Gallery Info Plaque */}
          <div className="bg-[#f5e6d3] p-4 rounded-lg shadow-lg max-w-md mx-auto mt-4 border border-[#deac80]/30">
            <div className="text-sm text-[#4b3a2d] leading-relaxed" style={{ fontFamily: "'Amatic SC', cursive" }}>
              <em>"{lifeStory.subtitle}"</em><br/>
              <strong>— {lifeStory.title} Collection</strong><br/>
              <span className="text-xs text-[#6b5748]">
                {allStories.length} pieces • {lifeStory.chapters.length} exhibitions
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Walls */}
        <div className="space-y-16">
          {walls.map((wall, wallIndex) => (
            <div key={wallIndex} className="relative">
              {/* Wall Background with Texture */}
              <div 
                className="bg-gradient-to-br from-white to-[#fafafa] p-8 rounded-lg shadow-inner border border-[#e0e0e0]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 20px,
                      rgba(0,0,0,0.01) 20px,
                      rgba(0,0,0,0.01) 40px
                    )
                  `
                }}
              >
                {/* Wall Number */}
                <div className="absolute -top-4 left-8 bg-[#4b3a2d] text-[#f5e6d3] px-3 py-1 rounded-full text-sm font-bold">
                  Gallery {wallIndex + 1}
                </div>

                {/* Artworks Row */}
                <div className="flex flex-wrap justify-center items-start gap-8 min-h-96">
                  {wall.map((story, artIndex) => {
                    const globalIndex = wallIndex * 3 + artIndex;
                    
                    return (
                      <div
                        key={story.id}
                        onClick={() => onEditStory(story)}
                        className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:z-10"
                        style={{
                          marginTop: artIndex % 2 === 0 ? '0' : '2rem',
                          transform: `rotate(${(artIndex - 1) * 0.5}deg)`
                        }}
                      >
                        {/* Picture Frame */}
                        <div className={`${getFrameSize(globalIndex)} ${getFrameStyle(globalIndex)} bg-white p-2 group-hover:shadow-3xl transition-shadow duration-300 relative`}>
                          {/* Artwork */}
                          <div className="w-full h-full relative overflow-hidden">
                            <img 
                              src={getArtworkImage(globalIndex)}
                              alt={story.title}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Artwork Overlay with Mood */}
                            <div className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-lg">
                              {getMoodEmoji(story.mood)}
                            </div>
                            
                            {/* Year Signature */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                              '{story.year.slice(-2)}
                            </div>
                          </div>

                          {/* Gallery Placard */}
                          <div className="absolute -bottom-16 left-0 right-0 bg-[#f5e6d3] p-3 rounded-lg shadow-lg border border-[#deac80]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h4 className="font-bold text-[#4b3a2d] text-sm mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              "{story.title}"
                            </h4>
                            <p className="text-xs text-[#6b5748] mb-1" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              {story.date} • {story.chapterTitle} Series
                            </p>
                            <p className="text-xs text-[#4b3a2d] leading-tight mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              {story.content.length > 80 ? `${story.content.substring(0, 80)}...` : story.content}
                            </p>
                            
                            {/* Medium Tags */}
                            <div className="flex flex-wrap gap-1">
                              {story.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs bg-[#deac80]/30 px-2 py-1 rounded-full text-[#6b5748] italic"
                                  style={{ fontFamily: "'Amatic SC', cursive" }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Artist Signature */}
                            <div className="text-right mt-2 text-xs text-[#6b5748] italic" style={{ fontFamily: "'Amatic SC', cursive" }}>
                              — Life Artist
                            </div>
                          </div>
                          
                          {/* Hanging Wire */}
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-px h-6 bg-[#666] opacity-30"></div>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 border-t-2 border-l-2 border-r-2 border-[#666] rounded-t-full opacity-30"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floor Shadow */}
              <div className="absolute -bottom-4 left-8 right-8 h-8 bg-gradient-to-t from-black/10 to-transparent rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Gallery Information */}
        <div className="mt-12 text-center">
          <div className="bg-[#f5e6d3] p-6 rounded-2xl shadow-lg border border-[#deac80]/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#4b3a2d] mb-4" style={{ fontFamily: "'Amatic SC', cursive" }}>
              🏛️ Exhibition Details
            </h3>
            
            <div className="grid grid-cols-3 gap-6 text-[#6b5748]">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {allStories.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Artworks
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {walls.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Gallery Walls
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  {lifeStory.chapters.length}
                </div>
                <div className="text-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Collections
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-[#6b5748] italic" style={{ fontFamily: "'Amatic SC', cursive" }}>
              "Every memory is a masterpiece waiting to be appreciated."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
