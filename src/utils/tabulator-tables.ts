import { cloneElement } from 'react'
import { createRoot } from 'react-dom/client'

export function reactFormatter(JSX: any) {
  return function customFormatter(
    cell: any,
    formatterParams: any,
    onRendered: any
  ) {
    // cell - the cell component
    // formatterParams - parameters set for the column
    // onRendered - function to call when the formatter has been rendered
    var renderFn = function () {
      var cellEl = cell.getElement()
      if (cellEl) {
        var formatterCell = cellEl.querySelector('.formatterCell')
        if (formatterCell) {
          var CompWithMoreProps = cloneElement(JSX, { cell: cell })

          createRoot(cellEl.querySelector('.formatterCell')).render(
            CompWithMoreProps
          )
        }
      }
    }
    onRendered(renderFn) // initial render only.
    setTimeout(function () {
      renderFn() // render every time cell value changed.
    }, 0)
    return '<div class="formatterCell"></div>'
  }
}
