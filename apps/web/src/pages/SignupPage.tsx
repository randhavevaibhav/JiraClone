import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, User } from 'lucide-react';
import { LoadingButton } from '@/components/LoadingButton/LoadingButton';
import { FormField } from '@/components/FormField/FormField';
import {
  type SignUpFormData,
  signUpFormSchema,
} from '@/form-schema/signupFormSchema';
import { Link } from 'react-router-dom';
import { getLoginPagePath } from '@/utils/getPagePaths';

export default function SignUpPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [profilePreview, setProfilePreview] = useState<{
    profilePreviewURL: string;
    imageFile: File;
  } | null>(null);

  const formMethods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files?.[0];
    if (!files) return;
    setProfilePreview({
      profilePreviewURL: URL.createObjectURL(files),
      imageFile: files,
    });
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (profilePreview?.profilePreviewURL) {
        URL.revokeObjectURL(profilePreview.profilePreviewURL);
      }
    };
  }, [profilePreview?.profilePreviewURL]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsSigningUp(true);

      const uploadedFile = profilePreview?.imageFile;

      console.log({
        ...data,
        uploadedFile,
      });

      // Example FormData for backend upload
      const formData = new FormData();

      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('password', data.password);

      if (uploadedFile) {
        formData.append('profileImage', uploadedFile);
      }

      // fake api delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // API call here
      // await signup(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-(--bg-primary)">
      <div
        className="w-full max-w-md rounded-3xl border border-(--border-color)
        bg-(--bg-secondary) shadow-2xl shadow-black/5 lg:p-6 p-4"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-(--text-primary)">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Join your workspace and start collaborating
          </p>
          <div className="mt-2 text-center">
            <p className="text-sm text-(--text-secondary)">
              Already have an account&nbsp;?&nbsp;&nbsp;
              <Link
                to={getLoginPagePath()}
                className="text-indigo-500 hover:text-indigo-400
              font-semibold transition-colors cursor-pointer "
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Profile Upload */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative group">
            <div
              className="w-28 h-28 rounded-full overflow-hidden
              border-4 border-(--border-color)
              bg-(--bg-primary)
              flex items-center justify-center
              shadow-lg"
            >
              {profilePreview ? (
                <img
                  src={profilePreview.profilePreviewURL}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={42} className="text-(--text-secondary)" />
              )}
            </div>

            <label
              htmlFor="profile-upload"
              className="absolute bottom-1 right-1
              w-9 h-9 rounded-full
              bg-indigo-600 hover:bg-indigo-500
              text-white
              flex items-center justify-center
              cursor-pointer
              shadow-lg transition-all"
            >
              <Camera size={16} />
            </label>

            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileChange}
            />
          </div>

          <p className="mt-3 text-xs text-(--text-secondary)">
            Upload profile picture
          </p>
        </div>

        {/* Form */}
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-3.5"
            noValidate
          >
            <FormField
              label="Full Name"
              type="text"
              name="fullName"
              isRequired
            />

            <FormField
              label="Email Address"
              type="email"
              name="email"
              isRequired
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              isRequired
            />

            <FormField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              isRequired
            />

            <LoadingButton
              type="submit"
              isLoading={isSigningUp}
              loadingText="Creating account..."
              className="mt-1"
            >
              Create Account
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
