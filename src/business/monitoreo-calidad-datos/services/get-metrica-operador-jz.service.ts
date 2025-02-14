import { api } from '../../config'
import { Response } from '../../interfaces'
import { MetricaOperadorJZ } from '../../models'

export const getMetricasOperadorJefeZonal = async (idProceso: number, idJefatura: string) => {
   const { data: { data } } = await api<Response<MetricaOperadorJZ[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/getMetricasOperadorJefeZonal',
      params: { idProceso, idJefatura }
   })

   return data
}
