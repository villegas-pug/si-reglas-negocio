import { api } from '../../../../config'
import { Response } from '../../../../interfaces'
import { TipoJustificacion } from '../models'

export const findAllTipoJustificaciones = async () => {
   const { data: { data } } = await api<Response<TipoJustificacion[]>>({
      method: 'get',
      url: 'microservicio-rimcue/findAllTipoJustificaciones'
   })

   return data
}
