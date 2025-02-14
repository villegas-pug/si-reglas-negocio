import { api } from '../../config'
import { Response } from '../../interfaces'
import { ReglaNegocio } from '../../models'

export const findReglaNegocioById = async (idRN: string) => {
   const { data: { data } } = await api<Response<ReglaNegocio>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/findReglaNegocioById',
      params: { idRN }
   })

   return data
}
