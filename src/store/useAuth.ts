import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '../interfaces'
import { AUTH_KEY } from '../consts/localstorage'
import { users } from '../db/users'

type STATE = {
   isAuth: boolean
   loading: boolean
   error: string
   userAuth: User
}

type ACTION = {
   login: (user: User) => Promise<void>
   logout: () => void
}

export const useAuth = create(
   persist<STATE & ACTION>((set) => ({
      isAuth: false,
      loading: false,
      error: '',
      userAuth: {} as User,
      async login ({ user: name, password }) {
         const userAuth = users.find(user => user.user === name && user.password === password) || {} as User
         const isAuth = Object.values(userAuth).length > 0
         await set({ loading: true, isAuth, userAuth, error: !isAuth ? '¡Usuario o contraseña incorrecta!' : `¡Bienvenido usuario: ${name}!` })
         set({ loading: false })
      },
      logout () { set({ isAuth: false, error: '', userAuth: {} as User }) }
   }), {
      name: AUTH_KEY
   }))
