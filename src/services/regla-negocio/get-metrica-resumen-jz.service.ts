import { api } from '../../config'
import { Response } from '../../interfaces'
import { MetricaResumenJZ } from '../../models'

export const getMetricasResumenJefeZonal = async (idJefatura: string) => {
   const { data: { data } } = await api<Response<MetricaResumenJZ[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/getMetricasResumenJefeZonal',
      params: { idJefatura }
   })

   return data
}
