import { api } from '../../config'

export const createOneRegistroEjecucionScript = async (idRNControlCambio: number) => {
   await api({
      method: 'post',
      url: `/microservicio-rimreglanegocio/createOneRegistroEjecucionScript/${idRNControlCambio}`
   })
}
