import { Usuario } from '../../../../models'

export type AvailableUsers = Pick<Usuario, 'idUsuario' | 'nombres' | 'login' | 'cargo' | 'idOperador'>
