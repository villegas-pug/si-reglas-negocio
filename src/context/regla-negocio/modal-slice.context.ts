import { StateCreator } from 'zustand'

type State = {
   isOpenModal: boolean
}

type Action = {
   setIsOpenModal: (isOpen: boolean) => void
}

export type ModalReglaNegocioState = State & Action

export const modalReglaNegocioSlice: StateCreator<ModalReglaNegocioState> = (set) => ({
   isOpenModal: false,
   setIsOpenModal: (isOpen) => set({ isOpenModal: isOpen })
})
