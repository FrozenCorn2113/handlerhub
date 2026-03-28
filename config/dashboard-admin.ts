import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  CurrencyDollar,
  Gear,
  SquaresFour,
  UserCircle,
  Wallet,
} from '@phosphor-icons/react/dist/ssr'

export interface ISidebarItem {
  name: string
  path: string
  icon: PhosphorIcon
  items?: ISubItem[]
}

export interface ISubItem {
  name: string
  path: string
}

export const dashboardAdminMenuitems: ISidebarItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard-admin',
    icon: SquaresFour,
  },
  {
    name: 'Transactions',
    path: '/dashboard-admin/transactions',
    icon: CurrencyDollar,
  },
  {
    name: 'Payments',
    path: '/dashboard-admin/payments',
    icon: Wallet,
  },
  {
    name: 'Users',
    path: '/dashboard-admin/users',
    icon: UserCircle,
  },
  {
    name: 'Settings',
    path: '/dashboard-admin/settings',
    icon: Gear,
    items: [
      {
        name: 'General',
        path: '/dashboard-admin/settings',
      },
      {
        name: 'Security',
        path: '/dashboard-admin/settings/security',
      },
      {
        name: 'Notifications',
        path: '/dashboard-admin/settings/notifications',
      },
    ],
  },
]
