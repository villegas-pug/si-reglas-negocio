import { AxiosResponse } from 'axios'

import { useApiStatusStore, useAuthStore } from '../stores'

import { api } from '../config'
import { HeaderResponse, Response } from '../interfaces'
import { requestCode, responseCode } from '../consts'

export const ApiStatusInterceptor = () => {
   api.interceptors.request.use(
      async (request) => {
         useApiStatusStore.getState().apiReset()
         useApiStatusStore.getState().apiLoading(true)
         return request
      }
   )

   api.interceptors.response.use(
      (response: AxiosResponse<Response<{}>>) => {
         useApiStatusStore.getState().apiLoading(false)

         if (response.config.url?.endsWith('login')) { // Login response
            const userAuth = (response.headers as unknown as HeaderResponse).usernameauth
            useApiStatusStore.getState().apiMessage(`¡Bienvenido ${userAuth}!`, 'success')
         } else { // Api response
            const { message, messageType } = response.data
            useApiStatusStore.getState().apiMessage(message, messageType)
         }

         return response
      },
      (err) => {
         useApiStatusStore.getState().apiLoading(false)

         const statusResponse = err.response?.status

         if (statusResponse) { // Respuesta del servidor
            const status = err.response?.status

            // 403: '¡Acceso no autorizado!'
            if (status === 403) useAuthStore.getState().logout()
            useApiStatusStore.getState().apiMessage(responseCode[status], 'error')
         } else {
            useApiStatusStore.getState().apiMessage(requestCode[err.code], 'error')
         }

         return Promise.reject(err)
      }
   )
}
