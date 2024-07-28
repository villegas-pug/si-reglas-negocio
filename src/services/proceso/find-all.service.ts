import { api } from '../../config'
import { Proceso, Response } from '../../interfaces'

export const findAllProceso = async () => {
   const { data: { data: procesoDb } } = await api<Response<Proceso[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/findAllRNProceso'
   })

   return procesoDb
}
