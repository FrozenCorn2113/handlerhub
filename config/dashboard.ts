import { DashboardConfig } from 'types'

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
