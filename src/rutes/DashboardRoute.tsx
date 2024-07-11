import { FC, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { toast } from 'react-hot-toast'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

import { Login } from '../pages/Login'
import { NotFoundPage } from '../pages/NotFoundPage'

import { pages } from '../config/pages'
import { useAuth } from '../store'
import { HomePage } from '../pages/HomePage'

import { NOT_FOUND, PRIVATE, PUBLIC } from '../config/paths'
import { useReglasNegocio } from '../hooks'

export const DashboardRoute: FC = () => {
   const { loading, isAuth, error } = useAuth()
   const { procesosNegocio } = useReglasNegocio()

   useEffect(() => {
      if (!loading) return
      if (isAuth) toast.success(error)
      if (!isAuth) toast.error(error)
   }, [loading])

   return (
      <BrowserRouter basename='srim'>
         <Routes>
            <Route path={PRIVATE} element={<PrivateRoute />}>
               <Route index element={ <HomePage />} />
               {
                  procesosNegocio.map(({ procesoNegocio, path }) => (
                     <Route key={ procesoNegocio } path={ path } element={ pages[path] } />
                  ))
               }
            </Route>
            <Route path={ PUBLIC } element={ <PublicRoute /> }>
               <Route index element={<Login />} />
            </Route>

            {/* NOT-FOUND  */}
            <Route path={ NOT_FOUND } element={ <NotFoundPage /> } />
         </Routes>
      </BrowserRouter>
   )
}
