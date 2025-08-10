import { useState } from 'react';

// Cozy Cat Component
function CozyCat() {
  return (
    <>
      <style>{`
        .cozy-main {
          position: relative;
          width: 8vmax;
          height: 8vmax;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cozy-cat {
          position: relative;
          width: 8vmax;
          height: 7vmax;
        }

        .cozy-cat::before {
          content: "";
          position: absolute;
          bottom: -0.4vmax;
          left: 50%;
          transform: translateX(-50%);
          width: 6vmax;
          height: 0.8vmax;
          background-color: #d4b499;
          border-radius: 50%;
          z-index: -10;
          animation: cozy-shadow 8s ease-in-out infinite;
        }

        .cat__body {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6vmax;
          height: 4vmax;
          background-color: #8a5a3c;
          border-radius: 50% 50% 30% 30% / 60% 60% 40% 40%;
          z-index: -1;
          animation: body-bob 8s ease-in-out infinite;
        }

        .cat__paws {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4.4vmax;
          height: 1.2vmax;
          z-index: 2;
          animation: body-bob 8s ease-in-out infinite;
        }

        .cat__paw {
          position: absolute;
          bottom: 0;
          width: 1.6vmax;
          height: 1vmax;
          background-color: #a86f54;
          border-radius: 50% 50% 40% 40% / 70% 70% 30% 30%;
        }

        .cat__paw--left { left: 0; }
        .cat__paw--right { right: 0; }

        .cat__tail {
          position: absolute;
          bottom: 0.4vmax;
          left: -1.6vmax;
          width: 4.8vmax;
          height: 1vmax;
          background-color: #8a5a3c;
          border-radius: 0.8vmax;
          transform-origin: 100% 50%;
          transform: rotate(30deg);
          animation: tail-sway 8s ease-in-out infinite;
        }

        .cat__head {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4.8vmax;
          height: 4.4vmax;
          background-color: #a86f54;
          border-radius: 50%;
          animation: head-turn 8s ease-in-out infinite;
        }

        .cat__ear {
          position: absolute;
          top: -0.4vmax;
          width: 2vmax;
          height: 2vmax;
          background-color: #a86f54;
          z-index: -1;
        }

        .cat__ear::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          background-color: #d57a66;
        }

        .cat__ear--left {
          left: -0.4vmax;
          border-radius: 5% 70% 5% 50%;
          transform: rotate(-15deg);
          animation: ear-twitch-left 8s ease-in-out infinite;
        }
        .cat__ear--left::before { border-radius: 5% 70% 5% 50%; }

        .cat__ear--right {
          right: -0.4vmax;
          border-radius: 70% 5% 50% 5%;
          transform: rotate(15deg);
          animation: ear-twitch-right 8s ease-in-out infinite;
        }
        .cat__ear--right::before { border-radius: 70% 5% 50% 5%; }

        .cat__eye {
          position: absolute;
          top: 1.6vmax;
          width: 1vmax;
          height: 1vmax;
          background-color: #f5e6d3;
          border-radius: 50%;
          animation: blink 8s linear infinite;
        }

        .cat__eye::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 0.2vmax;
          height: 0.48vmax;
          background-color: #5b4636;
          border-radius: 0.1vmax;
        }

        .cat__eye--left { left: 0.8vmax; }
        .cat__eye--right { right: 0.8vmax; }

        .cat__nose {
          position: absolute;
          top: 2.6vmax;
          left: 50%;
          transform: translateX(-50%);
          width: 0.6vmax;
          height: 0.4vmax;
          background-color: #d57a66;
          border-radius: 20% 20% 50% 50%;
        }

        .cat__mouth {
          position: absolute;
          top: 3vmax;
          left: 50%;
          width: 1.2vmax;
          height: 0.6vmax;
          transform: translateX(-50%);
          animation: meow 8s ease-in-out infinite;
        }

        .cat__mouth::before,
        .cat__mouth::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          border-style: solid;
          border-color: #5b4636;
          border-width: 0 0 0.08vmax 0;
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
        }
        .cat__mouth::before { left: 0; transform: rotate(10deg); }
        .cat__mouth::after { right: 0; transform: rotate(-10deg); }

        .cat__whiskers-l, .cat__whiskers-r {
          position: absolute;
          top: 3vmax;
          width: 2vmax;
          height: 1.2vmax;
        }
        .cat__whiskers-l { left: -0.2vmax; transform: rotate(10deg); }
        .cat__whiskers-r { right: -0.2vmax; transform: rotate(-10deg); }

        .cat__whiskers-l::before,
        .cat__whiskers-l::after,
        .cat__whiskers-r::before,
        .cat__whiskers-r::after {
          content: "";
          position: absolute;
          height: 0.06vmax;
          background-color: #5b4636;
          border-radius: 0.04vmax;
        }
        .cat__whiskers-l::before { width: 80%; top: 0; left: 0; transform: rotate(-10deg); }
        .cat__whiskers-l::after { width: 100%; top: 0.4vmax; left: 0; }
        .cat__whiskers-r::before { width: 80%; top: 0; right: 0; transform: rotate(10deg); }
        .cat__whiskers-r::after { width: 100%; top: 0.4vmax; right: 0; }

        @keyframes head-turn { 0%,100%{transform:translateX(-50%) rotate(0deg);} 20%{transform:translateX(-55%) rotate(-5deg);} 60%{transform:translateX(-45%) rotate(5deg);} 80%{transform:translateX(-50%) rotate(0deg);} }
        @keyframes tail-sway { 0%,20%,100%{transform:rotate(30deg);} 50%{transform:rotate(0deg);} 80%{transform:rotate(-25deg);} }
        @keyframes blink { 0%,38%,41%,88%,91%,100%{transform:scaleY(1);} 40%,90%{transform:scaleY(0.1);} }
        @keyframes body-bob { 0%,100%{bottom:0;} 50%{bottom:0.2vmax;} }
        @keyframes ear-twitch-left { 0%,50%,100%{transform:rotate(-15deg);} 55%{transform:rotate(-25deg);} 60%{transform:rotate(-15deg);} }
        @keyframes ear-twitch-right { 0%,70%,100%{transform:rotate(15deg);} 75%{transform:rotate(25deg);} 80%{transform:rotate(15deg);} }
        @keyframes meow { 0%,50%,60%,100%{transform:translateX(-50%) scaleY(1);} 55%{transform:translateX(-50%) scaleY(1.3);} }
        @keyframes cozy-shadow { 0%,100%{width:6vmax;opacity:1;} 50%{width:6.4vmax;opacity:0.8;} }
      `}</style>

      <div className="cozy-main">
        <div className="cozy-cat">
          <div className="cat__body">
            <div className="cat__tail"></div>
          </div>

          <div className="cat__paws">
            <div className="cat__paw cat__paw--left"></div>
            <div className="cat__paw cat__paw--right"></div>
          </div>

          <div className="cat__head">
            <div className="cat__ear cat__ear--left"></div>
            <div className="cat__ear cat__ear--right"></div>
            <div className="cat__eye cat__eye--left"></div>
            <div className="cat__eye cat__eye--right"></div>
            <div className="cat__nose"></div>
            <div className="cat__mouth"></div>
            <div className="cat__whiskers-l"></div>
            <div className="cat__whiskers-r"></div>
          </div>
        </div>
      </div>
    </>
  );
}

// Memory Card Component - completely new design
function MemoryCard({ title, date, category, description, imageUrl, isSelected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
        isSelected ? 'scale-105 ring-4 ring-amber-300/50' : ''
      }`}
    >
      <div className="relative bg-stone-50/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-amber-200/30 hover:border-amber-300/50 hover:shadow-xl transition-all duration-500">
        {/* Polaroid-style photo */}
        {imageUrl && (
          <div className="mb-6 bg-white p-3 rounded-2xl shadow-md rotate-1 group-hover:rotate-0 transition-transform duration-300">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>
        )}
        
        {/* Handwritten-style date */}
        <div className="absolute top-4 right-4 bg-amber-100/80 backdrop-blur-sm px-3 py-2 rounded-2xl transform rotate-2">
          <span className="text-amber-800 font-mono text-sm font-bold">{date}</span>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              {category}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-stone-800 leading-tight">
            {title}
          </h3>
          
          <p className="text-stone-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Subtle corner decoration */}
        <div className="absolute bottom-4 left-4 w-12 h-1 bg-gradient-to-r from-amber-300/50 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}

// Main Component - Completely new layout concept
export function CozyMemoryBook() {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const memories = [
    {
      title: "Graduated with Computer Science degree",
      date: "May 15",
      category: "Education",
      description: "Four years of late nights and early mornings. Walking across that stage felt surreal - like waking up from the longest, most beautiful dream.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&crop=center"
    },
    {
      title: "Started therapy",
      date: "Jun 22", 
      category: "Growth",
      description: "The bravest thing I've done this year. Learning to be gentle with the parts of myself I used to fight against.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center"
    },
    {
      title: "First day at the startup",
      date: "Aug 03",
      category: "Career", 
      description: "Walked into this tiny office with big dreams. Everyone was so kind, and the energy was electric. I knew I was exactly where I needed to be.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center"
    },
    {
      title: "Published my first article",
      date: "Oct 12",
      category: "Achievement",
      description: "Spent three weeks perfecting every sentence. When it went live and people started sharing it, I cried happy tears at my desk.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=400&h=300&fit=crop&crop=center"
    },
    {
      title: "Luna came home",
      date: "Nov 28",
      category: "Love", 
      description: "She was the tiniest ball of fluff, shivering in the corner. Now she owns my entire apartment and most of my heart.",
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=center"
    },
    {
      title: "Ran my first marathon",
      date: "Dec 15",
      category: "Adventure",
      description: "Mile 20 was brutal. Mile 26 was pure magic. Crossing that finish line taught me I'm capable of anything.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center"
    }
  ];

  const memoriesPerPage = 4;
  const totalPages = Math.ceil(memories.length / memoriesPerPage);
  const currentMemories = memories.slice(
    currentPage * memoriesPerPage, 
    (currentPage + 1) * memoriesPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-stone-100/30 to-amber-100/40">
      


      {/* Main Content - Book Layout */}
      <div className="pt-16 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Memory Book</h1>
            <p className="text-stone-600">2024 • A year to remember</p>
          </div>
          
          {/* Memory Grid - Like an open book */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {currentMemories.map((memory, index) => (
              <MemoryCard
                key={currentPage * memoriesPerPage + index}
                {...memory}
                isSelected={selectedMemory === currentPage * memoriesPerPage + index}
                onClick={() => setSelectedMemory(
                  selectedMemory === currentPage * memoriesPerPage + index 
                    ? null 
                    : currentPage * memoriesPerPage + index
                )}
              />
            ))}
          </div>

          {/* Page Navigation */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="group flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border-2 border-amber-200/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-all duration-300"
            >
              <span className="text-amber-700">←</span>
              <span className="text-stone-700 font-medium">Previous</span>
            </button>

            <div className="flex gap-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i === currentPage 
                      ? 'bg-amber-400 scale-125' 
                      : 'bg-amber-200 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="group flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border-2 border-amber-200/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-all duration-300"
            >
              <span className="text-stone-700 font-medium">Next</span>
              <span className="text-amber-700">→</span>
            </button>
          </div>

          {/* Cozy Footer */}
          <div className="text-center mt-16">
            <div className="relative inline-block">
              {/* Main footer card */}
              <div className="bg-gradient-to-r from-amber-50/90 via-stone-50/80 to-amber-50/90 backdrop-blur-md rounded-3xl px-8 py-6 shadow-xl border-2 border-amber-200/40 transform rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center justify-center gap-4 mb-3">
                  {/* Decorative elements */}
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  {/* Heart icon */}
                  <div className="text-amber-600 text-lg animate-pulse">♡</div>
                  
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-bold text-stone-800 font-serif">
                    {memories.length} precious moments
                  </p>
                  <p className="text-sm text-stone-600 italic">
                    "Every memory is a treasure worth keeping close to your heart"
                  </p>
                </div>
                
                {/* Subtle decorative line */}
                <div className="mt-4 flex justify-center">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent rounded-full"></div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-200/60 rounded-full blur-sm animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}></div>
              <div className="absolute -bottom-1 -right-3 w-4 h-4 bg-stone-300/50 rounded-full blur-sm animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4s'}}></div>
              <div className="absolute top-1/2 -right-4 w-3 h-3 bg-amber-300/40 rounded-full blur-sm animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
            </div>
            
            {/* Additional cozy message */}
            <div className="mt-8 opacity-70">
              <p className="text-xs text-stone-500 font-mono tracking-wider">
                Made with warmth & care ✨
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Expanded Memory Overlay */}
      {selectedMemory !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-8"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {memories[selectedMemory].imageUrl && (
                <img 
                  src={memories[selectedMemory].imageUrl} 
                  alt={memories[selectedMemory].title}
                  className="w-full aspect-[16/9] object-cover rounded-2xl shadow-lg"
                />
              )}
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                    {memories[selectedMemory].category}
                  </span>
                  <span className="text-stone-500 font-mono text-lg">
                    {memories[selectedMemory].date}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-stone-800 leading-tight">
                  {memories[selectedMemory].title}
                </h2>
                
                <p className="text-stone-600 leading-relaxed text-lg">
                  {memories[selectedMemory].description}
                </p>
              </div>
              
              <button
                onClick={() => setSelectedMemory(null)}
                className="w-full py-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-2xl font-semibold transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}