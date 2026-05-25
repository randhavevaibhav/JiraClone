import { Input } from '@/components/Input/Input';
import { Label } from '@/components/Label/Label';
import { useState } from 'react';
import { ErrorText } from '@/components/ErrorText/ErrorText';
import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

type FormFieldProps = {
  label: string;
  name: string;
  type: 'number' | 'checkbox' | 'text' | 'password' | 'email';
  isRequired?: boolean;
  placeholder?: string;
};
export const FormField = ({
  label,
  name,
  type = 'text',
  isRequired = false,
  placeholder = '',
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [showPass, setShowPass] = useState(false);

  const errorMsg =
    typeof errors[name]?.message === 'string'
      ? errors[name].message
      : undefined;
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col space-y-1.5 relative mt-1">
      <Label htmlFor={name} className="capitalize" isRequired={isRequired}>
        {label}
      </Label>

      <Input
        id={name}
        type={isPassword ? (showPass ? 'text' : 'password') : type}
        placeholder={isPassword ? '••••••••' : placeholder}
        {...register(name)}
        className={cn(
          {
            'border-red-500 focus-visible:ring-0': errorMsg,
          },
          'transition-none border-card-border',
        )}
        data-test={`${name}-input`}
        autoComplete="on"
      />

      {isPassword && (
        <div
          className="absolute top-10.5 right-2.5 cursor-pointer"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? <Eye /> : <EyeOff />}
        </div>
      )}

      <div className="flex justify-between">
        <ErrorText
          className={cn(
            {
              visible: errorMsg,
              invisible: !errorMsg,
            },
            'min-h-5',
          )}
          data-test={`${name}-error`}
        >
          {errorMsg}
        </ErrorText>
      </div>
    </div>
  );
};
