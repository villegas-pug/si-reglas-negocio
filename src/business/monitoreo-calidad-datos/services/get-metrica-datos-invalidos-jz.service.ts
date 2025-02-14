import { api } from '../../config'
import { Response } from '../../interfaces'
import { MetricaDatoInvalidoJZ } from '../../models'

export const getMetricasDatosInvalidosJefeZonal = async (idProceso: number, idJefatura: string) => {
   const { data: { data } } = await api<Response<MetricaDatoInvalidoJZ[]>>({
      method: 'get',
      url: '/microservicio-rimreglanegocio/getMetricasDatosInvalidosJefeZonal',
      params: { idProceso, idJefatura }
   })

   return data
}
