import { Proceso } from './proceso.model'
import { Usuario } from './usuario.model'

export interface ReglaNegocio {
   idRN: string
   definicionRegla: string
   tablas: string
   campos: string
   controlCambios: ControlCambio[]
   proceso: Proceso
   dimensionRegla: Dimension
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
   resultSet: string
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

export interface Dimension {
   idDimension: number
   nombre: string
   activo: boolean
}

export interface StatusRegla {
   idStatus: number
   nombre: string
   activo: boolean
}

export interface ReglaNegocioInternal extends Omit<ReglaNegocio, 'controlCambios'> {

   // ControlCambio
   idCtrlCambioDeteccion: number
   idCtrlCambioValidacion: number
   definicionRegla: string
   deteccionScript: string
   validacionScript: string

   // RegistrosEjecucionScript
   totalDeteccionScript: number
   totalValidacionScript: number

   ejecucionScriptDeteccion: EjecucionScriptDeteccion[]
   resultSet: string

}

export interface EjecucionScriptDeteccion extends RegistrosEjecucionScript {

}
