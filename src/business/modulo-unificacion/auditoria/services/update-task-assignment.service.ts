import { api } from '../../../../config'
import { Response } from '../../../../interfaces'
import { UpdateAssignmentDto } from '../interfaces'

export const updateTaskAssignment = async (assign: UpdateAssignmentDto) => {
   await api<Response<{}>>({
      method: 'put',
      url: 'microservicio-rimcue/updateTaskAssignment',
      data: { ...assign }
   })
}
