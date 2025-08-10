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

        <div className="mt-16 relative">
          {/* Bear component positioned on the left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
            <BearAnim />
          </div>

          {/* Features grid with staggered layout */}
          <div className="lg:ml-48 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {/* Feature card 1 - Top left */}
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out lg:mt-0">
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

            {/* Feature card 2 - Top right, staggered down */}
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out lg:mt-8">
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

            {/* Feature card 3 - Far right, top aligned */}
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out lg:mt-0 xl:block hidden">
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

            {/* Feature card 4 - Middle left, staggered */}
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out lg:mt-12">
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

            {/* Feature card 5 - Middle right */}
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out lg:mt-16">
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

            {/* Feature card 6 - Far right, middle */}
            <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out lg:mt-8 xl:block hidden">
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

            {/* Additional cards for smaller screens - show the hidden ones */}
            <div className="xl:hidden block">
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
            </div>

            <div className="xl:hidden block">
              <div className="group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
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
            </div>
        </div>
      </div>
      </div>
    </section>
  );
}