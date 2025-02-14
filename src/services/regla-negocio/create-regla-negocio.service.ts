import { api } from '../../config'
import { CrearReglaNegocioDto } from '../../interfaces'

export const createReglaNegocio = async (reglaNegocio: CrearReglaNegocioDto) => {
   await api({
      url: '/microservicio-rimreglanegocio/createReglaNegocio',
      method: 'post',
      data: reglaNegocio
   })
}
