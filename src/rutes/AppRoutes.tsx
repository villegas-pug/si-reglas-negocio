import { FC, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

import { Login } from '../portal/PortalPage'
import { NotFoundPage } from '../not-found/NotFoundPage'

import { NOT_FOUND, PRIVATE, PUBLIC } from '../consts'

import { useAuthStore } from '../stores'
import { DashboardRoutes } from './DashboardRoutes'

export const AppRoutes: FC = () => {
   const { loginAuth, findByLogin } = useAuthStore()

   useEffect(() => {
      if (loginAuth) findByLogin(loginAuth)
   }, [loginAuth])

   return (
      <BrowserRouter basename='srim'>
         <Routes>
            <Route element={<PrivateRoutes />}>
               <Route path={ `${PRIVATE}/*` } element={<DashboardRoutes />} />
            </Route>
            <Route path={ PUBLIC } element={ <PublicRoutes /> }>
               <Route index element={<Login />} />
            </Route>
            <Route path={ NOT_FOUND } element={ <NotFoundPage /> } />
         </Routes>
      </BrowserRouter>
   )
}
