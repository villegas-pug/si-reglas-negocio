import { FC, useEffect, useMemo } from 'react'

import { Flex } from 'antd'

import { CardChart } from '../components/card-proceso-negocio'

import { PieProcesoNegocio } from '../components'

import { Fade } from '@mui/material'
import { formatNumber } from '../helpers'
import { useProcesoStore, useReglaNegocioStore } from '../stores'
import { useNavigate } from 'react-router-dom'

const ReglasConsistenciaPage: FC = () => {
   const { procesoDb, findAllRNProceso } = useProcesoStore()
   const { findReglasNegocioByProceso } = useReglaNegocioStore()

   const navigate = useNavigate()

   useEffect(() => { findAllRNProceso() }, [])

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
   ), [])

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

               procesoDb.map(({ idProceso, nombre, totalRegistros, totalReglas, rutaPrincipal }) => (
                  <CardChart
                     key={idProceso}
                     title={nombre}
                     descriptions={[
                        `► Total registros: ${formatNumber(totalRegistros)}`,
                        `► Total reglas: ${formatNumber(totalReglas)}`
                     ]}
                     chart={chartsPie[nombre]}
                     navigate={async () => {
                        await findReglasNegocioByProceso({ idProceso })
                        navigate(rutaPrincipal)
                     }}
                  />
               ))
            }
         </Flex>
      </Fade>
   )
}

export default ReglasConsistenciaPage
