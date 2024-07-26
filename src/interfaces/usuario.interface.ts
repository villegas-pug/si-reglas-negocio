export interface UsrProcedimiento {

   idUsrProcedimiento: number
   usuario: Usuario
   procedimiento: Procedimiento
   denegado: boolean
   fechaRegistro: Date

}

export interface Usuario {

   idUsuario: string
   nombres: string
   login: string
   usrProcedimiento: UsrProcedimiento[];
   password: string
   dependencia: string
   cargo: string
   grupo: RimGrupo
   area: string
   dni: string
   regimenLaboral: string
   foto: string
   activo: string

}

export interface Procedimiento {

   idProcedimiento: number
   nombre: string
   tipo: TipoProcedimiento
   informacion: string
   descripcion: string
   icono: string
   activo: boolean
   rutaPag: string
   rutaSubpag: string
   secuencia: number
   rutaPrincipal: string
}

type RimGrupo = 'ANALISIS' | 'DEPURACION' | 'ADMINISTRADORES'
export type TipoProcedimiento = 'PAG' | 'SUB_PAG' | 'DYNAMIC_COMPONENT'
