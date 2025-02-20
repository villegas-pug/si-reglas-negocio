import { create } from 'zustand'
import { type AuditoriaSliceState, auditoriaSlice } from './auditoria.context'
import { filterAuditoriaConfigSlice, type FilterAuditoriaConfigSliceState } from './filter-auditoria-config.context'

type ContextState = AuditoriaSliceState & FilterAuditoriaConfigSliceState

export const useAuditoriaAsignacionContext = create<ContextState>()((...rest) => ({
   ...auditoriaSlice(...rest),
   ...filterAuditoriaConfigSlice(...rest)
}))
