import { StateCreator } from 'zustand'

type State = {
   isOpenModalCrear: boolean
   isOpenModalRunningTasks: boolean
}

type Action = {
   setIsOpenModalCrear: (isOpen: boolean) => void
   setIsOpenModalRunningTasks: (isOpen: boolean) => void
}

export type ModalReglaNegocioState = State & Action

export const modalReglaNegocioSlice: StateCreator<ModalReglaNegocioState> = (set) => ({
   isOpenModalCrear: false,
   isOpenModalRunningTasks: false,
   setIsOpenModalCrear: (isOpen) => set({ isOpenModalCrear: isOpen }),
   setIsOpenModalRunningTasks: (isOpen) => set({ isOpenModalRunningTasks: isOpen })
})
