import { api } from '../../config'

export const deleteReglaNegocio = async (idRN: string) => {
   await api({
      url: `/microservicio-rimreglanegocio/deleteReglaNegocio/${idRN}`,
      method: 'delete'
   })
}
