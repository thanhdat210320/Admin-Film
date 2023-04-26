import dayjs from 'dayjs'
import Litepicker from 'litepicker'
import { useEffect, useRef } from 'react'

export interface IDatePickerProps {}

export default function DatePicker(props: IDatePickerProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const $ = (window as any).$
    let options = {
      resetButton: true,
      autoApply: false,
      singleMode: false,
      numberOfColumns: 2,
      numberOfMonths: 2,
      showWeekNumbers: true,
      format: 'DD/MM/YYYY',
      lang: 'vi-VN',
      dropdowns: {
        minYear: 1990,
        maxYear: null,
        months: true,
        years: true
      }
    }

    if ($(ref.current).data('single-mode')) {
      options.singleMode = true
      options.numberOfColumns = 1
      options.numberOfMonths = 1
    }

    if ($(ref.current).data('format')) {
      options.format = $(ref.current).data('format')
    }

    if (!$(ref.current).val()) {
      let date = dayjs().format(options.format)
      date += !options.singleMode
        ? ' - ' + dayjs().add(1, 'month').format(options.format)
        : ''
      $(ref.current).val(date)
    }

    const picker = new Litepicker({
      element: ref.current,
      ...options
    })

    return () => picker.destroy()
  }, [])

  return (
    <input
      ref={ref}
      type="text"
      className="datepicker form-control w-56 block mx-auto"
      data-single-mode="true"
    />
  )
}
