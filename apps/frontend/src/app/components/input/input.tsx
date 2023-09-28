import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, PropsWithoutRef } from 'react'

interface InputProps
  extends PropsWithoutRef<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> {
  error?: { message?: string; type?: string } | boolean
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="w-full">
      <div className="my-4">
        <label
          htmlFor={props.id ?? ''}
          className={`mb-1 block text-md font-medium text-black ${props.error && 'text-red-600'}`}
        >
          {props.label ?? ''}:
        </label>
        <input
          ref={ref}
          {...props}
          type={props.type ?? 'text'}
          placeholder={props.placeholder ?? ''}
          className={`
          w-full rounded-lg border-[1.5px] border-form-stroke py-3 px-5 font-medium text-body-color placeholder-body-color
           outline-none transition border-gray-300 focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default
            disabled:bg-[#e9ecef] disabled:text-gray-400 ${props.error && 'text-red-600 border-red-500'}`}
        />
        {typeof props.error === 'object' && 'message' in props.error && (
          <span className="block my-2 text-sm text-red-600">{props.error.message}</span>
        )}
      </div>
    </div>
  )
})
Input.displayName = 'Input'
