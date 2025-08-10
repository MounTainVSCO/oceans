import { DogAnimation } from './anim/dog';

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-foreground/10 opacity-60 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:opacity-40"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-border/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <div
          className="aspect-[1108/632] h-96 w-[69.25rem] bg-gradient-to-r from-[#deac80] to-[#b5c18e] opacity-30 dark:opacity-15"
          style={{
            clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl h-screen px-6 lg:flex lg:items-center lg:justify-between lg:px-12 overflow-hidden">
        <div
          className="mx-auto max-w-3xl shrink-0 lg:mx-0 lg:mt-0 lg:max-w-xl lg:h-full flex flex-col justify-center lg:flex-1"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="hidden items-center gap-x-4 sm:flex">
            <div className="inline-flex items-center rounded-full border px-3 py-0.5 text-sm font-light transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 border-amber-600 bg-amber-100 text-amber-800" style={{ fontFamily: "'Amatic SC', cursive" }}>
              Version 4
            </div>
            <a
              href="https://docs.rxresu.me/overview/features"
              className="inline-flex scale-100 items-center justify-center rounded-sm text-lg font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 text-amber-700 underline-offset-4 hover:underline h-auto px-0 space-x-2 text-left"
              style={{ fontFamily: "'Amatic SC', cursive" }}
            >
              <p>What's new in the latest version</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </a>
          </div>

          <div className="mt-10 space-y-2">
            <h6 className="text-3xl font-bold tracking-wide text-amber-800" style={{ fontFamily: "'Amatic SC', cursive" }}>Finally,</h6>
            <h1 className="text-7xl font-bold tracking-tight sm:text-9xl text-amber-900 drop-shadow-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
              Track Your Life
            </h1>
          </div>

          <p className="prose prose-base font-md tracking-md prose-amber mt-6 text-2xl leading-8 text-amber-800 dark:prose-invert" style={{ fontFamily: "'Amatic SC', cursive" }}>
            A warm and intuitive platform that helps you document your life's journey, celebrate milestones, and reflect on your personal growth.
          </p>

          <div className="mt-10 flex items-center gap-x-8">
            <a
              className="inline-flex scale-100 items-center justify-center rounded-lg text-xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-14 px-10 shadow-lg"
              href="/dashboard"
              data-discover="true"
              style={{ fontFamily: "'Amatic SC', cursive" }}
            >
              Start Your Journey
            </a>
            <button className="inline-flex scale-100 items-center justify-center rounded-lg text-xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 border-2 border-amber-800 text-amber-800 hover:bg-amber-50 h-14 px-10" style={{ fontFamily: "'Amatic SC', cursive" }}>
              Learn More
            </button>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl sm:mt-12 lg:mt-0 lg:max-w-none lg:flex-1 lg:h-full flex-shrink-0 items-center justify-start">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none flex items-center justify-center">
            <div style={{ opacity: 1, transform: "none" }}>
              <div style={{ transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)" }}>
                <DogAnimation />
              </div>
            </div>
          </div>
        </div>



      </div>

    </section>
  );
}