import { cn } from '@/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

type LabelProps = {
  isRequired?: boolean;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'label'>;

export const Label = (props: LabelProps) => {
  const { className, isRequired = false, children, ...rest } = props;

  return (
    <>
      <label
        className={cn(
          'text-base uppercase tracking-wider text-(--text-secondary)',
          className,
        )}
        {...rest}
      >
        {isRequired && <span className="text-red-500 mr-1">*</span>}
        {children}
      </label>
    </>
  );
};
