import useDebounce from 'hooks/useDebounce'
import { Search, X } from 'lucide-react'
import React, { memo, useEffect, useState } from 'react'

interface InputTextProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange: (value: any) => void
  defaultValue?: string
  delay?: number,
  isHiddenIcon?: boolean,
  placeholder?: string
}

const InputSearchDebounce = ({
  defaultValue,
  onChange,
  delay,
  isHiddenIcon=false,
  placeholder,
  ...rest
}: InputTextProps) => {
  const [input, setInput] = useState<string | null>()
  const [buttonClear, setButtonClear] = useState<boolean>(false)
  const inputDebouce = useDebounce(input, delay || 1000)
  useEffect(() => {
    onChange && onChange(inputDebouce)
  }, [inputDebouce])


  return (
    <div
      className="relative w-full text-slate-500 group">
      <input
        {...rest}
        type="text"
        name="_q"
        onChange={(e: any) => setInput(e.target.value)}
        value={input || defaultValue || ''}
        placeholder={placeholder || "Tìm kiếm..."}
        className={`rounded-lg w-full ${isHiddenIcon ? 'pr-[30px]' : 'pr-[65px]'}`}
      />
      <span style={{ visibility: input ? 'visible' : 'hidden' }} className={`hidden group-hover:block p-[2px] rounded-full border-[2px] border-[#666] absolute top-[11px] cursor-pointer ${isHiddenIcon ? 'right-1' : 'right-10'}`}><X size={12} color="#333" className="" onClick={() => setInput(null)}></X></span>
      {isHiddenIcon || <button type="button">
        <Search className="absolute right-3 top-[8px] cursor-pointer" />
      </button>}
    </div>
  )
}

export default memo(InputSearchDebounce)
