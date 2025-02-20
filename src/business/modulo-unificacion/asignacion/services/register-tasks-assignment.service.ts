import { api } from '../../../../config'
import { RegisterAssignmentDto } from './../interfaces/register-assignment.interface'

export const registerTasksAssignment = async (assigns: Partial<RegisterAssignmentDto>[]) => {
   await api({
      method: 'post',
      url: 'microservicio-rimcue/registerTasksAssignment',
      data: assigns
   })
}
