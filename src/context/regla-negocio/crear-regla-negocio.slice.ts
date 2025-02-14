import { StateCreator } from 'zustand'

import { ReglaNegocioInternal } from '../../models'

type State = {
   selectedReglaNegocio: ReglaNegocioInternal
   scriptValidacion: string
   scriptDeteccion: string
}

type Action = {
   setSelectedReglaNegocio: (selectedReglaNegocio: ReglaNegocioInternal) => void
   resetSelectedReglaNegocio: () => void
   setScriptDeteccion: (script: string) => void
   setScriptValidacion: (script: string) => void
}

export type CrearReglaNegocioState = State & Action

export const crearReglaNegocioSlice: StateCreator<State & Action> = (set) => ({
   selectedReglaNegocio: {} as ReglaNegocioInternal,
   scriptDeteccion: '',
   scriptValidacion: '',
   setSelectedReglaNegocio: (selectedReglaNegocio) => set({ selectedReglaNegocio }),
   resetSelectedReglaNegocio: () => {
      set({
         selectedReglaNegocio: {} as ReglaNegocioInternal,
         scriptDeteccion: '',
         scriptValidacion: ''
      })
   },
   setScriptDeteccion: (script) => set({ scriptDeteccion: script }),
   setScriptValidacion: (script) => set({ scriptValidacion: script })
})
