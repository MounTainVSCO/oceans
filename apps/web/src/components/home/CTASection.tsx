import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import CozyCorgi from './anim/corgi';
import { Logo } from '@/components/ui/Logo';

export function CTASection() {
    const { isAuthenticated } = useAuthContext();

    return (
        <section className="relative py-24 bg-[#faf6f1] overflow-hidden">
            {/* Background pattern matching other sections */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full stroke-amber-800/10 opacity-60"
            >
                <defs>
                    <pattern
                        id="cta-pattern"
                        width="200"
                        height="200"
                        x="50%"
                        y="-1"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#cta-pattern)"
                />
            </svg>

            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="hidden lg:flex items-center min-h-[500px]">
                    {/* Left side - Corgi Animation (50% width) */}
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="w-96 h-96">
                            <CozyCorgi />
                        </div>
                    </div>

                    {/* Right side - Logo + Text + Button (50% width) */}
                    <div className="w-1/2 flex flex-col items-center justify-center text-center space-y-8">
                        <div className="scale-125">
                            <Logo />
                        </div>

                        <h2
                            className="text-8xl font-bold text-amber-900 drop-shadow-sm tracking-tight"
                            style={{ fontFamily: "'Amatic SC', cursive" }}
                        >
                            Start Now
                        </h2>

                        <div>
                            {isAuthenticated ? (
                                <Link to="/dashboard">
                                    <button className="inline-flex scale-100 items-center justify-center rounded-lg text-2xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-16 px-12 shadow-lg"
                                        style={{ fontFamily: "'Amatic SC', cursive" }}
                                    >
                                        Open Timeline
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/register">
                                    <button className="inline-flex scale-100 items-center justify-center rounded-lg text-2xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-16 px-12 shadow-lg"
                                        style={{ fontFamily: "'Amatic SC', cursive" }}
                                    >
                                        Create Account
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile version - stacked layout */}
                <div className="lg:hidden text-center">
                    <div className="mb-8">
                        <Logo className="justify-center" />
                    </div>

                    <h2
                        className="text-7xl font-bold text-amber-900 drop-shadow-sm tracking-tight mb-8"
                        style={{ fontFamily: "'Amatic SC', cursive" }}
                    >
                        Start Now
                    </h2>

                    <div className="mb-8">
                        {isAuthenticated ? (
                            <Link to="/dashboard">
                                <button className="inline-flex scale-100 items-center justify-center rounded-lg text-2xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-16 px-12 shadow-lg"
                                    style={{ fontFamily: "'Amatic SC', cursive" }}
                                >
                                    Open Timeline
                                </button>
                            </Link>
                        ) : (
                            <Link to="/register">
                                <button className="inline-flex scale-100 items-center justify-center rounded-lg text-2xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-16 px-12 shadow-lg"
                                    style={{ fontFamily: "'Amatic SC', cursive" }}
                                >
                                    Create Account
                                </button>
                            </Link>
                        )}
                    </div>

                    <div className="w-64 h-64 mx-auto scale-75">
                        <CozyCorgi />
                    </div>
                </div>
            </div>
        </section>
    );
}