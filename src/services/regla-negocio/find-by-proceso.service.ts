import { api } from '../../config'
import { Proceso, ReglaNegocio, Response } from '../../interfaces'

export const findReglasNegocioByProceso = async (proceso: Partial<Proceso>) => {
   const { data: { data: ReglaNegocioDb } } = await api<Response<ReglaNegocio[]>>({
      method: 'post',
      url: '/microservicio-rimreglanegocio/findReglasNegocioByProceso',
      data: proceso
   })

   return ReglaNegocioDb
}
