import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  logInFormSchema,
  type LogInFormFormData,
} from '@/form-schema/logInFormSchema';
import { getDashboardPagePath } from '@/utils/getPagePaths';
import { LoadingButton } from '@/components/LoadingButton/LoadingButton';
import { FormField } from '@/components/FormField/FormField';

const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formMethods = useForm<LogInFormFormData>({
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
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-3.5"
          noValidate
        >
          {/* Global API Failure Message */}
          {apiError && (
            <div className="p-3 rounded-lg text-sm font-medium bg-rose-500/10 border border-rose-500/20 text-rose-500 animate-fade-in">
              ⚠️ {apiError}
            </div>
          )}

          <FormField label="Email Address" type="text" name="email" isRequired={true} />
          <FormField label="Password" type="password" name="password" isRequired={true}  />

          {/* Submit Action Button */}
          <LoadingButton
            disabled={isLoggingIn}
            type="submit"
            loadingText="Logging you in..."
            isLoading={isLoggingIn}
          >
            Log In
          </LoadingButton>

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
      </FormProvider>
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
