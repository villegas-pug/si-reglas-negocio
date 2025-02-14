import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { pages } from '../rutes/Pages'

import { useAuthComponents } from '../hooks'
import { HomePage } from '../home/HomePage'
import { NotFoundPage } from '../not-found/NotFoundPage'
import { NOT_FOUND } from '../consts'

export const DashboardRoutes: FC = () => {
   const { authPag } = useAuthComponents()

   return (
      <Routes>
         <Route index element={<HomePage />} />
         {
            authPag.map(({ idProcedimiento, nombre, rutaPrincipal }) => (
               <Route key={ idProcedimiento } path={ rutaPrincipal } element={ pages[nombre] } />
            ))
         }
         <Route path={ NOT_FOUND } element={ <NotFoundPage /> } />
      </Routes>
   )
}
