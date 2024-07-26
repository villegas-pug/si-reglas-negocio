import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../stores/auth/auth-store'
import { PRIVATE } from '../config/paths'

export const PublicRoutes = () => {
   const { isAuth } = useAuthStore()

   if (isAuth) return <Navigate to={ PRIVATE } />

   return (
      <>
         <Outlet />
      </>
   )
}
