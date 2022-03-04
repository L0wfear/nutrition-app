import React, { ReactElement, ReactNode } from 'react'
import { ROLES } from '@constants/appConstants'

export type Role = typeof ROLES[keyof typeof ROLES]
export type Permissions =  {
  create?: Role[]
  read?: Role[]
  update?: Role[]
  delete?: Role[]
}

export type PageRoute = {
  title: string
  icon?: ReactElement
  hiddenNav?: boolean
  permissions: Permissions
  info?: ReactNode
  path: string
} & (
  | {
      routePath?: string
      component: React.FC<any>
      children?: never
    }
  | {
      children: Array<PageRoute>
      routePath?: never
    }
)



export type AppRoutes = Array<PageRoute>
