/* import { ReglasNegocioTable } from '../../components' */
import { useEffect } from 'react'

import { useReglasNegocio } from '../hooks'
import { useReglaNegocioStore } from '../stores'

import { HeaderReglaNegocio, ReglasNegocioTable } from '../components'

const TramitesInmigracionSubpag = () => {
   const { reglaNegocioInternalDb } = useReglaNegocioStore()
   const { findReglasNegocioByProcesoOfCurrPath } = useReglasNegocio()

   useEffect(() => { findReglasNegocioByProcesoOfCurrPath() }, [])

   return (
      <>
         {/* Header:  */}
         <HeaderReglaNegocio />

         {/* Table: */}
         <ReglasNegocioTable data={ reglaNegocioInternalDb } />
      </>
   )
}

export default TramitesInmigracionSubpag
