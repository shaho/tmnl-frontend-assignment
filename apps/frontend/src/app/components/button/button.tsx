import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type Props = PropsWithChildren<{
  href?: string
  onClick?: () => void
}>

export function Button({ children, href, onClick }: Props) {
  const classNames =
    'px-3 py-2 text-sm transition-all bg-white border rounded-md hover:bg-gray-800 hover:text-white whitespace-nowrap'

  if (href)
    return (
      <Link to={href} className={classNames}>
        {children}
      </Link>
    )

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}
