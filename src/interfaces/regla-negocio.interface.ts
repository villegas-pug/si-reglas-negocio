import { Proceso } from './proceso.interface'
import { Usuario } from './usuario.interface'

export interface ReglaNegocio {
   idRN: string
   definicionRegla: string
   tablas: string
   campos: string
   controlCambios: ControlCambio[]
   proceso: Proceso
   dimensionRegla: DimensionRegla
   statusRegla: StatusRegla
   fechaCreacion: Date
   activo: boolean
}

export interface ControlCambio {
   idRNControlCambio: number
   registrosEjecucionScript: RegistrosEjecucionScript[]
   usuarioCreador: Usuario
   fechaCreacion: Date
   fechaModificacion: Date
   script: string
   activo: boolean
   observaciones: string
   tipoScript: TipoScript
}

export interface TipoScript {
   idTipoScript: number
   descripcion: string
   activo: boolean
}

export interface RegistrosEjecucionScript {
   idRegistroEjecucion: number
   resultado: number
   fechaEjecucion: Date
   activo: boolean
}

export interface DimensionRegla {
   idDimension: number
   nombre: string
   activo: boolean
}

export interface StatusRegla {
   idStatus: number
   nombre: string
   activo: boolean
}

export interface ReglaNegocioInternal extends ReglaNegocio {

   // ControlCambio
   definicionRegla: string
   deteccionScript: string
   validacionScript: string

   // RegistrosEjecucionScript
   totalDeteccionScript: number
   totalValidacionScript: number

}
