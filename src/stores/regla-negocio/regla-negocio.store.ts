import { create } from 'zustand'
import { Proceso, ReglaNegocioInternal } from '../../interfaces'
import { findReglasNegocioByProceso } from '../../services'
import { adaptApiReglasNegocioToInternal } from '../../adapters/api-reglanegocio.adapter'

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