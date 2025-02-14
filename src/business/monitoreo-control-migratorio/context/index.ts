import { create } from 'zustand'
import {
   filtroMonitoreoControlMigratorioSlice,
   type FiltroMonitoreoControlMigratorioState
} from './filtro-monitoreo-control-migratorio.context'
import { monitoreoControlMigratorioSlice, MonitoreoControlMigratorioState } from './monitoreo-control-migratorio.context'

type ContextState = FiltroMonitoreoControlMigratorioState & MonitoreoControlMigratorioState

export const useMonitoreoControlMigratorioContext = create<ContextState>()((...rest) => ({
   ...filtroMonitoreoControlMigratorioSlice(...rest),
   ...monitoreoControlMigratorioSlice(...rest)
}))
