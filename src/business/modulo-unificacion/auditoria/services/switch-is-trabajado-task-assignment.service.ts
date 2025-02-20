import { api } from '../../../../config'
import { UpdateAssignmentDto } from './../interfaces'

export const switchIsTrabajadoTaskAssignment = async (assign: Partial<UpdateAssignmentDto>) => {
   await api({
      method: 'patch',
      url: 'microservicio-rimcue/switchIsTrabajadoTaskAssignment',
      data: { ...assign }
   })
}
