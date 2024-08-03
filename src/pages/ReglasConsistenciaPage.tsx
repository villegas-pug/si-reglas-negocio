import { FC, useEffect, useMemo } from 'react'

import { Flex } from 'antd'

import { CardChart } from '../components/card-proceso-negocio'

import { PieProcesoNegocio } from '../components'

import { Fade } from '@mui/material'
import { formatNumber } from '../helpers'
import { useDimensionStore, useProcesoStore } from '../stores'

const ReglasConsistenciaPage: FC = () => {
   const { procesoDb, findAllRNProceso } = useProcesoStore()
   const { findAllRNDimension } = useDimensionStore()

   useEffect(() => { findAllRNProceso() }, [])
   useEffect(() => { findAllRNDimension() }, [])

   const chartsPie = useMemo(() => (
      procesoDb.reduce((map, { nombre, totalRegCorrectos, totalRegIncorrectos }) => {
         map[nombre] =
            <PieProcesoNegocio
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
   ), [procesoDb])

   return (
      <Fade in timeout={ 800 }>
         <Flex
            justify='center'
            align='center'
            wrap='wrap'
            gap={ 50 }
            style={{ height: 'calc(100vh - 180px)' }}
         >
            {

               procesoDb.map(({ idProceso, nombre, totalRegistros, totalReglas }) => (
                  <CardChart
                     key={ idProceso }
                     title={ nombre }
                     descriptions={[
                        `► Total registros: ${formatNumber(totalRegistros)}`,
                        `► Total reglas: ${formatNumber(totalReglas)}`
                     ]}
                     chart={chartsPie[nombre]}
                  />
               ))
            }
         </Flex>
      </Fade>
   )
}

export default ReglasConsistenciaPage
