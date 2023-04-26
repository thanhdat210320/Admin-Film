import AccountMenu from '../AccountMenu'
import Breadcrumb from '../Breadcrumb'
import Logo from '../Logo'
import Notifications from '../Notifications'
import SeachBar from '../Search'

export interface ITopBarProps {}

export default function TopBar(props: ITopBarProps) {
  return (
    <div className="top-bar-boxed relative z-[51] -mx-3 my-12 h-[70px] border-b border-white/[0.08] px-3 sm:-mx-8 sm:px-8 md:-mt-5 md:pt-0">
      <div className="flex h-full items-center">
        <Logo />
        <Breadcrumb />
        <SeachBar />
        <Notifications />
        <AccountMenu />
      </div>
    </div>
  )
}
