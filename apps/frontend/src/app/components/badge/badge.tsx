import { PropsWithChildren } from 'react'

import { AlertStatus } from '../../types'

type BadgeProps = PropsWithChildren<{
  type: AlertStatus
}>

export function Badge({ children, type }: BadgeProps) {
  return (
    <span
      className={`text-xs px-2 py-1 ml-3 text-smtransition duration-500  rounded-md select-none ease focus:outline-none focus:shadow-outline ${
        type === 'OPEN' && 'bg-indigo-500 hover:bg-indigo-600  text-white '
      }`}
    >
      {children}
    </span>
  )
}
