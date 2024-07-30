import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { findAllProceso } from '../../services'
import { adaptApiProcesoToInternal } from '../../adapters'
import { useAuthStore } from '../auth'
import { ProcesoInternal } from '../../interfaces'

import { localStorage } from '../../consts'

type State = {
   procesoDb: ProcesoInternal[]
}

type Action = {
   findAllRNProceso: () => Promise<void>
}

export const useProcesoStore = create(
   persist<State & Action>((set) => ({
      procesoDb: [],
      findAllRNProceso: async () => {
         const procesoDb = await findAllProceso()
         const authProcedimientos = useAuthStore.getState().userAuth.usrProcedimiento.map(proc => proc.procedimiento)
         set({ procesoDb: adaptApiProcesoToInternal(procesoDb, authProcedimientos) })
      }
   }), {
      name: localStorage.PROCESOS_KEY
   })
)
