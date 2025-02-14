import { api } from '../../config'
import { ActualizarReglaNegocioDto } from '../../interfaces'

export const modifyReglaNegocio = async (reglaNegocio: ActualizarReglaNegocioDto) => {
   await api({
      url: '/microservicio-rimreglanegocio/modifyReglaNegocio',
      method: 'put',
      data: reglaNegocio
   })
}
