import { Procedimiento, Proceso, ProcesoInternal } from '../models'

type RutaPrincipalMap = {[key: string]: { rutaPrincipal: string, idProcedimiento: number }}

export const adaptApiProcesoToInternal = (apiProceso: Proceso[], apiProcedimientos: Procedimiento[]): ProcesoInternal[] => {
   const rutaPrincipalMap: RutaPrincipalMap = apiProcedimientos
      .filter(proc => proc.tipo === 'SUB_PAG')
      .reduce((map, { nombre, rutaPrincipal, idProcedimiento }) => (map[nombre] = { rutaPrincipal, idProcedimiento }, map), {} as RutaPrincipalMap)

   const procesoInternalDb: ProcesoInternal[] = apiProceso.map((proceso) => {
      return {
         ...proceso,
         idProcedimiento: rutaPrincipalMap[proceso.nombre].idProcedimiento,
         rutaPrincipal: rutaPrincipalMap[proceso.nombre].rutaPrincipal
      }
   })

   return procesoInternalDb
}
