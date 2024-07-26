import { AxiosResponse } from 'axios'

import { useNotifyStore } from '../stores'

import { api } from '../config'
import { Response } from '../interfaces'
import { axiosStatusMessage } from '../consts'

export const NotifyApiInterceptor = () => {
   api.interceptors.request.use(
      (request) => {
         useNotifyStore.getState().notifyLoading(true)
         return request
      },
      (err) => {
         useNotifyStore.getState().notifyLoading(false)
         useNotifyStore.getState().notifyMessage(axiosStatusMessage[err.code], 'error')
         return Promise.reject(err)
      }
   )

   api.interceptors.response.use(
      (response: AxiosResponse<Response<{}>>) => {
         const { message, messageType } = response.data

         useNotifyStore.getState().notifyLoading(false)
         useNotifyStore.getState().notifyMessage(message, messageType)
         return response
      },
      (err) => {
         useNotifyStore.getState().notifyLoading(false)
         useNotifyStore.getState().notifyMessage(axiosStatusMessage[err.code], 'error')
         return Promise.reject(err)
      }
   )
}
