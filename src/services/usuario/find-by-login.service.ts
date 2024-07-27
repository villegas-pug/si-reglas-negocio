import { api } from '../../config'
import { Response, Usuario } from '../../interfaces'

export const findUsuarioByLogin = async (login: string) => {
   const { data: { data: usuario } } = await api<Response<Usuario>>({
      method: 'get',
      url: `microservicio-usuario/findByLogin/${login}`
   })

   return usuario
}
