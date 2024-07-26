import { Flex } from 'antd'

import { CardChart } from '../components/card-proceso-negocio'

import { useReglasNegocio } from '../hooks'
import { PieProcesoNegocio } from '../components'
import { useEffect, useMemo } from 'react'
import { Fade } from '@mui/material'
import { formatNumber } from '../helpers'
import { useAuthStore } from '../stores'

export const HomePage = () => {
   const { procesosNegocio } = useReglasNegocio()
   const { userAuth, findByLogin } = useAuthStore()

   useEffect(() => {
      findByLogin('srim')
   }, [])

   useEffect(() => {
      console.log({ userAuth })
   }, [userAuth])

   const chartsPie = useMemo(() => (
      procesosNegocio.reduce((map, { procesoNegocio, totalRegCorrectos, totalRegIncorrectos }) => {
         map[procesoNegocio] = <PieProcesoNegocio
            data={[{
               value: totalRegCorrectos,
               label: 'Correctos'
            }, {
               value: totalRegIncorrectos,
               label: 'Incorrectos',
               color: '#DE5449'
            }]} />
         return map
      }, {} as any)
   ), [])

   return (
      <Fade in timeout={ 800 }>
         <Flex
            justify='center'
            align='center'
            wrap='wrap'
            gap={ 50 }
            style={{ height: '100vh' }}
         >
            {

               procesosNegocio.map((proceso) => (
                  <CardChart
                     key={proceso.procesoNegocio}
                     title={proceso.procesoNegocio}
                     descriptions={[
                        `► Total registros: ${formatNumber(proceso.totalRegistros)}`,
                        `► Total reglas: ${formatNumber(proceso.totalRegistros)}`
                     ]}
                     path={proceso.path}
                     chart={chartsPie[proceso.procesoNegocio]}
                  />
               ))
            }
         </Flex>
      </Fade>
   )
}
