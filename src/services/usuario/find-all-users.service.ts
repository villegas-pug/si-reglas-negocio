import { api } from '../../config'
import { Response } from '../../interfaces'
import { Usuario } from '../../models'

export const findAllUsers = async () => {
   const { data: { data } } = await api<Response<Usuario[]>>({
      method: 'get',
      url: 'microservicio-usuario/findAll'
   })

   return data
}
