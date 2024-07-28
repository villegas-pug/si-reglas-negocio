import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../stores/auth/auth-store'
import { PRIVATE } from '../consts'

export const PublicRoutes = () => {
   const { isAuth } = useAuthStore()

   if (isAuth) return <Navigate to={PRIVATE} replace />

   return (
      <>
         <Outlet />
      </>
   )
}
