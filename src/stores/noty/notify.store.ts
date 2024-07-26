import { create } from 'zustand'
import { Message } from '../../interfaces'

type State = {
   isLoading: boolean
   message: string
   type: Message
}

type Action = {
   notifyLoading: (status: boolean) => void
   notifyMessage: (msj: string, type: Message) => void
   notifyReset: () => void
}

export const useNotifyStore = create<State & Action>((set) => ({

   isLoading: false,
   message: '',
   type: 'info',

   notifyLoading: (status) => set({ isLoading: status }),
   notifyMessage: (msj, type) => set({ message: msj, type }),
   notifyReset: () => set({ isLoading: false, message: '', type: undefined })
}))
