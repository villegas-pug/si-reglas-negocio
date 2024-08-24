import { create } from 'zustand'

import { crearReglaNegocioSlice, type CrearReglaNegocioState } from './crear-slice.context'
import { modalReglaNegocioSlice, type ModalReglaNegocioState } from './modal-slice.context'
import { asyncTasksSlice, type AsyncTasksState } from './async-tasks-slice.context'

type ReglaNegocioContextState = CrearReglaNegocioState & ModalReglaNegocioState & AsyncTasksState

export const useReglaNegocioContext = create<ReglaNegocioContextState>()((...rest) => ({
   ...crearReglaNegocioSlice(...rest),
   ...modalReglaNegocioSlice(...rest),
   ...asyncTasksSlice(...rest)

}))
