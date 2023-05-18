import { useBreadcrumb } from 'contexts/breadcrumb';
import { menuConfig } from '@/components/Layout/menuConfig'
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

function getDisplayName(name: string) {
  const bread = menuConfig.filter(item => item.slug === name)
  return bread[0]?.name
}

export default function Breadcrumb() {
	const breadCrumbs = useReactRouterBreadcrumbs();
	const {textBreadcrumb} = useBreadcrumb();

  return (
    <nav aria-label="breadcrumb" className="-intro-x mr-auto h-full">
      <ol className="breadcrumb breadcrumb-light">
			{breadCrumbs.map(({ breadcrumb, match }: any, index: number) => (
          <div className="breadcrumb-item" key={match.pathname}>
            <Link to={match.pathname || ""}>
              {getDisplayName(match.pathname) || (index === breadCrumbs.length - 1 ? textBreadcrumb :  breadcrumb)}
            </Link>
            {index < breadCrumbs.length - 1}
          </div>
        ))}
      </ol>
    </nav>
  )
}
