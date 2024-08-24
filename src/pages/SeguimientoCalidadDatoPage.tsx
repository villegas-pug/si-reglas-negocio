import { Col, Divider, Flex, Row } from 'antd'
import { MyPieChart, MyPieChart2, MyRadarChart, MyStackedBar } from '../components'
import { useMetricasJZ } from '../hooks'
import { FC, useEffect } from 'react'
import { formatNumber } from '../helpers'
import { MetricaDatoInvalidoJZInternal, MetricaDependenciaJZ, MetricaOperadorJZInternal } from '../models'

export const SeguimientoCalidadDatoPage = () => {
   return (
      <>
         <Divider>Monitoreo de la Calidad de los Datos</Divider>
         <Row gutter={ 25 } style={{ height: 'calc(100vh - 175px)' }}>
            <Col span={ 24} >
               <Flex vertical justify='center'>
                  <Flex justify='space-around'>
                     <MetricaResumenJZ title='░ Control Migratorio' filter={'SimMovMigra'} />
                     <MetricaResumenJZ title='░ Persona' filter={'SimPersona'} />
                  </Flex>
               </Flex>
            </Col>
            <Col span={8}>
               <Flex vertical justify='center'>
                  <Divider orientation='left'>░ Top operadores</Divider>
                  <Flex justify='center' align='center'>
                     <MetricaOperadorJZonal />
                  </Flex>
               </Flex>
            </Col>
            <Col span={ 6 }>
               <Flex vertical justify='center'>
                  <Divider orientation='left'>░ Top datos inválidos más frecuentes</Divider>
                  <Flex justify='center' align='center'>
                     <MetricaDatosInvalidosJZ />
                  </Flex>
               </Flex>
            </Col>
            <Col span={ 10 }>
               <Flex vertical justify='center'>
                  <Divider orientation='left'>░ Top dependencias</Divider>
                  <Flex justify='center' align='center'>
                     <MetricaDependenciaJZonal />
                  </Flex>
               </Flex>
            </Col>
         </Row>
      </>
   )
}

type MetricaResumenJZProps = {
   title: string
   filter: string
}

const MetricaResumenJZ: FC<MetricaResumenJZProps> = ({ title, filter }) => {
   const { metricasResumenJZ, callGetMetricasResumenJefeZonal } = useMetricasJZ()

   useEffect(() => { callGetMetricasResumenJefeZonal() }, [])

   const adaptMetrica = metricasResumenJZ.find(mt => mt.tabla === filter)

   return (
      <MyPieChart
         title={title}
         data={[
            {
               label: 'Cumplen',
               value: ((adaptMetrica?.totalRegistros || 0) - (adaptMetrica?.totalRegistrosIncumplen || 0))
            }, {
               label: 'Incumplen',
               value: adaptMetrica?.totalRegistrosIncumplen || 0,
               color: '#DE5449'
            }
         ]}
         arcLabel={({ value }) => formatNumber(value || 0)}
         width={400}
         height={200}
      />

   )
}

const MetricaOperadorJZonal: FC = () => {
   const { metricasOperadorJZ, callGetMetricasOperadorJefeZonal } = useMetricasJZ()

   useEffect(() => { callGetMetricasOperadorJefeZonal() }, [])

   return (
      <MyStackedBar<MetricaOperadorJZInternal>
         data={metricasOperadorJZ}
         xAxis='loginOpeDigita'
         dataKey1='simMovMigra'
         colorDataKey1='#17A05D'
         dataKey2='simPersona'
         colorDataKey2='#FFCE44'
         width={800}
         height={350}
      />
   )
}

const MetricaDatosInvalidosJZ: FC = () => {
   const { metricasDatosInvalidosJZ, callGetMetricasDatosInvalidosJefeZonal } = useMetricasJZ()

   useEffect(() => { callGetMetricasDatosInvalidosJefeZonal() }, [])

   return (
      <MyRadarChart<MetricaDatoInvalidoJZInternal>
         data={ metricasDatosInvalidosJZ }
         angleAxisDataKey={'campo'}
         radarDataKey={ 'total' }
         colorStroke={'#EF6C44'}
         colorFill={'#E97C7B'}
         width={ 350 }
      />
   )
}

const MetricaDependenciaJZonal: FC = () => {
   const { metricasDependenciaJZ, callGetMetricasDependenciaJefeZonal } = useMetricasJZ()

   useEffect(() => { callGetMetricasDependenciaJefeZonal() }, [])

   return (
      <MyPieChart2<MetricaDependenciaJZ>
         data={ metricasDependenciaJZ }
         dataKey='total'
         nameKey='dependencia'
         label={({ dependencia, total }) => `${dependencia} ► ${formatNumber(total)}`}
         colorFill={'#EF6C44'}
         height={ 320 }
         width={ 600 }
      />
   )
}

export default SeguimientoCalidadDatoPage
