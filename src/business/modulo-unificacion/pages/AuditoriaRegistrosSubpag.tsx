import { FC, useEffect } from 'react'

import { AuditoriaTable, FilterHeaderAuditoria, IndicadoresHeaderAuditoria } from '../auditoria/components'
import { useAuditoriaAsignacionContext } from '../auditoria/context'
import { Fade } from 'react-awesome-reveal'
import { Col, Row } from 'antd'

export const AuditoriaRegistrosSubpag: FC = () => {
   const { findAllEstados, findAllTipoJustificaciones, findAllAssigsOfCurrentUserByParams } = useAuditoriaAsignacionContext()

   useEffect(() => {
      // Tipo Asignación: 1 | Unión
      findAllAssigsOfCurrentUserByParams({ idTipoAsignacion: 1 })
   }, [])
   useEffect(() => { findAllEstados() }, [])
   useEffect(() => { findAllTipoJustificaciones() }, [])

   return (
      <>
         {/* Filter & Indicadores  */}
         <Fade duration={ 1500 }>
            <Row gutter={ 24 }>
               <Col span={ 12 }>
                  <FilterHeaderAuditoria />
               </Col>
               <Col span={ 12 }>
                  <IndicadoresHeaderAuditoria />
               </Col>
            </Row>
         </Fade>

         {/* Body  */}
         <Fade duration={ 2000 }>
            <AuditoriaTable />
         </Fade>
      </>
   )
}

export default AuditoriaRegistrosSubpag
