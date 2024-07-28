import { ReglaNegocio, ReglaNegocioInternal } from '../interfaces'
import { tipoScript } from '../consts'

const { DETECCION, VALIDACION } = tipoScript

export const adaptApiReglasNegocioToInternal = (reglasNegocio: ReglaNegocio[]): ReglaNegocioInternal[] => {
   let reglasNegocioInternal: ReglaNegocioInternal[] = []

   reglasNegocioInternal = reglasNegocio.map(regla => {
      const deteccion = regla.controlCambios.find(({ tipoScript, activo }) =>
         tipoScript.descripcion === DETECCION && activo
      )

      const validacion = regla.controlCambios.find(({ tipoScript, activo }) =>
         tipoScript.descripcion === VALIDACION && activo
      )

      const deteccionScript = deteccion?.registrosEjecucionScript
         .sort((a, b) => a.idRegistroEjecucion < b.idRegistroEjecucion ? 1 : 0)
         .slice(0, 1)[0]

      const validacionScript = validacion?.registrosEjecucionScript
         .sort((a, b) => a.idRegistroEjecucion < b.idRegistroEjecucion ? 1 : 0)
         .slice(0, 1)[0]

      return {
         ...regla,
         deteccionScript: deteccion?.script || '',
         validacionScript: validacion?.script || '',

         totalDeteccionScript: deteccionScript?.resultado || 0,
         totalValidacionScript: validacionScript?.resultado || 0

      }
   })

   return reglasNegocioInternal
}
