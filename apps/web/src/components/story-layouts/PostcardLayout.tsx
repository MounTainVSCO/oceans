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

interface PostcardLayoutProps {
  lifeStory: LifeStory;
  onEditStory: (story: Story) => void;
}

export function PostcardLayout({ lifeStory, onEditStory }: PostcardLayoutProps) {
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

  const getPostcardImage = (index: number, mood: string) => {
    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=250&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=250&fit=crop&crop=center'
    ];
    return images[index % images.length];
  };

  const allStories = lifeStory.chapters.flatMap(chapter => 
    chapter.stories.map(story => ({ ...story, chapterTitle: chapter.title, year: chapter.year }))
  );

  return (
    <div className="w-3/5 bg-gradient-to-br from-[#e8f4fd] to-[#f0f8ff] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-8 sticky top-0 bg-gradient-to-br from-[#e8f4fd]/95 to-[#f0f8ff]/95 backdrop-blur-sm pb-4">
          <h1 className="text-4xl font-bold text-[#4b3a2d] mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
            ✉️ Travel Postcards
          </h1>
          <p className="text-lg text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Memories from life's journey
          </p>
        </div>

        {/* Postcard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allStories.map((story, index) => {
            const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
            
            return (
              <div
                key={story.id}
                onClick={() => onEditStory(story)}
                className={`bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group transform ${rotation} hover:rotate-0 hover:scale-105 overflow-hidden border-4 border-white`}
                style={{
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05)'
                }}
              >
                {/* Postcard Front (Image Side) */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getPostcardImage(index, story.mood)}
                    alt="Memory"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Postmark */}
                  <div className="absolute top-3 right-3 bg-red-600/90 text-white p-2 rounded-full transform rotate-12">
                    <span className="text-xs font-bold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.year}
                    </span>
                  </div>

                  {/* Vintage Border */}
                  <div className="absolute inset-2 border-2 border-white/30 rounded pointer-events-none"></div>
                </div>

                {/* Postcard Back (Message Side) */}
                <div className="p-4 bg-gradient-to-br from-[#fefefe] to-[#f8f8f8]" 
                     style={{
                       backgroundImage: `repeating-linear-gradient(
                         90deg,
                         transparent,
                         transparent 19px,
                         #e0e7ff 19px,
                         #e0e7ff 20px
                       )`
                     }}>
                  
                  {/* Address Line */}
                  <div className="border-b border-[#e0e7ff] pb-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{getMoodEmoji(story.mood)}</span>
                      <div className="text-right">
                        <p className="text-sm text-[#6b5748] font-semibold" style={{ fontFamily: "'Amatic SC', cursive" }}>
                          From: {story.chapterTitle}
                        </p>
                        <p className="text-xs text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                          {story.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-[#4b3a2d] group-hover:text-[#6b5748] transition-colors mb-2" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.title}
                    </h3>
                    <p className="text-[#4b3a2d] text-sm leading-relaxed" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {story.content.length > 120 ? `${story.content.substring(0, 120)}...` : story.content}
                    </p>
                  </div>

                  {/* Stamps (Tags) */}
                  <div className="flex flex-wrap gap-1 justify-end">
                    {story.tags.slice(0, 3).map(tag => (
                      <div key={tag} className="bg-gradient-to-br from-red-500 to-red-600 text-white px-2 py-1 rounded text-xs transform rotate-3" style={{ fontFamily: "'Amatic SC', cursive" }}>
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* Edit Icon */}
                  <div className="absolute bottom-2 left-2">
                    <svg className="w-4 h-4 text-[#6b5748] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
