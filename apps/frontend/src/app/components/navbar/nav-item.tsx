import { Link, useLocation } from 'react-router-dom'

type Props = {
  href: string
  label: string
}

export function NavItem({ href, label }: Props) {
  const location = useLocation()
  return (
    <li className="block">
      <Link
        className={`block py-2 px-3 rounded-s-lg  hover:bg-white text-black transition-all  ${
          location.pathname === href && 'font-bold bg-white text-gray-600'
        }`}
        to={href}
      >
        {label}
      </Link>
    </li>
  )
}
