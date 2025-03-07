import { FC } from 'react'

import { Flex, Card, Row, Col, Button } from 'antd'
import Meta from 'antd/es/card/Meta'
import { Zoom } from 'react-awesome-reveal'

import { BsFileRuledFill, BsDatabaseFillCheck, BsDatabaseFillExclamation } from 'react-icons/bs'

import { formatNumber } from '../../utils'
import { useReglasNegocio } from '../../hooks'
import { FormAsideFloat } from '../forms'
import { useReglaNegocioContext } from '../../context'
import { VscRunAll } from 'react-icons/vsc'

const sizeIcon = 35

export const HeaderReglaNegocio: FC = () => {
   const { totalReglasOfCurrPath, granTotalDeteccionOfCurrPath, granTotalValidacionOfCurrPath } = useReglasNegocio()
   const {
      setIsOpenModalCrear,
      resetSelectedReglaNegocio,
      setIsOpenModalRunningTasks
   } = useReglaNegocioContext()

   return (
      <>
         <Zoom duration={ 1500 }>
            <Row>
               <Col span={ 8 }>
                  <Row justify='start' align='bottom' style={{ height: '100%', gap: 3 }}>
                     <Button
                        type='primary'
                        size='large'
                        icon={<BsFileRuledFill color='#fff' />}
                        onClick={() => {
                           resetSelectedReglaNegocio()
                           setIsOpenModalCrear(true)
                        }}
                     >
                        Nueva regla
                     </Button>

                     <Button
                        size='large'
                        icon={<VscRunAll />}
                        onClick={() => setIsOpenModalRunningTasks(true) }
                     >
                        Ejecutar todas reglas
                     </Button>
                  </Row>
               </Col>
               <Col span={ 16 }>
                  <Flex justify='flex-end' gap={ 15 } style={{ marginRight: 10 }}>
                     <Card style={{ width: 350, marginTop: 16 }}>
                        <Meta
                           avatar={ <BsFileRuledFill size={ sizeIcon } color='#1E9FCA' /> }
                           title='Total Reglas'
                           description={ formatNumber(totalReglasOfCurrPath) }
                        />
                     </Card>
                     <Card style={{ width: 350, marginTop: 16 }}>
                        <Meta
                           avatar={ <BsDatabaseFillCheck size={ sizeIcon } color='#17A05D' /> }
                           title='Resultado Validación'
                           description={ formatNumber(granTotalValidacionOfCurrPath) }
                        />
                     </Card>
                     <Card style={{ width: 350, marginTop: 16 }}>
                        <Meta
                           avatar={ <BsDatabaseFillExclamation size={ sizeIcon } color='#C70039' /> }
                           title='Resultado Detección'
                           description={ formatNumber(granTotalDeteccionOfCurrPath) }
                        />
                     </Card>
                  </Flex>
               </Col>

            </Row>

         </Zoom>

         {/* Flaot Form */}
         <FormAsideFloat />
      </>
   )
}
