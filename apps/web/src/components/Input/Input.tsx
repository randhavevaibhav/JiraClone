import { cn } from '@/utils/cn';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  isError?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { isError = false, className, ...rest } = props;
    return (
      <input
        className={cn(
          `w-full px-4 py-3 rounded-xl border bg-(--bg-primary) text-(--text-primary) 
          placeholder:text-(--text-secondary)/50 focus:outline-hidden focus:ring-2 transition-all`,
          {
            'border-rose-500/50 focus:ring-rose-500/20': isError,
            'border-(--border-color) focus:ring-indigo-500/20 focus:border-indigo-500':
              !isError,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);
