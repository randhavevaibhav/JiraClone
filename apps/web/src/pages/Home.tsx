import dashBoardDesktopDarkImg from '@/assets/images/dashboard-desktop-dark.png';
import dashBoardMobileDarkImg from '@/assets/images/dashboard-mobile-dark.png';
import dashBoardDesktopLightImg from '@/assets/images/dashboard-desktop-light.png';
import dashBoardMobileLightImg from '@/assets/images/dashboard-mobile-light.png';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

const DashboardScreenShotImg = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-(--bg-secondary) overflow-hidden">
      {/* 1. DESKTOP IMAGE: Visible only on screens sm (640px) and above */}
      <img
        src={isDark ? dashBoardDesktopDarkImg : dashBoardDesktopLightImg}
        alt="Kanban Board Desktop Workspace"
        className="hidden sm:block w-full max-h-125 object-contain object-top rounded-lg shadow-md transition-all duration-300"
        loading="eager"
      />

      {/* 2. MOBILE IMAGE: Visible only on screens below sm (640px) */}
      <img
        src={isDark ? dashBoardMobileDarkImg : dashBoardMobileLightImg}
        alt="Kanban Board Mobile Workspace"
        className="block sm:hidden w-full max-h-125 object-contain object-top rounded-lg shadow-md transition-all duration-300"
        loading="eager"
      />
    </div>
  );
};

const HeroSection = () => {
  return (
    <header className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center">
      {/* Subtle Background Glow - adapts color saturation based on theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Product Tag */}
      <span className="self-center inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20 mb-6 backdrop-blur-md">
        ✨ Introducing Planify 2.0 — Next-Gen Project Management
      </span>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight bg-linear-to-b from-(--text-primary) to-(--text-secondary) bg-clip-text text-transparent">
        Move fast. Stay aligned. Build better products.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg md:text-xl text-(--text-secondary) max-w-2xl leading-relaxed">
        The ultimate Jira alternative built for speed. Manage sprints, track
        bugs, and collaborate in real-time without the bloated interface.
      </p>

      {/* Hero Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
        <Link
          to={'/login'}
          className="self-center w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          Log in
        </Link>
        <button className="self-center w-full sm:w-auto px-8 py-4 bg-(--bg-secondary) hover:opacity-90 text-(--text-primary) font-semibold rounded-xl border border-(--border-color) transition-all cursor-pointer">
          Sign up
        </button>
      </div>

      {/* App Preview Mockup */}
      <div className="mt-16 w-full max-w-5xl rounded-2xl border border-(--border-color) bg-(--bg-secondary) p-2 shadow-2xl transition-all">
        <div className="rounded-xl border border-(--border-color) bg-(--bg-primary) overflow-hidden  flex flex-col">
          {/* Mock Window Controls */}
          <div className="px-4 py-3 bg-(--bg-secondary) border-b border-(--border-color) flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
            <span className="text-xs text-(--text-secondary) ml-4 font-mono">
              workspace / boards
            </span>
          </div>

          <DashboardScreenShotImg />
        </div>
      </div>
    </header>
  );
};

const SocialProofs = () => {
  return (
    <section className="border-y border-(--border-color) bg-(--bg-secondary) py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) mb-6">
          Trusted by fast-moving engineering teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 dark:opacity-40 grayscale">
          <span className="text-xl font-bold tracking-tight">ACME corp</span>
          <span className="text-xl font-bold tracking-tight">GLOBEX</span>
          <span className="text-xl font-bold tracking-tight">INITECH</span>
          <span className="text-xl font-bold tracking-tight">UMBRELLA</span>
        </div>
      </div>
    </section>
  );
};

const CoreFeatures = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Engineered for modern agile workflows.
        </h2>
        <p className="text-(--text-secondary) mt-4">
          Everything you need to ship software without the configuration
          headache.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) transition-all group hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            📋
          </div>
          <h3 className="text-xl font-semibold mb-2">Blazing Fast Kanban</h3>
          <p className="text-(--text-secondary) text-sm leading-relaxed">
            Drag, drop, and update issues instantly. Optimized with smooth
            layout animations for zero friction.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) transition-all group hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            ⏱️
          </div>
          <h3 className="text-xl font-semibold mb-2">Sprint Backlogs</h3>
          <p className="text-(--text-secondary) text-sm leading-relaxed">
            Plan your upcoming cycles, assign story points, and track velocity
            with intuitive analytics dashboards.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) transition-all group hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            ⚡
          </div>
          <h3 className="text-xl font-semibold mb-2">Keyboard Driven</h3>
          <p className="text-(--text-secondary) text-sm leading-relaxed">
            Command menu integrations allow power users to create, assign, and
            search tasks entirely using shortcuts.
          </p>
        </div>
      </div>
    </section>
  );
};

const BottomCTA = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-28 pt-12">
      <div className="relative rounded-3xl border border-(--border-color) bg-(--bg-secondary) p-12 text-center overflow-hidden shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl mx-auto">
          Ready to experience the speed?
        </h2>
        <p className="text-(--text-secondary) mt-4 max-w-md mx-auto text-sm">
          Join thousands of developers tracking their progress with full focus.
          Sign up in seconds.
        </p>
        <button className="self-center mt-8 px-8 py-4 bg-(--text-primary) hover:opacity-90 text-(--bg-primary) font-semibold rounded-xl shadow-xl transition-all active:scale-[0.98] cursor-pointer">
          Create Workspace
        </button>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof Logos */}
      <SocialProofs />
      {/* Core Features Grid */}
      <CoreFeatures />

      {/* Bottom Call to Action Section */}
      <BottomCTA />
    </>
  );
}
