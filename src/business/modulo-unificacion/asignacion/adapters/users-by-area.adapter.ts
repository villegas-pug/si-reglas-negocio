import { Usuario } from '../../../../models'

export const adaptUsersByArea = (users: Usuario[], area: string) => {
   const filteredUsers = users
      .filter((user) => user.area === area)
      .map(({ idUsuario, nombres, login, cargo, idOperador }) => ({ idUsuario, nombres, login, cargo, idOperador }))
   return filteredUsers
}
