import { FC, useEffect } from 'react'

import { HeaderReglaNegocio, ReglasNegocioTable } from '../../../components'

import { useDimensionStore, useReglaNegocioStore } from '../../../stores'
import { useReglasNegocio } from '../../../hooks'

const ControlMigratorioSubpag: FC = () => {
   const { reglaNegocioInternalDb } = useReglaNegocioStore()
   const { findAllRNDimension } = useDimensionStore()
   const { findReglasNegocioByProcesoOfCurrPath } = useReglasNegocio()

   useEffect(() => { findReglasNegocioByProcesoOfCurrPath() }, [])
   useEffect(() => { findAllRNDimension() }, [])

   return (
      <>
         {/* Header:  */}
         <HeaderReglaNegocio />

         {/* Body: */}
         <ReglasNegocioTable data={ reglaNegocioInternalDb } />
      </>
   )
}

export default ControlMigratorioSubpag
