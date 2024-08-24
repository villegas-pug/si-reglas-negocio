import { PaginacionHallazgos } from './../../interfaces/paginacion-hallazgo.interface'
import { api } from '../../config'
import { Response } from '../../interfaces'
import { HallazgoControlMigratorio } from '../../models'

export const findAllHallazgosByPaginacion = async (paginacion: PaginacionHallazgos) => {
   const { data: { data } } = await api<Response<HallazgoControlMigratorio[]>>({
      method: 'post',
      url: '/microservicio-rimreglanegocio/findAllHallazgosByPaginacion',
      data: paginacion
   })

   return data
}
