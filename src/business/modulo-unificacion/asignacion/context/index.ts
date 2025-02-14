import { create } from 'zustand'
import { type AsignacionState, AsignacionSlice } from './asignacion.context'

type ContextState = AsignacionState

export const useAsignacionContext = create<ContextState>()((...rest) => ({
   ...AsignacionSlice(...rest)
}))
