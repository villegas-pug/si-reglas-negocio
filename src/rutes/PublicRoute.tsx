import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../store/useAuth'
import { PRIVATE } from '../config/paths'

export const PublicRoute = () => {
   const { isAuth } = useAuth()

   if (isAuth) return <Navigate to={ PRIVATE } />

   return (
      <>
         <Outlet />
      </>
   )
}
