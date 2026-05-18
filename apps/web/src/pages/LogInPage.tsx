import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  logInFormSchema,
  type LogInFormFormData,
} from '@/form-schema/logInFormSchema';
import { getDashboardPagePath } from '@/utils/getPagePaths';

const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormFormData>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LogInFormFormData) => {
    try {
      setApiError(null);
      await login({ email: data.email, password: data.password });
      navigate(getDashboardPagePath(), { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    }
  };
  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-(--border-color) bg-(--bg-secondary) shadow-xl transition-all duration-300 mx-auto lg:my-8 my-2">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-(--text-primary)">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-(--text-secondary)">
          Enter your credentials to access your Jira workspace
        </p>
      </div>

      {/* Form Context */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Global API Failure Message */}
        {apiError && (
          <div className="p-3 rounded-lg text-sm font-medium bg-rose-500/10 border border-rose-500/20 text-rose-500 animate-fade-in">
            ⚠️ {apiError}
          </div>
        )}

        {/* Email Field Container */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border bg-(--bg-primary) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-hidden focus:ring-2 transition-all ${
              errors.email
                ? 'border-rose-500/50 focus:ring-rose-500/20'
                : 'border-(--border-color) focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          {errors.email && (
            <p className="text-sm font-medium text-rose-500 mt-0.5 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field Container */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
              Password
            </label>
            <a
              href="#forgot"
              className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className={`w-full px-4 py-3 rounded-xl border bg-(--bg-primary) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-hidden focus:ring-2 transition-all ${
              errors.password
                ? 'border-rose-500/50 focus:ring-rose-500/20'
                : 'border-(--border-color) focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          {errors.password && (
            <p className="text-sm font-medium text-rose-500 mt-0.5 pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="self-center w-full mt-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoggingIn ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Logging you in...</span>
            </>
          ) : (
            <span>Log In</span>
          )}
        </button>

        {/* Mock Credentials Hint */}
        <div className="mt-6 p-3 rounded-xl bg-(--card-bg) border border-(--border-color) text-center">
          <p className="text-xs text-(--text-secondary)">
            <span className="text-lg">💡</span> Quick Demo Access:
            <br />
            <span className="font-mono font-bold text-(--text-primary)">
              demo@test.com
            </span>{' '}
            /{' '}
            <span className="font-mono font-bold text-(--text-primary)">
              password
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default function LogInPage() {
  return (
    <div className="w-full p-4">
      <LoginForm />
    </div>
  );
}
