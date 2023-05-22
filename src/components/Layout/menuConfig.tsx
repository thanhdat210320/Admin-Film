
export interface Menu {
  id: number
  name: string
  slug: string
	patchChildren?: Array<string>
}

export const menuConfig: Menu[] = [
	{
    id: 9,
    name: 'Tổng quát',
    slug: '/'
  },
  {
    id: 2,
    name: 'Quản lý Movies',
    slug: '/movies'
  },
	{
    id: 4,
    name: 'Quản lý Cinemas',
    slug: '/cinemas'
  },
	  {
    id: 5,
    name: 'Quản lý Screenings',
    slug: '/screenings'
  },
	{
    id: 6,
    name: 'Quản lý Bookings',
    slug: '/bookings'
  },
	{
    id: 3,
    name: 'Quản lý Tickets',
    slug: '/tickets'
  },
  {
    id: 7,
    name: 'Quản lý Reviews',
    slug: '/reviews'
  },
	{
    id: 1,
    name: 'Quản lý Users',
    slug: '/users',
  }
]

export const mathRouteConfig = [{ path: "/users/:id" }]
