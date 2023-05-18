import React, { memo } from 'react'
import { FieldError } from 'react-hook-form'

interface InputTextProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object
  className?: string
  label?: string
  error: FieldError | undefined
  children?: any
  classNameInput?: string
  disabled?: boolean
  horizontal?: boolean
  classNameLabel?: string
  iconLabel?: JSX.Element
  required?: boolean
}

const InputText = ({
  register,
  error,
  label,
  className,
  classNameInput,
  children,
  disabled = false,
  horizontal = false,
  classNameLabel,
  iconLabel,
  required,
  ...rest
}: InputTextProps) => {
  return (
    <div
      className={`w-full ${
        horizontal ? 'flex gap-2 mb-2' : 'mt-2'
      } ${className}`}
    >
      {label && (
        <div className="item-center flex flex-col justify-center">
          <div
            className={`flex justify-start items-center gap-2 ${
              horizontal ? 'min-w-[100px]' : 'mb-1'
            } ${classNameLabel}`}
          >
            {iconLabel}
            <label className="block text-gray-700 text-md font-medium ">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {error && horizontal && <p className={`mt-2 h-4`}></p>}
        </div>
      )}
      <div className={`relative ${horizontal ? 'flex-1' : ''}`}>
        <input
          {...register}
          {...rest}
          className={`appearance-none rounded w-full p-3 leading-tight ${classNameInput}`}
          type="text"
          disabled={disabled}
        />
        {children}
        {error && (
          <p className={`mt-2 text-red-500 text-sm`}>{error?.message}</p>
        )}
      </div>
    </div>
  )
}

export default memo(InputText)
