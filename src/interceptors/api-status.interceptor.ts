import { AxiosResponse } from 'axios'

import { useApiStatus } from '../stores'

import { api } from '../config'
import { HeaderResponse, Response } from '../interfaces'
import { requestCode, responseCode } from '../consts'

export const ApiStatusInterceptor = () => {
   api.interceptors.request.use(
      (request) => {
         useApiStatus.getState().apiReset()
         useApiStatus.getState().apiLoading(true)
         return request
      }
   )

   api.interceptors.response.use(
      (response: AxiosResponse<Response<{}>>) => {
         useApiStatus.getState().apiLoading(false)

         if (response.config.url?.endsWith('login')) { // Login response
            const userAuth = (response.headers as unknown as HeaderResponse).usernameauth
            useApiStatus.getState().apiMessage(`¡Bienvenido ${userAuth}!`, 'success')
         } else { // Api response
            const { message, messageType } = response.data
            useApiStatus.getState().apiMessage(message, messageType)
         }

         return response
      },
      (err) => {
         useApiStatus.getState().apiLoading(false)

         const statusResponse = err.response?.status

         if (statusResponse) { // Si es error del servidor
            useApiStatus.getState().apiMessage(responseCode[err.response?.status], 'error')
         } else {
            useApiStatus.getState().apiMessage(requestCode[err.code], 'error')
         }

         return Promise.reject(err)
      }
   )
}
