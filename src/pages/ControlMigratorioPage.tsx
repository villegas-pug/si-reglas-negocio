import { Avatar, Card, Flex } from 'antd'
import Meta from 'antd/es/card/Meta'

import { ReglasNegocioTable } from '../components'

import { useReglasNegocio } from '../hooks'
import { formatNumber } from '../helpers'
import { Fade } from '@mui/material'

export const ControlMigratorioPage = () => {
   const { controlMigratorio, totalCorrectosControlMigratorio, totalIncorrectosControlMigratorio } = useReglasNegocio()

   return (
      <>
         <Fade in timeout={1500}>
            <Flex justify='flex-end' gap={ 15 } style={{ marginRight: 10 }}>
               <Card style={{ width: 350, marginTop: 16 }}>
                  <Meta
                     avatar={<Avatar size={ 50 } src='https://w7.pngwing.com/pngs/236/944/png-transparent-contract-rights-rule-paragraphs-law-regulations-bid-icon-thumbnail.png' />}
                     title='Total Reglas'
                     description={ formatNumber(controlMigratorio.length) }
                  />
               </Card>
               <Card style={{ width: 350, marginTop: 16 }}>
                  <Meta
                     avatar={<Avatar size={ 50 } src='https://i.pngimg.me/thumb/f/720/m2H7K9d3d3N4Z5i8.jpg' />}
                     title='Registros Correctos'
                     description={ formatNumber(totalCorrectosControlMigratorio!) }
                  />
               </Card>
               <Card style={{ width: 350, marginTop: 16 }}>
                  <Meta
                     avatar={<Avatar size={ 50 } src='https://e7.pngegg.com/pngimages/269/127/png-clipart-computer-icons-ok-miscellaneous-trademark-thumbnail.png' />}
                     title='Registros Incorrectos'
                     description={ formatNumber(totalIncorrectosControlMigratorio!) }
                  />
               </Card>
            </Flex>
         </Fade>

         <ReglasNegocioTable data={controlMigratorio} />
      </>
   )
}
