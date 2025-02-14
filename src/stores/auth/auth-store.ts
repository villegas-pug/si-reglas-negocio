import { HeaderResponse } from './../../interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { localStorage } from '../../consts'
import { Usuario } from '../../models'
import { api } from '../../config'
import { findAllUsers, findUsuarioByLogin } from '../../services'

const { AUTH_KEY } = localStorage

type State = {
   isAuth: boolean
   token: string
   loginAuth: string
   userAuth: Usuario
   users: Usuario[]
}

type Action = {
   login: (cred: Pick<Usuario, 'login' | 'password'>) => Promise<void>
   logout: () => void
   findByLogin: (login: string) => Promise<void>
   findAllUsers: () => Promise<void>
}

export const useAuthStore = create(
   persist<State & Action>((set) => ({
      isAuth: false,
      token: '',
      loginAuth: '',
      userAuth: {} as Usuario,
      users: [],

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
      },
      findAllUsers: async () => {
         const users = await findAllUsers()
         set({ users })
      }
   }), {
      name: AUTH_KEY
   }))
