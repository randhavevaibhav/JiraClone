import { cn } from '@/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

type ErrorTextProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'p'>;

export const ErrorText = (props: ErrorTextProps) => {
  const { className, children } = props;
  return <p className={cn("text-sm  text-rose-400 mt-0.5 pl-1 tracking-wider",className)}>{children}</p>;
};
