import { api } from '../../config'
import { Response } from '../../interfaces'
import { Dimension } from '../../models'

export const findAllRNDimension = async () => {
   const { data: { data } } = await api<Response<Dimension[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/findAllRNDimension'
   })

   return data
}
