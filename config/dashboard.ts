import { DashboardConfig } from 'types'

export type DashboardNavItem = {
  title: string
  href: string
  icon?: string
  children?: { title: string; href: string; icon?: string }[]
}

export const handlerNavItems: DashboardNavItem[] = [
  { title: 'Home', href: '/dashboard' },
  {
    title: 'Bookings',
    href: '/dashboard/bookings',
    children: [
      { title: 'Bookings', href: '/dashboard/bookings' },
      { title: 'Invoices', href: '/dashboard/invoices' },
    ],
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    children: [
      { title: 'Clients', href: '/dashboard/clients' },
      { title: 'Inbox', href: '/dashboard/inbox' },
    ],
  },
  {
    title: 'Shows',
    href: '/dashboard/shows',
    children: [
      { title: 'Shows', href: '/dashboard/shows' },
      { title: 'Stats', href: '/dashboard/stats' },
    ],
  },
  { title: 'Services', href: '/dashboard/services' },
  { title: 'Profile', href: '/dashboard/profile' },
]

export const exhibitorNavItems: DashboardNavItem[] = [
  { title: 'My Dogs', href: '/dashboard/dogs' },
  {
    title: 'Bookings',
    href: '/dashboard/bookings',
    children: [
      { title: 'Bookings', href: '/dashboard/bookings' },
      { title: 'Messages', href: '/dashboard/messages' },
    ],
  },
  { title: 'Find a Handler', href: '/dashboard/find-handler' },
]

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Browse Handlers',
      href: '/handlers',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Bookings',
      href: '/dashboard/bookings',
      icon: 'page',
    },
    {
      title: 'My Profile',
      href: '/dashboard/profile',
      icon: 'user',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
}
