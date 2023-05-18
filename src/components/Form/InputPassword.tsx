import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from "react";
import { FieldError } from "react-hook-form";

interface InputPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object;
  className?: string;
  label?: string;
  error: FieldError | undefined;
  classNameInput?: string;
}

const InputPassword = ({
  register,
  error,
  className,
  classNameInput,
  label,
  ...rest
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={className ? className : ""}>
      {label && (
        <label className="block text-gray-700 text-md font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register}
          {...rest}
          className={`appearance-none rounded w-full p-3 pr-11 text-gray-700 leading-tight ${classNameInput ? classNameInput : ``
            } `}
          type={showPassword ? `text` : `password`}
        />
        {!showPassword ? <EyeOff color="black" size={25} className="absolute right-0 top-0 bottom-0 z-50 m-auto mr-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> :
          <Eye color="black" size={25} className="absolute right-0 top-0 bottom-0 z-50 m-auto mr-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
      </div>
      {error && <p className={`mt-2 text-red-500 text-sm`}>{error?.message}</p>}
    </div>
  );
};

export default InputPassword;
