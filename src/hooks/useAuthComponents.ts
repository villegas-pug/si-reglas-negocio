import { useMemo } from 'react'

import { useAuthStore } from '../stores'
import { Procedimiento } from '../interfaces'

export const useAuthComponents = () => {
   const { userAuth } = useAuthStore()

   // ► Páginas autorizados ...
   const authPag: Procedimiento[] = useMemo(() => {
      const { usrProcedimiento } = userAuth

      const pag: Procedimiento[] = []

      usrProcedimiento?.forEach(({ procedimiento }) => {
         if (procedimiento.tipo !== 'DYNAMIC_COMPONENT') {
            pag.push(procedimiento)
         }
      })

      return pag
   }, [userAuth])

   // ► Diccionario de procedimientos autorizados por `key: sRuta` ...
   const authComponentsMappedByPath = useMemo(() => {
      if (!userAuth) return {}

      const { usrProcedimiento } = userAuth

      const mapPag: { [key: string]: Procedimiento[] } = {}
      usrProcedimiento?.forEach(({ procedimiento }) => {
         if (procedimiento.tipo === 'PAG') return
         const { rutaPag, ...rest } = procedimiento
         if (!mapPag[rutaPag]) mapPag[rutaPag] = [rest as Procedimiento]
         else mapPag[rutaPag].push(rest as Procedimiento)
      })

      return mapPag
   }, [])

   return {
      authPag,
      authComponentsMappedByPath
   }
}
