import { useEffect, useRef, useState } from 'react'

interface IGoToPageProps {
  onClickGoButton: (page: string) => void
  defaultValue: number | string
  maxValue: number
}

const GoToPage = ({ onClickGoButton, defaultValue, maxValue }: IGoToPageProps) => {
  const [value, setValue] = useState(defaultValue)
  const refPageInput = useRef() as React.MutableRefObject<HTMLInputElement>
  const onChangeValue = (e: any) => {
    setValue((): any => {
      if (e.target.value <= 0) {
        return '1'
      }
      if (e.target.value >= maxValue) {
        return maxValue
      }
      return e.target.value
    }
    )
  }
  const onClickButton = () => {
    if (+value <= 0) {
      onClickGoButton(refPageInput?.current?.value)
    }
    if (+value > maxValue) {
      onClickGoButton(refPageInput?.current?.value)
    }
    onClickGoButton(refPageInput?.current?.value)
  }

  useEffect(() => {
    setValue(defaultValue);
  },[defaultValue])
  return (
    <>
      <div className="flex items-center">
        <span className="mr-2 text-sm">To Page</span>
        <input
          type="number"
          ref={refPageInput}
          className="w-14 h-8 mr-3 text-sm p-2"
          // defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChangeValue(e)}
        />
        <button
          className="btn-primary text-white w-10 h-8 rounded"
          onClick={() => onClickButton()}
        >
          Go
        </button>
      </div>
    </>
  )
}

export default GoToPage
