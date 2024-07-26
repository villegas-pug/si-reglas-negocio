import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../stores/auth/auth-store'
import { PUBLIC } from '../config/paths'
import { LogoutButton } from '../components'

export const PrivateRoutes = () => {
   const { isAuth } = useAuthStore()

   if (!isAuth) return <Navigate to={ PUBLIC } />

   return (
      <>
         <Outlet />
         <LogoutButton />
      </>
   )
}
