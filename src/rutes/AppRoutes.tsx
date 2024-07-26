import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

import { Login } from '../pages/Login'
import { NotFoundPage } from '../pages/NotFoundPage'

import { NOT_FOUND, PRIVATE, PUBLIC } from '../config/paths'
import { useReglasNegocio } from '../hooks'
import { pages } from '../config'
import { HomePage } from '../pages/HomePage'

export const AppRoutes: FC = () => {
   const { procesosNegocio } = useReglasNegocio()

   return (
      <BrowserRouter basename='srim'>
         <Routes>
            <Route path={PRIVATE} element={<PrivateRoutes />}>
               <Route index element={ <HomePage />} />
               {
                  procesosNegocio.map(({ procesoNegocio, path }) => (
                     <Route key={ procesoNegocio } path={ path } element={ pages[path] } />
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
