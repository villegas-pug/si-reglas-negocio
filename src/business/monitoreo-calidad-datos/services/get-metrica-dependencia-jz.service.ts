import { api } from '../../config'
import { Response } from '../../interfaces'
import { MetricaDependenciaJZ } from '../../models'

export const getMetricasDependenciaJefeZonal = async (idProceso: number, idJefatura: string) => {
   const { data: { data } } = await api<Response<MetricaDependenciaJZ[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/getMetricasDependenciaJefeZonal',
      params: { idProceso, idJefatura }
   })

   return data
}
