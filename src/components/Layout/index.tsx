import useThemeContext from 'contexts/theme'
import LayoutProvider from 'contexts/layout'
import * as React from 'react'
import DarkModeSwitcher from './DarkModeSwitcher'
import MobileMenu from './MobileMenu'
import SideMenu from './SideMenu'
import TopBar from './TopBar'

export interface ILayoutProps extends React.PropsWithChildren { }

export default function Layout(props: ILayoutProps) {
	const { children } = props
	return (
		<>
			<LayoutProvider>
				<div>
					<MobileMenu />
					<TopBar />
					<div className="wrapper">
						<div className="wrapper-box">
							<SideMenu />
							<div className="content">{children}</div>
						</div>
					</div>
					<DarkModeSwitcher />
				</div>
			</LayoutProvider>
		</>
	)
}
