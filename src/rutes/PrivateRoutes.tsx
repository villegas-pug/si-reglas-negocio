import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../stores/auth/auth-store'
import { PUBLIC } from '../consts'
import { LayoutApp, LogoutButton } from '../components'
import { Suspense } from 'react'

export const PrivateRoutes = () => {
   const { isAuth } = useAuthStore()

   if (!isAuth) return <Navigate to={ PUBLIC } />

   return (
      <>
         <LayoutApp>
            <Suspense fallback={ <h1>Loading...</h1> }>
               <Outlet />
            </Suspense>
            <LogoutButton />
         </LayoutApp>
      </>
   )
}
