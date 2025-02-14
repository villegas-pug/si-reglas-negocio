import { create } from 'zustand'

import { crearReglaNegocioSlice, type CrearReglaNegocioState } from './crear-regla-negocio.slice'
import { modalReglaNegocioSlice, type ModalReglaNegocioState } from './modal-regla-negocio.slice'
import { asyncTasksSlice, type AsyncTasksState } from './async-tasks.slice'

type ReglaNegocioContextState = CrearReglaNegocioState & ModalReglaNegocioState & AsyncTasksState

export const useReglaNegocioContext = create<ReglaNegocioContextState>()((...rest) => ({
   ...crearReglaNegocioSlice(...rest),
   ...modalReglaNegocioSlice(...rest),
   ...asyncTasksSlice(...rest)
}))
