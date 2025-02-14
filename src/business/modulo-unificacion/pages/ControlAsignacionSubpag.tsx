import { FC, useEffect } from 'react'
import AsignacionTransfer from '../asignacion/components/asignacion-transfer.component'
import { useAuthStore } from '../../../stores'
import { AsignacionHeader } from '../asignacion/components'
import { useAsignacionContext } from '../asignacion/context'

const ControlAsignacionSubpag: FC = () => {
   const { findAllUsers } = useAuthStore()
   const { findAllTipoAsignacion } = useAsignacionContext()

   useEffect(() => { findAllUsers() }, [])
   useEffect(() => { findAllTipoAsignacion() }, [])

   return (
      <>
         {/* Header */}
         <AsignacionHeader />

         {/* Body  */}
         <AsignacionTransfer />
      </>
   )
}

export default ControlAsignacionSubpag
