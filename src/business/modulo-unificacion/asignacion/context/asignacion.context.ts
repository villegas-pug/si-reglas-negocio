import { Key } from 'react'
import { StateCreator } from 'zustand'

import { useAuthStore } from '../../../../stores/auth'
import { adaptUsersByArea } from '../adapters'
import { AvailableUsers } from '../interfaces/available-user.interface'
import { TipoAsignacion } from '../models'
import { findAllTipoAsignacion } from '../services'

type State = {
   availableUsers: AvailableUsers[]
   selectedIdsOperador: Key[]
   tipoAsignacionDb: TipoAsignacion[]
}

type Action = {
   addIdsOperadorToSelection: (users: Key[]) => void
   resetSelectedIdsOperador: () => void
   findAllTipoAsignacion: () => Promise<void>
}

export type AsignacionState = State & Action

export const asignacionSlice: StateCreator<AsignacionState> = (set) => ({
   availableUsers: adaptUsersByArea(useAuthStore.getState().users, 'SRIM'),
   selectedIdsOperador: [],
   tipoAsignacionDb: [],
   addIdsOperadorToSelection: (ids) => set({ selectedIdsOperador: ids }),
   resetSelectedIdsOperador: () => { set({ selectedIdsOperador: [] }) },
   findAllTipoAsignacion: async () => {
      const tipoAsignacionDb = await findAllTipoAsignacion()
      set({ tipoAsignacionDb })
   }
})
