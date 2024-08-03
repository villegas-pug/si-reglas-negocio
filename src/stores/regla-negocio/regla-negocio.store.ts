import { create } from 'zustand'
import { Proceso, ReglaNegocioInternal } from '../../models'
import { findReglasNegocioByProceso } from '../../services'
import { adaptApiReglasNegocioToInternal } from '../../adapters'

type State = {
   reglaNegocio: ReglaNegocioInternal
   reglaNegocioInternalDb: ReglaNegocioInternal[]
}

type Action = {
   findReglasNegocioByProceso: (proceso : Partial<Proceso>) => Promise<void>
}

export const useReglaNegocioStore = create<State & Action>((set) => ({
   reglaNegocio: {} as ReglaNegocioInternal,
   reglaNegocioInternalDb: [],
   findReglasNegocioByProceso: async (proceso) => {
      const reglasNegocio = await findReglasNegocioByProceso(proceso)
      set({ reglaNegocioInternalDb: adaptApiReglasNegocioToInternal(reglasNegocio) })
   }
}))
