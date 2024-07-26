import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

import { Login } from '../pages/Portal'
import { NotFoundPage } from '../pages/NotFoundPage'

import { HomePage } from '../pages/HomePage'

import { NOT_FOUND, PRIVATE, PUBLIC } from '../consts'

import { pageComponents } from './Pages'
import { useAuthComponents } from '../hooks'

export const AppRoutes: FC = () => {
   const { authPag } = useAuthComponents()

   return (
      <BrowserRouter basename='srim'>
         <Routes>
            <Route path={PRIVATE} element={<PrivateRoutes />}>
               <Route index element={ <HomePage />} />
               {
                  authPag.map(({ nombre, rutaPrincipal }) => (
                     <Route key={ nombre } path={ rutaPrincipal } element={ pageComponents[nombre] } />
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
