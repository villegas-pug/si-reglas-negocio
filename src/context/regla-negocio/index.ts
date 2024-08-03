import { create } from 'zustand'

import { crearReglaNegocioSlice, type CrearReglaNegocioState } from './crear-slice.context'
import { modalReglaNegocioSlice, type ModalReglaNegocioState } from './modal-slice.context'

type ReglaNegocioContextState = CrearReglaNegocioState & ModalReglaNegocioState

export const useReglaNegocioContext = create<ReglaNegocioContextState>()((...rest) => ({
   ...crearReglaNegocioSlice(...rest),
   ...modalReglaNegocioSlice(...rest)
}))
