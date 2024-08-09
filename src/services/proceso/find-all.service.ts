import { api } from '../../config'
import { Response } from '../../interfaces'
import { Proceso } from '../../models'

export const findAllProceso = async () => {
   const { data: { data: procesoDb } } = await api<Response<Proceso[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/findAllRNProceso'
   })

   return procesoDb
}
