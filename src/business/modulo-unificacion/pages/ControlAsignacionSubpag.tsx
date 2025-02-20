import { FC, useEffect } from 'react'
import AsignacionTransfer from '../asignacion/components/asignacion-transfer.component'
import { useAuthStore } from '../../../stores'
import { AsignacionHeader } from '../asignacion/components'
import { useAsignacionContext } from '../asignacion/context'
import { Fade, Zoom } from 'react-awesome-reveal'

const ControlAsignacionSubpag: FC = () => {
   const { findAllUsers } = useAuthStore()
   const { findAllTipoAsignacion } = useAsignacionContext()

   useEffect(() => { findAllUsers() }, [])
   useEffect(() => { findAllTipoAsignacion() }, [])

   return (
      <>
         {/* Header */}
         <Zoom>
            <AsignacionHeader />
         </Zoom>

         {/* Body  */}
         <Fade>
            <AsignacionTransfer />
         </Fade>
      </>
   )
}

export default ControlAsignacionSubpag
