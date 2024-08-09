import { StateCreator } from 'zustand'

import { ReglaNegocio } from '../../models'

type State = {
   initialValues: Partial<ReglaNegocio>
}

type Action = {
   setInitialValues: (values: Partial<ReglaNegocio>) => void
   resetInitialValues: () => void
}

export type CrearReglaNegocioState = State & Action

export const crearReglaNegocioSlice: StateCreator<State & Action> = (set) => ({
   initialValues: {} as Partial<ReglaNegocio>,
   setInitialValues: (initialValues) => { console.log(initialValues) },
   resetInitialValues: () => set({ initialValues: {} })
})
