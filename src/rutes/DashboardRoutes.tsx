import { FC } from 'react'
import { Route } from 'react-router-dom'

import { pages } from '../rutes/Pages'

import { useAuthComponents } from '../hooks'

export const DashboardRoutes: FC = () => {
   const { authPag } = useAuthComponents()

   return (
      <>
         {
            authPag.map(({ idProcedimiento, nombre, rutaPrincipal }) => (
               <Route key={ idProcedimiento } path={ rutaPrincipal } element={ pages[nombre] } />
            ))
         }
      </>
   )
}
