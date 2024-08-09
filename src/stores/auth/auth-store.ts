import { HeaderResponse } from './../../interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { localStorage } from '../../consts'
import { Usuario } from '../../models'
import { api } from '../../config'
import { findUsuarioByLogin } from '../../services'

const { AUTH_KEY } = localStorage

type State = {
   isAuth: boolean
   token: string
   loginAuth: string
   userAuth: Usuario
}

type Action = {
   login: (cred: Pick<Usuario, 'login' | 'password'>) => Promise<void>
   logout: () => void
   findByLogin: (login: string) => Promise<void>
}

export const useAuthStore = create(
   persist<State & Action>((set) => ({
      isAuth: false,
      token: '',
      loginAuth: '',
      userAuth: {} as Usuario,

      login: async (cred) => {
         const { headers, status } = await api({
            method: 'post',
            url: '/microservicio-usuario/login',
            data: cred
         })

         const { userauth, token } = headers as unknown as HeaderResponse

         if (status === 200) {
            set({ loginAuth: userauth, token, isAuth: true })
         }
      },
      logout: () => set({ isAuth: false, token: '', loginAuth: '', userAuth: {} as Usuario }),
      findByLogin: async (login) => {
         const user = await findUsuarioByLogin(login)
         set({ userAuth: user })
      }
   }), {
      name: AUTH_KEY
   }))
