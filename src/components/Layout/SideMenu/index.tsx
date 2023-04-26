import { mathRouteConfig, Menu, menuConfig } from 'components/Layout/menuConfig'
import { Link, matchRoutes, useLocation } from 'react-router-dom'

export interface ISideMenuProps { }

export interface IMenuItemProps {
	item: Menu
}

export const MenuItem = ({ item }: IMenuItemProps) => {
	const location = useLocation()
	const mathURL = matchRoutes(mathRouteConfig, location)
	const pathRouter = mathURL?.[0]?.route?.path || location.pathname
	const isActive = pathRouter === item.slug

	return (
		<li key={item.slug}>
			<Link
				to={item.slug || '/'}
				className={`side-menu ${isActive ? 'side-menu--active' : ''}`}
			>
				<div className="side-menu__icon">*</div>
				<div className="side-menu__title">
					{item.name}
				</div>
			</Link>
		</li>
	)
}

export default function SideMenu(props: ISideMenuProps) {
	return (
		<nav className="side-nav">
			<ul>
				{menuConfig.map((item: Menu) => {
					return <MenuItem key={item.id} item={item} />
				})}
			</ul>
		</nav>
	)
}
