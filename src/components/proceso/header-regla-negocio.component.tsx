import { FC } from 'react'

import { Flex, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { Fade } from '@mui/material'

import { BsFileRuledFill, BsDatabaseFillCheck, BsDatabaseFillExclamation } from 'react-icons/bs'

import { formatNumber } from '../../helpers'
import { useReglasNegocio } from '../../hooks'

const sizeIcon = 35

export const HeaderReglaNegocio: FC = () => {
   const { totalReglasOfCurrPath, granTotalDeteccionOfCurrPath, granTotalValidacionOfCurrPath } = useReglasNegocio()

   return (

      <Fade in timeout={2000}>
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
                  title='Registros Correctos'
                  description={ formatNumber(granTotalValidacionOfCurrPath) }
               />
            </Card>
            <Card style={{ width: 350, marginTop: 16 }}>
               <Meta
                  avatar={ <BsDatabaseFillExclamation size={ sizeIcon } color='#C70039' /> }
                  title='Registros Incorrectos'
                  description={ formatNumber(granTotalDeteccionOfCurrPath) }
               />
            </Card>
         </Flex>
      </Fade>
   )
}
