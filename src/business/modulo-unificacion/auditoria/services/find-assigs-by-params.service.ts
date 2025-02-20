import { api } from '../../../../config'
import { Response } from '../../../../interfaces'
import { RegisterAssignmentDto } from '../../asignacion/interfaces'
import { Asignacion } from '../../asignacion/models'

export const findAssigsByParams = async (params: Partial<RegisterAssignmentDto>) => {
   const { data: { data } } = await api<Response<Asignacion[]>>({
      method: 'post',
      url: 'microservicio-rimcue/findAssigsByParams',
      data: { ...params }
   })

   return data
}
