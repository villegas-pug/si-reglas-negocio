import { Dimension, Usuario } from '../models'

export interface ActualizarReglaNegocioDto {
   idRN: string
   tabla: string
   campos: string
   dimension: Pick<Dimension, 'idDimension'>
   definicionRegla: string
   idRNCtrlCambioDeteccion: number
   scriptDeteccion: string
   idRNCtrlCambioValidacion: number
   scriptValidacion: string
   usuarioCreador: Usuario
}
