import { useEffect, useMemo } from 'react'
import { useAuthStore } from '../stores'
import { Procedimiento } from '../interfaces'

export const useAuthComponents = () => {
   const { loginAuth, userAuth, findByLogin } = useAuthStore()

   useEffect(() => { findByLogin(loginAuth) }, [loginAuth])

   // ► Páginas autorizadas ...
   const authPag: Procedimiento[] = useMemo(() => {
      const { usrProcedimiento } = userAuth

      const pag: Procedimiento[] = []

      usrProcedimiento.forEach(({ procedimiento }) => {
         if (procedimiento.tipo !== 'DYNAMIC_COMPONENT') {
            pag.push(procedimiento)
         }
      })

      return pag
   }, [userAuth])

   return {
      authPag
   }
}
