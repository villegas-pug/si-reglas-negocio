import { Procedimiento, Proceso, ProcesoInternal } from '../interfaces'

type RutaPrincipalMap = {[key: string]: string}

export const adaptApiProcesoToInternal = (apiProceso: Proceso[], apiProcedimientos: Procedimiento[]): ProcesoInternal[] => {
   const rutaPrincipalMap: RutaPrincipalMap = apiProcedimientos
      .filter(proc => proc.tipo === 'SUB_PAG')
      .reduce((map, { nombre, rutaPrincipal }) => (map[nombre] = rutaPrincipal, map), {} as RutaPrincipalMap)

   const procesoInternalDb: ProcesoInternal[] = apiProceso.map((proceso) => {
      return {
         ...proceso,
         rutaPrincipal: rutaPrincipalMap[proceso.nombre]
      }
   })

   return procesoInternalDb
}
