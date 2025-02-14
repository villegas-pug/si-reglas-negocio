import { api } from '../../../../config'
import { Response } from '../../../../interfaces'
import { TipoAsignacion } from '../models'

export const findAllTipoAsignacion = async () => {
   const { data: { data } } = await api<Response<TipoAsignacion[]>>({
      method: 'get',
      url: 'microservicio-rimcue/findAllTipoAsignacion'
   })

   return data
}
