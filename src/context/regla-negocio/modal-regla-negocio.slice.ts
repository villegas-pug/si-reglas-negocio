import { StateCreator } from 'zustand'

type State = {
   isOpenModalCrear: boolean
   isOpenModalValidacion: boolean
   isOpenModalDeteccion: boolean
   isOpenModalRunningTasks: boolean
}

type Action = {
   setIsOpenModalCrear: (isOpen: boolean) => void
   setIsOpenModalScriptValidacion: (isOpen: boolean) => void
   setIsOpenModalScriptDeteccion: (isOpen: boolean) => void
   setIsOpenModalRunningTasks: (isOpen: boolean) => void
}

export type ModalReglaNegocioState = State & Action

export const modalReglaNegocioSlice: StateCreator<ModalReglaNegocioState> = (set) => ({
   isOpenModalCrear: false,
   isOpenModalRunningTasks: false,
   isOpenModalDeteccion: false,
   isOpenModalValidacion: false,
   setIsOpenModalCrear: (isOpen) => set({ isOpenModalCrear: isOpen }),
   setIsOpenModalRunningTasks: (isOpen) => set({ isOpenModalRunningTasks: isOpen }),
   setIsOpenModalScriptDeteccion: (isOpen) => set({ isOpenModalDeteccion: isOpen }),
   setIsOpenModalScriptValidacion: (isOpen) => set({ isOpenModalValidacion: isOpen })

})
