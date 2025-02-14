import { api } from '../../config'

/* export const cancelAxios = axios.CancelToken.source() */

export const createOneRegistroValidacionScript = async (idRNControlCambio: number) => {
   await api({
      method: 'post',
      url: '/microservicio-rimreglanegocio/createRegistroEjecucionScriptValidacion',
      params: { idRNControlCambio }
   })
}
