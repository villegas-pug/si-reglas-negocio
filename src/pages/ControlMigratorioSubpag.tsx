import { FC, useEffect } from 'react'

import { HeaderReglaNegocio, ReglasNegocioTable } from '../components'

import { useReglaNegocioStore } from '../stores'
import { useReglasNegocio } from '../hooks'

const ControlMigratorioSubpag: FC = () => {
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

export default ControlMigratorioSubpag
