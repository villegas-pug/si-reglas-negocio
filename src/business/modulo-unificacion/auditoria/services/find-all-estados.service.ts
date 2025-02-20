import { api } from '../../../../config'
import { Response } from '../../../../interfaces'
import { EstadoAsignacion } from '../models'

export const findAllEstados = async () => {
   const { data: { data } } = await api<Response<EstadoAsignacion[]>>({
      method: 'get',
      url: 'microservicio-rimcue/findAllEstados'
   })

   return data
}
