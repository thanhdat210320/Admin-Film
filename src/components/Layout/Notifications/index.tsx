import { Bell } from 'lucide-react'
import * as React from 'react'

export interface INotificationsProps {}

export default function Notifications(props: INotificationsProps) {
  return (
    <div className="intro-x dropdown mr-4 sm:mr-6">
      <div
        className="dropdown-toggle notification notification--bullet cursor-pointer"
        role="button"
        aria-expanded="false"
        data-tw-toggle="dropdown"
      >
        <Bell
          className="notification__icon dark:text-slate-500"
        />
      </div>
      <div className="notification-content dropdown-menu pt-2">
        <div className="notification-content__box dropdown-content">
          <div className="notification-content__title">Notifications</div>
          <div className="relative flex cursor-pointer items-center ">
            <div className="image-fit mr-1 h-12 w-12 flex-none">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/profile-1.jpg"
              />
              <div className="bg-success absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white" />
            </div>
            <div className="ml-2 overflow-hidden">
              <div className="flex items-center">
                <a href="#" className="mr-5 truncate font-medium">
                  Russell Crowe
                </a>
                <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                  01:10 PM
                </div>
              </div>
              <div className="mt-0.5 w-full truncate text-slate-500">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </div>
            </div>
          </div>
          <div className="relative mt-5 flex cursor-pointer items-center">
            <div className="image-fit mr-1 h-12 w-12 flex-none">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/profile-11.jpg"
              />
              <div className="bg-success absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white" />
            </div>
            <div className="ml-2 overflow-hidden">
              <div className="flex items-center">
                <a href="#" className="mr-5 truncate font-medium">
                  Denzel Washington
                </a>
                <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                  01:10 PM
                </div>
              </div>
              <div className="mt-0.5 w-full truncate text-slate-500">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 20
              </div>
            </div>
          </div>
          <div className="relative mt-5 flex cursor-pointer items-center">
            <div className="image-fit mr-1 h-12 w-12 flex-none">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/profile-3.jpg"
              />
              <div className="bg-success absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white" />
            </div>
            <div className="ml-2 overflow-hidden">
              <div className="flex items-center">
                <a href="#" className="mr-5 truncate font-medium">
                  Arnold Schwarzenegger
                </a>
                <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                  05:09 AM
                </div>
              </div>
              <div className="mt-0.5 w-full truncate text-slate-500">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomi
              </div>
            </div>
          </div>
          <div className="relative mt-5 flex cursor-pointer items-center">
            <div className="image-fit mr-1 h-12 w-12 flex-none">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/profile-11.jpg"
              />
              <div className="bg-success absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white" />
            </div>
            <div className="ml-2 overflow-hidden">
              <div className="flex items-center">
                <a href="#" className="mr-5 truncate font-medium">
                  Johnny Depp
                </a>
                <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                  01:10 PM
                </div>
              </div>
              <div className="mt-0.5 w-full truncate text-slate-500">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomi
              </div>
            </div>
          </div>
          <div className="relative mt-5 flex cursor-pointer items-center">
            <div className="image-fit mr-1 h-12 w-12 flex-none">
              <img
                alt="Midone - HTML Admin Template"
                className="rounded-full"
                src="/src/assets/images/profile-4.jpg"
              />
              <div className="bg-success absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white" />
            </div>
            <div className="ml-2 overflow-hidden">
              <div className="flex items-center">
                <a href="#" className="mr-5 truncate font-medium">
                  Al Pacino
                </a>
                <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                  06:05 AM
                </div>
              </div>
              <div className="mt-0.5 w-full truncate text-slate-500">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
