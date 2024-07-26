import { api } from '../config'
import { useAuthStore } from '../stores'

export const RequestTokenInterceptor = () => {
   api.interceptors.request.use((req) => {
      if (req.url?.endsWith('login')) return req

      const token = useAuthStore.getState().token
      req.headers.Authorization = `Bearer ${token}`

      return req
   })
}
