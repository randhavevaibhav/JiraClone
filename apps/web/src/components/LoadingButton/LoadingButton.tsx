import { cn } from '@/utils/cn';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
} & ComponentPropsWithoutRef<'button'>;

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (props: LoadingButtonProps, ref) => {
    const { children, className="", isLoading=false, loadingText="Loading...", disabled, ...rest } =
      props;
    return (
      <button
        className={cn(
          `self-center w-full mt-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white 
        font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all active:scale-[0.99] 
        flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed`,
          className,
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className='min-w-20 text-center'>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);
