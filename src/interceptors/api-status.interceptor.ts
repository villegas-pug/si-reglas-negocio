import { AxiosResponse } from 'axios'

import { useApiStatusStore } from '../stores'

import { api } from '../config'
import { HeaderResponse, Response } from '../interfaces'
import { requestCode, responseCode } from '../consts'
import { sleep } from '../helpers'

export const ApiStatusInterceptor = () => {
   api.interceptors.request.use(
      async (request) => {
         useApiStatusStore.getState().apiReset()
         useApiStatusStore.getState().apiLoading(true)
         await sleep(1)
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

         if (statusResponse) { // Si es error del servidor
            useApiStatusStore.getState().apiMessage(responseCode[err.response?.status], 'error')
         } else {
            useApiStatusStore.getState().apiMessage(requestCode[err.code], 'error')
         }

         return Promise.reject(err)
      }
   )
}
