import { ReglasNegocioTable } from '../components'
import { ReglaNegocio } from '../interfaces'

export const CitasPage = () => {
   const data = [] as ReglaNegocio[]

   return (
      <ReglasNegocioTable data={ data } />
   )
}
