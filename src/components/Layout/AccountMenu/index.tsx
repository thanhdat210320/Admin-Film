import useOnClickOutside from 'hooks/useOnClickOutside'
import { Edit, HelpCircle, Lock, ToggleRight, User } from 'lucide-react'
import { useRef, useState } from 'react'
export interface IAccountMenuProps {}

export default function AccountMenu(props: IAccountMenuProps) {
  return (
    <div className="intro-x dropdown w-8 h-8">
      <div
        className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
        role="button"
        aria-expanded="false"
        data-tw-toggle="dropdown"
      >
        <img
          alt="Midone - HTML Admin Template"
          src="/src/assets/images/profile-4.jpg"
        />
      </div>
      <div className="dropdown-menu w-56">
        <ul className="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
          <li className="p-2">
            <div className="font-medium">Russell Crowe</div>
            <div className="mt-0.5 text-xs text-white/60 dark:text-slate-500">
              Software Engineer
            </div>
          </li>
          <li>
            <hr className="dropdown-divider border-white/[0.08]" />
          </li>
          <li>
            <a className="dropdown-item hover:bg-white/5">
              <User className="mr-2 h-4 w-4" /> Profile
            </a>
          </li>
          <li>
            <a className="dropdown-item hover:bg-white/5">
              <Edit className="mr-2 h-4 w-4" /> Add Account
            </a>
          </li>
          <li>
            <a className="dropdown-item hover:bg-white/5">
              <Lock className="mr-2 h-4 w-4" /> Reset Password
            </a>
          </li>
          <li>
            <a className="dropdown-item hover:bg-white/5">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </a>
          </li>
          <li>
            <hr className="dropdown-divider border-white/[0.08]" />
          </li>
          <li>
            <a className="dropdown-item hover:bg-white/5">
              <ToggleRight className="mr-2 h-4 w-4" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
