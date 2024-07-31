import { FC, useState } from 'react'

import { Flex, Card, Row, Col, Button } from 'antd'
import Meta from 'antd/es/card/Meta'
import { Fade } from '@mui/material'

import { BsFileRuledFill, BsDatabaseFillCheck, BsDatabaseFillExclamation } from 'react-icons/bs'

import { formatNumber } from '../../helpers'
import { useReglasNegocio } from '../../hooks'
import { FormAsideFloat } from '../forms'

const sizeIcon = 35

export const HeaderReglaNegocio: FC = () => {
   const [isOpenForm, setIsOpenForm] = useState(true)

   const { totalReglasOfCurrPath, granTotalDeteccionOfCurrPath, granTotalValidacionOfCurrPath } = useReglasNegocio()

   return (
      <>
         <Fade in timeout={2000}>
            <Row>
               <Col span={8}>
                  <Row justify='start' align='bottom' style={{ height: '100%' }}>
                     <Button
                        type='primary'
                        size='large'
                        icon={<BsFileRuledFill color='#fff' />}
                        onClick={ () => { setIsOpenForm(true) } }
                     >
                     Nueva regla
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

         </Fade>

         {/* Flaot Form */}
         <FormAsideFloat isOpen={ isOpenForm } setIsOpen={ setIsOpenForm } />
      </>
   )
}
