import { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { createReglaNegocio, modifyReglaNegocio, deleteReglaNegocio as deleteReglaNegocioApi } from '../services'

import { useAuthStore, useProcesoStore, useReglaNegocioStore } from '../stores'
import { FormValuesControlMigratorio } from '../interfaces'
import { Dimension } from '../models'
import { useReglaNegocioContext } from '../context'

export const useReglasNegocio = () => {
   const params = useParams()

   const { procesoDb } = useProcesoStore()
   const { userAuth } = useAuthStore()
   const { reglaNegocioInternalDb, findReglasNegocioByProceso } = useReglaNegocioStore()

   const { selectedReglaNegocio, scriptDeteccion, scriptValidacion } = useReglaNegocioContext()

   const procesoOfCurrPath = useMemo(() => {
      const ofCurrPath = params['*']?.split('/')[1]
      if (!ofCurrPath) return
      return procesoDb.find(({ rutaPrincipal }) => rutaPrincipal.includes(ofCurrPath))
   }, [procesoDb])

   // Method's
   const findReglasNegocioByProcesoOfCurrPath = useCallback(() => {
      findReglasNegocioByProceso({ idProceso: procesoOfCurrPath?.idProceso })
   }, [procesoOfCurrPath])

   const saveReglaNegocio = useCallback(async (formValues: FormValuesControlMigratorio) => {
      const { tabla, campos, definicionRegla, dimensionRegla } = formValues
      const dimension: Pick<Dimension, 'idDimension'> = { idDimension: dimensionRegla }

      if (selectedReglaNegocio.idRN) { // Actualiza
         await modifyReglaNegocio({
            idRN: selectedReglaNegocio.idRN,
            tabla,
            campos,
            definicionRegla,
            dimension,
            idRNCtrlCambioDeteccion: selectedReglaNegocio.idCtrlCambioDeteccion,
            scriptDeteccion,
            idRNCtrlCambioValidacion: selectedReglaNegocio.idCtrlCambioValidacion,
            scriptValidacion,
            usuarioCreador: userAuth
         })
      }

      // Nuevo
      if (!selectedReglaNegocio.idRN) {
         await createReglaNegocio({
            tabla,
            campos,
            definicionRegla,
            dimension,
            scriptDeteccion,
            scriptValidacion,
            proceso: procesoOfCurrPath,
            usuarioCreador: userAuth
         })
      }

      findReglasNegocioByProcesoOfCurrPath()
   }, [procesoOfCurrPath, selectedReglaNegocio, scriptDeteccion, scriptValidacion])

   const deleteReglaNegocio = async (idRN: string) => {
      await deleteReglaNegocioApi(idRN)
      findReglasNegocioByProcesoOfCurrPath()
   }

   // Dep's
   const totalReglasOfCurrPath = reglaNegocioInternalDb?.length || 0
   const granTotalValidacionOfCurrPath = reglaNegocioInternalDb.reduce((total, { totalValidacionScript }) => total + totalValidacionScript, 0)
   const granTotalDeteccionOfCurrPath = reglaNegocioInternalDb.reduce((total, { totalDeteccionScript }) => total + totalDeteccionScript, 0)

   return {
      procesoOfCurrPath,
      totalReglasOfCurrPath,
      granTotalValidacionOfCurrPath,
      granTotalDeteccionOfCurrPath,

      findReglasNegocioByProcesoOfCurrPath,
      saveReglaNegocio,
      deleteReglaNegocio
   }
}
