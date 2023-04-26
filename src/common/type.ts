import React from 'react'

export interface IMenuItemOptions {
  open?: boolean
}

export interface IMenuItem {
  id: string | number
  name: string
  url?: string
  icon?: React.ReactNode
  options?: IMenuItemOptions
  children?: Array<IMenuItem>
  onClick?: () => void
}
