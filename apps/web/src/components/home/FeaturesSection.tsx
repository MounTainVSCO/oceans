import BearAnim from './anim/bear';

export function FeaturesSection() {
  return (
    <section className="bg-[#faf6f1] text-[#5b4636] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-amber-900 drop-shadow-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
            Rich in features, not in friction.
          </h2>
          <p className="mt-3 text-lg text-[#6b5748]">
            Everything you need to journal comfortably, without the clutter.
          </p>
        </header>

        {/* Container with Bear in center and cards around */}
        <div className="mt-16 relative min-h-[800px] flex items-center justify-center">
          {/* Bear component positioned in center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <BearAnim />
          </div>

          {/* Cards positioned in a circle around the bear */}
          {/* Card 1 - Top (12 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '50%', 
                 top: '5%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h10M4 17h16" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Simple Writing</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Clean, distraction-free interface that lets you focus on your thoughts.
            </p>
          </div>

          {/* Card 2 - Top Right (2 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '75%', 
                 top: '15%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Daily Prompts</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Thoughtful prompts to inspire reflection and deeper thinking.
            </p>
          </div>

          {/* Card 3 - Right (3 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 right: '5%', 
                 top: '50%', 
                 transform: 'translateY(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Private & Secure</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Your thoughts stay yours. End-to-end encryption keeps entries private.
            </p>
          </div>

          {/* Card 4 - Bottom Right (4 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '75%', 
                 bottom: '15%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Timeline View</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Visualize your journey with beautiful timeline layouts and milestones.
            </p>
          </div>

          {/* Card 5 - Bottom (6 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '50%', 
                 bottom: '5%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" />
                <polyline points="3.27,6.96 12,12.01 20.73,6.96" strokeLinecap="round" />
                <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Smart Search</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Find any entry instantly with powerful search across all your content.
            </p>
          </div>

          {/* Card 6 - Bottom Left (8 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '25%', 
                 bottom: '15%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" />
                <path d="M2 2l7.586 7.586" strokeLinecap="round" />
                <circle cx="11" cy="11" r="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Customizable</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Personalize your experience with themes, layouts, and writing preferences.
            </p>
          </div>

          {/* Card 7 - Left (9 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '5%', 
                 top: '50%', 
                 transform: 'translateY(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 1 1.946-.806 3.42 3.42 0 0 1 2.439 1.01 3.42 3.42 0 0 1 2.445-1.01 3.42 3.42 0 0 1 1.93.806c1.216.652 2.14 1.88 2.406 3.223a4.32 4.32 0 0 1 .016 2.204c-.424 2.074-2.237 3.532-4.5 3.532s-4.076-1.458-4.5-3.532a4.32 4.32 0 0 1 .016-2.204c.266-1.344 1.19-2.571 2.406-3.223z" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Mood Tracking</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Track your emotional journey with intuitive mood indicators and insights.
            </p>
          </div>

          {/* Card 8 - Top Left (10 o'clock) */}
          <div className="absolute w-72 group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
               style={{ 
                 left: '25%', 
                 top: '15%', 
                 transform: 'translateX(-50%)' 
               }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Daily Insights</h3>
            <p className="mt-1.5 leading-relaxed text-[#6b5748]">
              Get meaningful insights from your writing patterns and growth over time.
            </p>
          </div>

          {/* Mobile layout - grid for smaller screens */}
          <div className="lg:hidden absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 items-start">
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h10M4 17h16" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Simple Writing</h3>
              <p className="mt-1.5 leading-relaxed text-[#6b5748]">
                Clean, distraction-free interface that lets you focus on your thoughts.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Daily Prompts</h3>
              <p className="mt-1.5 leading-relaxed text-[#6b5748]">
                Thoughtful prompts to inspire reflection and deeper thinking.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Private & Secure</h3>
              <p className="mt-1.5 leading-relaxed text-[#6b5748]">
                Your thoughts stay yours. End-to-end encryption keeps entries private.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">Timeline View</h3>
              <p className="mt-1.5 leading-relaxed text-[#6b5748]">
                Visualize your journey with beautiful timeline layouts and milestones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}