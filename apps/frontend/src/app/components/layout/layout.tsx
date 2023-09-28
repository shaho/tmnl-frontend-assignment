import { PropsWithChildren } from 'react'
import { Navbar } from '../navbar'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex flex-col w-full p-2 lg:p-4">{children}</main>
    </div>
  )
}
