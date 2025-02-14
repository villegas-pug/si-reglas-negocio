import { StateCreator } from 'zustand'
import { RangoFechas } from '../../../interfaces'

type State = {
   rangoFechasFilter: RangoFechas
}

type Action = {
   setRangoFechasFilter: (rango: RangoFechas) => void
}

export type FiltroMonitoreoControlMigratorioState = State & Action

export const filtroMonitoreoControlMigratorioSlice: StateCreator<FiltroMonitoreoControlMigratorioState> = (set) => ({
   rangoFechasFilter: {} as RangoFechas,
   setRangoFechasFilter: (rango) => set({ rangoFechasFilter: rango })
})
