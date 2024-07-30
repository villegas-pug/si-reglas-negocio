import { create } from 'zustand'
import { Message } from '../../interfaces'

type State = {
   isLoading: boolean
   message: string
   type: Message
}

type Action = {
   apiLoading: (status: boolean) => void
   apiMessage: (msj: string, type: Message) => void
   apiReset: () => void
}

export const useApiStatusStore = create<State & Action>((set) => ({

   isLoading: false,
   message: '',
   type: 'info',

   apiLoading: (status) => set({ isLoading: status }),
   apiMessage: (msj, type) => set({ message: msj, type }),
   apiReset: () => set({ isLoading: false, message: '', type: undefined })
}))
