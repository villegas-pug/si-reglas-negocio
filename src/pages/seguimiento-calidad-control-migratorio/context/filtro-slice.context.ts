import { StateCreator } from 'zustand'

type State = {
   dimension: string
}

type Action = {
   setDimension: (dimension: string) => void
}

export type FiltroState = State & Action

export const filtroSeguimientoCalidadCMSlice: StateCreator<FiltroState> = (set) => ({
   dimension: '',
   setDimension: (dimension) => set({ dimension })
})
