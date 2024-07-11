import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../store/useAuth'
import { PUBLIC } from '../config/paths'
import { LogoutButton } from '../components'

export const PrivateRoute = () => {
   const { isAuth } = useAuth()

   if (!isAuth) return <Navigate to={ PUBLIC } />

   return (
      <>
         <Outlet />
         <LogoutButton />
      </>
   )
}
