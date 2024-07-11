import { ReglasNegocioTable } from '../components'
import { ReglaNegocio } from '../interfaces'

export const AlertasPage = () => {
   const data = [] as ReglaNegocio[]

   return (
      <ReglasNegocioTable data={ data } />
   )
}
