import { api } from '../../config'
import { Response } from '../../interfaces'
import { Proceso, ReglaNegocio } from '../../models'

export const findReglasNegocioByProceso = async (proceso: Partial<Proceso>) => {
   const { data: { data: ReglaNegocioDb } } = await api<Response<ReglaNegocio[]>>({
      method: 'post',
      url: '/microservicio-rimreglanegocio/findReglasNegocioByProceso',
      data: proceso
   })

   return ReglaNegocioDb
}
