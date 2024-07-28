import { FC } from 'react'
import { ReglasNegocioTable } from '../../components'
import { ReglaNegocio } from '../../interfaces'

const AlertasPage: FC = () => {
   const data = [] as ReglaNegocio[]

   return (
      <ReglasNegocioTable data={ data } />
   )
}

export default AlertasPage
