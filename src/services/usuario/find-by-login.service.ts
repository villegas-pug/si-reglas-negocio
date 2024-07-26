import { api } from '../../config'
import { Response, Usuario } from '../../interfaces'

export const findUsuarioByLogin = async (login: string) => {
   const { data: { data: usuario, messageType } } = await api<Response<Usuario>>({
      method: 'get',
      url: `microservicio-usuario/findByLogin/${login}`
   })

   console.log({ messageType })

   return usuario
}
