import { IMenuItem } from 'common/type'
import { Zap } from 'lucide-react'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react'

export const MenuContext = createContext<{
  menuList?: Array<IMenuItem>
  activeMenu?: IMenuItem
  activeMenuRootId?: number | string | null
  setActiveMenu: Dispatch<SetStateAction<IMenuItem | undefined>>
}>({ setActiveMenu: () => {} })

export const useMenuContext = () => useContext(MenuContext)

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [menuList, _] = useState<IMenuItem[]>([
    {
      id: 'home',
      name: 'Trang chủ',
      url: '/',
      icon: <Zap />,
      children: []
    },
    {
      id: 1,
      name: 'Quản lý thông tin',
      icon: <Zap />,
      children: [
        {
          id: 2,
          name: 'Người dùng',
          url: '/user',
          icon: <Zap />
        },
        {
          id: 3,
          name: 'Người dùng hệ thống',
          url: '/user/1',
          icon: <Zap />
        }
      ]
    }
  ])
  const [activeMenu, setActiveMenu] = useState<IMenuItem>()

  const activeMenuRootId = useMemo(() => {
    if (!activeMenu || !menuList.length) {
      return null
    }

    const isChildrenContainId = (id: number | string, menuItem: IMenuItem) => {
      for (const subMenu of menuItem.children || []) {
        if (subMenu.id === id) {
          return true
        }
        isChildrenContainId(id, subMenu)
      }
      return false
    }

    for (const rootMenu of menuList) {
      if (isChildrenContainId(activeMenu.id, rootMenu)) {
        return rootMenu.id
      }
    }
    return null
  }, [activeMenu, menuList])

  return (
    <MenuContext.Provider
      value={{
        menuList,
        activeMenu,
        activeMenuRootId,
        setActiveMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default useMenuContext
