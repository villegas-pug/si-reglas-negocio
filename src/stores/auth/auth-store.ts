import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { localStorage } from '../../consts/local-storage.const'
import { Response, Usuario } from '../../interfaces'
import { api } from '../../config'

const { AUTH_KEY } = localStorage

type State = {
   isAuth: boolean
   userAuth: Usuario
}

type Action = {
   login: (cred: Pick<Usuario, 'login' | 'password'>) => Promise<void>
   logout: () => void
}

export const useAuthStore = create(
   persist<State & Action>((set) => ({
      isAuth: false,
      userAuth: {} as Usuario,

      login: async (cred) => {
         const { data } = await api<Response<Usuario>>({
            method: 'post',
            url: '/microservicio-usuario/login',
            data: cred
         })

         const { data: userAuth, messageType } = data

         switch (messageType) {
         case 'success':
            set({ userAuth, isAuth: true })
            break
         default:
            set({ isAuth: false })
            break
         }
      },
      logout: () => set({ isAuth: false, userAuth: {} as Usuario })
   }), {
      name: AUTH_KEY
   }))
