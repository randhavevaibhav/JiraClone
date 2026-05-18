import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
import { getDashboardPagePath } from '@/utils/getPagePaths';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--bg-primary) text-(--text-primary) transition-colors duration-300">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-purple-500/10 blur-[100px]" />

      {/* Main Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="w-full max-w-5xl rounded-3xl border border-(--border-color) bg-(--bg-secondary) p-4 shadow-2xl backdrop-blur-md sm:p-6 lg:p-10">
          {/* Badge */}
          <div className="mb-4 flex justify-center">
            <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-rose-500 sm:text-xs">
              ERROR CODE 404
            </span>
          </div>

          {/* Responsive Layout */}
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
            {/* GIF Section */}
            <div className="w-full flex-1">
              <div className="group overflow-hidden rounded-2xl border border-(--border-color)/60 bg-(--card-bg) p-2 transition-transform duration-300 hover:scale-[1.01]">
                <img
                  src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                  alt="Confused Caveman searching for a web page"
                  className="h-auto max-h-[260px] w-full rounded-xl object-cover sm:max-h-[340px] lg:max-h-[420px]"
                  loading="eager"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="max-w-xl text-2xl leading-tight font-extrabold tracking-tight text-(--text-primary) sm:text-4xl lg:text-5xl">
                Looks like you're completely lost.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-(--text-secondary) sm:text-base">
                The page you are trying to access doesn't exist, was heavily
                moved during a recent sprint cycle, or is currently hidden
                behind a firewall.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                {/* Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-primary) px-5 py-3 font-semibold text-(--text-primary) transition-all hover:bg-(--card-bg) sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Go Back</span>
                </button>

                {/* Dashboard Button */}
                <button
                  type="button"
                  onClick={() => navigate(getDashboardPagePath())}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98] sm:w-auto"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Return Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
