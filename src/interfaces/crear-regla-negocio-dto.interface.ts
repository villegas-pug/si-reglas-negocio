import { Dimension, Proceso, Usuario } from '../models'

export interface CrearReglaNegocioDto {
   tabla: string
   campos: string
   dimension: Pick<Dimension, 'idDimension'>
   definicionRegla: string
   scriptValidacion: string
   scriptDeteccion: string
   proceso?: Proceso
   usuarioCreador?: Usuario
}
