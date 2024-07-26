import { FC } from 'react'
import { Route } from 'react-router-dom'

import { pages } from '../config/pages'

import { useReglasNegocio } from '../hooks'

export const DashboardRoutes: FC = () => {
   const { procesosNegocio } = useReglasNegocio()

   return (
      <Route path='/'>
         {
            procesosNegocio.map(({ procesoNegocio, path }) => (
               <Route key={ procesoNegocio } path={ path } element={ pages[path] } />
            ))
         }
      </Route>
   )
}
