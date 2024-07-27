import { FC, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

import { Login } from '../pages/Portal'
import { NotFoundPage } from '../pages/NotFoundPage'

import { HomePage } from '../pages/HomePage'

import { NOT_FOUND, PRIVATE, PUBLIC } from '../consts'

import { useAuthStore } from '../stores'
import { useAuthComponents } from '../hooks'
import { pages } from './Pages'

export const AppRoutes: FC = () => {
   const { loginAuth, findByLogin } = useAuthStore()
   const { authPag } = useAuthComponents()

   useEffect(() => {
      if (loginAuth) findByLogin(loginAuth)
   }, [loginAuth])

   return (

      <BrowserRouter basename='srim'>
         <Routes>
            <Route path={PRIVATE} element={<PrivateRoutes />}>
               <Route index element={<HomePage />} />
               {
                  authPag.map(({ idProcedimiento, nombre, rutaPrincipal }) => (
                     <Route key={ idProcedimiento } path={ rutaPrincipal } element={ pages[nombre] } />
                  ))
               }
            </Route>
            <Route path={ PUBLIC } element={ <PublicRoutes /> }>
               <Route index element={<Login />} />
            </Route>
            <Route path={ NOT_FOUND } element={ <NotFoundPage /> } />
         </Routes>
      </BrowserRouter>
   )
}
