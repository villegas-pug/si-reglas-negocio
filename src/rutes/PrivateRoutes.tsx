import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../stores/auth/auth-store'
import { PUBLIC } from '../consts'
import { LayoutApp, LogoutButton, ModalLoading } from '../components'
import { Suspense } from 'react'

export const PrivateRoutes = () => {
   const { isAuth } = useAuthStore()

   if (!isAuth) return <Navigate to={ PUBLIC } replace />

   return (
      <LayoutApp>
         <Suspense fallback={ <ModalLoading /> }>
            <Outlet />
            <ModalLoading />
         </Suspense>
         <LogoutButton />
      </LayoutApp>
   )
}
