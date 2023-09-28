import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'

import { Input } from '../components/input'
import { Alert } from '../types'
import { addAlert } from '../services'

export type formDataType = Pick<Alert, 'description' | 'transactionId'>

export function AddAlertPage() {
  const navigate = useNavigate()
  const client = useQueryClient()

  const addNewAlert = useMutation({
    mutationFn: (newAlert: Alert) => {
      return addAlert(newAlert)
    },
  })

  const initialValue: formDataType = {
    transactionId: '',
    description: '',
  }

  const onSubmit = async (data: formDataType) => {
    addNewAlert.mutate({
      ...data,
      status: 'OPEN',
    })
    reset()
    await client.refetchQueries(['alerts'])
    navigate('/alerts')
  }

  const methods = useForm({
    mode: 'onChange',
    values: initialValue,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods

  const buttonClasses = addNewAlert.isLoading
    ? 'bg-blue-300 hover:bg-blue-300 cursor-not-allowed'
    : 'bg-blue-500 hover:bg-blue-700'

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold">Add a new Alert</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Transaction ID"
            placeholder="Please enter the Transaction ID"
            error={errors.transactionId}
            {...register('transactionId', {
              required: { value: true, message: 'Transaction ID is required' },
              validate: (value) => value.length > 3 || 'Transaction ID must be more than 3 chars',
            })}
          />
          <Input
            label="Description"
            placeholder="Please enter the Description"
            error={errors.description}
            {...register('description', {
              required: { value: true, message: 'Description is required' },
              validate: (value) => value.length > 3 || 'Description must be more than 3 chars',
            })}
          />

          <div className="text-end">
            <button
              type="submit"
              disabled={addNewAlert.isLoading}
              onClick={() => {}}
              className={`${buttonClasses} mt-8 bg-blue-500 hover:bg-blue-700
      text-white font-bold py-2 px-4 rounded focus:ring-4 focus:ring-blue-100 focus:border-blue-400`}
            >
              {addNewAlert.isLoading ? (
                <span className="inline-flex w-full h-full rounded-ful">Adding...</span>
              ) : (
                'Add New Alert'
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
