import { ReglasNegocioTable } from '../components'
import { ReglaNegocio } from '../interfaces'

export const PasaportesPage = () => {
   const data = [] as ReglaNegocio[]
   return (
      <ReglasNegocioTable data={ data } />
   )
}
