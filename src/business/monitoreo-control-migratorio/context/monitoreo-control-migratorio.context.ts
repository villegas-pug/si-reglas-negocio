import { StateCreator } from 'zustand'

import { HallazgoControlMigratorioInternal } from '../../../models'
import { PaginacionHallazgos } from '../../../interfaces'
import { findAllHallazgosByPaginacion } from '../../../services'
import { adaptHallazgoControlMigratorioToInternal } from '../../../adapters'
import { useAuthStore } from '../../../stores/auth'

type State = {
   hallazgosControlMigratorio: HallazgoControlMigratorioInternal[]
   totalHallazgosControlMigratorio: number
}

type Action = {
   findAllHallazgosByPaginacion: (paginacion: PaginacionHallazgos) => Promise<void>
}

export type MonitoreoControlMigratorioState = Action & State

export const monitoreoControlMigratorioSlice: StateCreator<State & Action> = (set) => ({
   hallazgosControlMigratorio: [],
   totalHallazgosControlMigratorio: 0,
   findAllHallazgosByPaginacion: async ({ idJefatura: _, ...rest }) => {
      const idJefatura = useAuthStore.getState().userAuth.idJefatura
      const hallazgos = await findAllHallazgosByPaginacion({ idJefatura, ...rest })
      set({
         hallazgosControlMigratorio: adaptHallazgoControlMigratorioToInternal(hallazgos),
         totalHallazgosControlMigratorio: hallazgos[0].nTotalRows || 0
      })
   }
})
