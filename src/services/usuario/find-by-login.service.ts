import { api } from '../../config'
import { Response } from '../../interfaces'
import { Usuario } from '../../models'

export const findUsuarioByLogin = async (login: string) => {
   const { data: { data: usuario } } = await api<Response<Usuario>>({
      method: 'get',
      url: `microservicio-usuario/findByLogin/${login}`
   })

   return usuario
}
