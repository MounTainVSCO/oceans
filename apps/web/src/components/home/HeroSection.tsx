export function HeroSection() {
  return (
    <section id="hero" className="relative">
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
          className="aspect-[1108/632] h-96 w-[69.25rem] bg-gradient-to-r from-[#6f8cbb] to-[#c93b37] opacity-40 dark:opacity-20"
          style={{
            clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:flex lg:h-screen lg:items-center lg:px-12">
        <div
          className="mx-auto mt-32 max-w-3xl shrink-0 lg:mx-0 lg:mt-0 lg:max-w-xl lg:pt-8"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="hidden items-center gap-x-4 sm:flex">
            <div className="inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-primary bg-primary text-primary-foreground">
              Version 4
            </div>
            <a
              href="https://docs.rxresu.me/overview/features"
              className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-auto px-0 space-x-2 text-left"
            >
              <p>What's new in the latest version</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </a>
          </div>

          <div className="mt-10 space-y-2">
            <h6 className="text-base font-bold tracking-wide">Finally,</h6>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Track Your Life
            </h1>
          </div>

          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.
          </p>

          <div className="mt-10 flex items-center gap-x-8">
            <a
              className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-6"
              href="/dashboard"
              data-discover="true"
            >
              Go to dashboard
            </a>
            <button className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-800 h-10 px-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="mr-3"
              >
                <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div style={{ opacity: 1, transform: "none" }}>
              <div style={{ transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)" }}>
                <img
                  width="3600"
                  height="2078"
                  src="/screenshots/builder.jpg"
                  alt="Reactive Resume - Screenshot - Builder Screen"
                  className="w-[76rem] rounded-lg bg-background/5 shadow-2xl ring-1 ring-foreground/10"
                />
                <div
                  className="glare-wrapper"
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "0px",
                    maskImage: "-webkit-radial-gradient(white, black)",
                    pointerEvents: "none"
                  }}
                >
                  <div
                    className="glare"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0% 0% 0px",
                      pointerEvents: "none",
                      width: "1404.59px",
                      height: "1404.59px",
                      transform: "rotate(0deg) translate(-50%, -50%)",
                      opacity: 0,
                      background: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(250, 250, 250) 100%)"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

    </section>
  );
}