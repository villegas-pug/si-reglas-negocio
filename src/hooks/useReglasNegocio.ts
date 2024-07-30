import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { useProcesoStore, useReglaNegocioStore } from '../stores'

export const useReglasNegocio = () => {
   const params = useParams()

   const { procesoDb } = useProcesoStore()
   const { reglaNegocioInternalDb, findReglasNegocioByProceso } = useReglaNegocioStore()

   // Handler's
   const findReglasNegocioByProcesoOfCurrPath = useCallback(() => {
      const procesoOfCurrPath = params['*']?.split('/')[1]

      if (!procesoOfCurrPath) return

      const proceso = procesoDb.find(({ rutaPrincipal }) => rutaPrincipal.includes(procesoOfCurrPath))

      findReglasNegocioByProceso({ idProceso: proceso?.idProceso })
   }, [procesoDb])

   // Dep's
   const totalReglasOfCurrPath = reglaNegocioInternalDb?.length || 0
   const granTotalValidacionOfCurrPath = reglaNegocioInternalDb.reduce((total, { totalValidacionScript }) => total + totalValidacionScript, 0)
   const granTotalDeteccionOfCurrPath = reglaNegocioInternalDb.reduce((total, { totalDeteccionScript }) => total + totalDeteccionScript, 0)

   return {
      totalReglasOfCurrPath,
      granTotalValidacionOfCurrPath,
      granTotalDeteccionOfCurrPath,

      findReglasNegocioByProcesoOfCurrPath
   }
}
