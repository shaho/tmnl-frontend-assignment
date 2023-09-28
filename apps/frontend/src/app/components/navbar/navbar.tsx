import { NavItem } from './nav-item'

export function Navbar() {
  return (
    <nav className="flex-col hidden h-screen py-4 pl-4 bg-gray-200 lg:flex w-52">
      <ul className="flex flex-col w-full space-y-2">
        <NavItem href="/" label="Dashboard" />
        <NavItem href="/alerts" label="Alerts" />
      </ul>
    </nav>
  )
}
