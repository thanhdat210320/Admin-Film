
export interface Menu {
  id: number
  name: string
  slug: string
	patchChildren?: Array<string>
}

export const menuConfig: Menu[] = [
	{
    id: 1,
    name: 'Quản lý Users',
    slug: '/users',
  },
  {
    id: 2,
    name: 'Quản lý Bài tập',
    slug: '/exercise'
  },
  {
    id: 3,
    name: 'Quản lý Học tập',
    slug: '/study'
  }
]

export const mathRouteConfig = [{ path: "/users/:id" }]