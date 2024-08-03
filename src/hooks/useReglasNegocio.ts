import { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useProcesoStore, useReglaNegocioStore } from '../stores'

export const useReglasNegocio = () => {
   const params = useParams()

   const { procesoDb } = useProcesoStore()
   const { reglaNegocioInternalDb, findReglasNegocioByProceso } = useReglaNegocioStore()

   const procesoOfCurrPath = useMemo(() => {
      const ofCurrPath = params['*']?.split('/')[1]
      if (!ofCurrPath) return
      return procesoDb.find(({ rutaPrincipal }) => rutaPrincipal.includes(ofCurrPath))
   }, [procesoDb])

   // Handler's
   const findReglasNegocioByProcesoOfCurrPath = useCallback(() => {
      findReglasNegocioByProceso({ idProceso: procesoOfCurrPath?.idProceso })
   }, [procesoOfCurrPath])

   // Dep's
   const totalReglasOfCurrPath = reglaNegocioInternalDb?.length || 0
   const granTotalValidacionOfCurrPath = reglaNegocioInternalDb.reduce((total, { totalValidacionScript }) => total + totalValidacionScript, 0)
   const granTotalDeteccionOfCurrPath = reglaNegocioInternalDb.reduce((total, { totalDeteccionScript }) => total + totalDeteccionScript, 0)

   return {
      procesoOfCurrPath,
      totalReglasOfCurrPath,
      granTotalValidacionOfCurrPath,
      granTotalDeteccionOfCurrPath,

      findReglasNegocioByProcesoOfCurrPath
   }
}
