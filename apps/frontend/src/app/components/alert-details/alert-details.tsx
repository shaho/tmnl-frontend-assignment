import { Link } from 'react-router-dom'

import { Alert } from '../../types'

type AlertProps = {
  alert: Alert
}

export function AlertDetails({ alert }: AlertProps) {
  return (
    <div className="flex items-center">
      <div className="group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div className="absolute invisible group-hover:animate-spin-slow -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>

        <div className="relative rounded-[15px] bg-white p-6">
          <span
            className={`px-3 py-2 border rounded m-1 text-sm inline-block mb-6  ${
              alert?.status === 'OPEN' ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {alert?.status}
          </span>
          <div className="mb-6 space-y-4">
            <p className="text-lg font-semibold text-slate-800">{alert?.description}</p>
            <p className="font-md text-slate-500">
              <span className="text-slate-400">Transaction ID:</span> {alert?.transactionId}
            </p>
            <p className="font-md text-slate-500">
              <span className="text-slate-400">ID:</span> {alert?.id}
            </p>
          </div>

          <div>
            <Link className="underline" to="/alerts">
              Back to Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
