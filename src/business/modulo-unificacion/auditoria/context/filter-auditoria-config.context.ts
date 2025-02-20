import { StateCreator } from 'zustand'

type State = {
   fechaAsignacionFilter: Date
}

type Action = {
   setFechaAsignacionFilter: (fechaAsignacion: Date) => void
}

export type FilterAuditoriaConfigSliceState = State & Action

export const filterAuditoriaConfigSlice: StateCreator<FilterAuditoriaConfigSliceState> = (set) => ({
   fechaAsignacionFilter: new Date(),
   setFechaAsignacionFilter: (fechaAsignacion) => {
      set({ fechaAsignacionFilter: fechaAsignacion })
   }
})
