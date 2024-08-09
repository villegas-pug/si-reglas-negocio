import RegistrosIconsistentes from '../db/registros-iconsistentes.db.json'
import { ControlHallazgo } from '../interfaces'

export const useControlHallazgos = () => {
   const hallazgosDb: ControlHallazgo[] = RegistrosIconsistentes

   return {
      hallazgosDb
   }
}
