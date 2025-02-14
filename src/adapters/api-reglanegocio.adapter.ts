import { EjecucionScriptDeteccion, ReglaNegocio, ReglaNegocioInternal } from './../models'

import { tipoScript } from '../consts'

const { DETECCION, VALIDACION } = tipoScript

export const adaptApiReglasNegocioToInternal = (reglasNegocio: ReglaNegocio[]): ReglaNegocioInternal[] => {
   let reglasNegocioInternal: Omit<ReglaNegocioInternal, 'controlCambios'>[] = []

   reglasNegocioInternal = reglasNegocio.map(regla => {
      const { controlCambios, ...rest } = regla

      // Script `DETECCION`
      const deteccion = controlCambios.find(({ tipoScript, activo }) =>
         tipoScript.descripcion === DETECCION && activo
      )

      // Script `VALIDACION`
      const validacion = controlCambios.find(({ tipoScript, activo }) =>
         tipoScript.descripcion === VALIDACION && activo
      )

      // Resultado script `DETECCION`
      const deteccionScript = deteccion?.registrosEjecucionScript
         .sort((a, b) => a.idRegistroEjecucion < b.idRegistroEjecucion ? 1 : -1)
         .slice(0, 1)[0]

      // Resultado script `VALIDACION`
      const validacionScript = validacion?.registrosEjecucionScript
         .sort((a, b) => a.idRegistroEjecucion < b.idRegistroEjecucion ? 1 : -1)
         .slice(0, 1)[0]

      // Historial ejecución script ...
      const ejecucionScriptDeteccion: EjecucionScriptDeteccion[] = deteccion?.registrosEjecucionScript
         .sort((a, b) => a.idRegistroEjecucion - b.idRegistroEjecucion) || []

      return {
         ...rest,
         idCtrlCambioDeteccion: deteccion?.idRNControlCambio || 0,
         idCtrlCambioValidacion: validacion?.idRNControlCambio || 0,
         deteccionScript: deteccion?.script || '',
         runtimeDeteccion: deteccion?.runtime || 0,
         validacionScript: validacion?.script || '',
         totalDeteccionScript: deteccionScript?.resultado || 0,
         totalValidacionScript: validacionScript?.resultado || 0,
         ejecucionScriptDeteccion,
         resultSet: deteccion?.resultSet || ''
      }
   })

   return reglasNegocioInternal
}
