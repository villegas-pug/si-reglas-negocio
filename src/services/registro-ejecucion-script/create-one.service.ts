import { api } from '../../config'

/* export const cancelAxios = axios.CancelToken.source() */

export const createOneRegistroEjecucionScript = async (idProceso: number, idRNControlCambio: number) => {
   await api({
      method: 'post',
      url: `/microservicio-rimreglanegocio/createOneRegistroEjecucionScript/${idProceso}/${idRNControlCambio}`
      /* cancelToken: cancelAxios.token */
   })
}
