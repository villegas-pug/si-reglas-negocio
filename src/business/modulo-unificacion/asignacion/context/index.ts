import { create } from 'zustand'
import { type AsignacionState, asignacionSlice } from './asignacion.context'

type ContextState = AsignacionState

export const useAsignacionContext = create<ContextState>()((...rest) => ({
   ...asignacionSlice(...rest)
}))
