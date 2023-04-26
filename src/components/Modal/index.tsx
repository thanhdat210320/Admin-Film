import { XCircle } from 'lucide-react'
import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  display?: boolean
  open: boolean
  title?: string
  children?: JSX.Element | undefined | Array<JSX.Element> | string
  key?: string
  handleConfirm?: () => void
  handleCancel?: () => void
  confirmButtonTitle?: string
  className?: string
  disabled?: boolean
}
const Modal = ({
  display,
  open,
  title,
  children,
  key,
  handleConfirm,
  handleCancel,
  confirmButtonTitle = 'Xác nhận',
  className = 'w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4',
  disabled = false
}: ModalProps) =>
  ReactDOM.createPortal(
    <React.Fragment>
      {open && (
        <div className="fixed w-screen h-screen left-0 right-0 bottom-0 top-0 flex justify-center items-center z-[1000]">
          <div
            className="bg-black/30 absolute top-0 left-0 right-0 bottom-0 h-full w-full z-50"
            onClick={() => handleCancel && handleCancel()}
          />
          <div className={`bg-white rounded-lg shadow-md z-[60] ${className}`}>
            <div className="flex justify-between items-center p-3">
              <p className="sm:text-lg font-semibold">{title}</p>
              <XCircle
                className="cursor-pointer transition-all hover:scale-90"
                onClick={() => handleCancel && handleCancel()}
              />
            </div>
            <hr className={`border-black/[0.08]`} />
            <div className="p-3">
              {typeof children === 'string' ? (
                <p className="sm:text-medium">{children}</p>
              ) : (
                children
              )}
            </div>
            <hr className={`border-black/[0.08]`} />
            <div
              className={`${
                display ? 'hidden' : 'flex'
              } justify-center gap-2 items-center p-3`}
            >
              <button
                className="btn btn-link py-3 px-4 w-full xl:w-32 xl:mr-1 align-top"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary py-3 px-4 w-full xl:w-32 align-top"
                onClick={handleConfirm}
                disabled={disabled}
              >
                {confirmButtonTitle}
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>,
    document.body,
    key
  )

export default Modal
