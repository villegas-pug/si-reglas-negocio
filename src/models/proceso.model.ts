export interface Proceso {

   idProceso: number
   nombre: string
   descripcion: string
   totalRegCorrectos: number
   totalRegIncorrectos: number
   totalRegistros: number
   totalReglas: number
   activo: boolean
   fechaCreacion: Date

}

export interface ProcesoInternal extends Proceso {
   idProcedimiento: number
   rutaPrincipal: string
}
