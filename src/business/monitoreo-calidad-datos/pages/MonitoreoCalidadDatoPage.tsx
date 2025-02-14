import { Col, Divider, Flex, Row, Typography } from 'antd'
import { MyRadarChart, MyStackedBar, MyPieChart } from '../../../components'
import { FC, useEffect, useMemo } from 'react'
import { convertValueToColorIntensityDegree, formatNumber } from '../../../utils'
import { MetricaDatoInvalidoJZInternal, MetricaDependenciaJZ, MetricaOperadorJZInternal, MetricaResumenJZ } from '../models'
import { SimpleGroupIndicators } from '../components'
import { useMetricasJZ } from '../hooks'

export const SeguimientoCalidadDatoPage = () => {
   return (
      <>
         <Divider>Monitoreo de la Calidad de los Datos</Divider>
         <Row gutter={ 25 } style={{ height: 'calc(100vh - 175px)' }}>
            <Col span={ 24} >
               <Flex vertical justify='center'>
                  <Flex justify='space-around'>
                     <MetricaResumenJZonal title='░ Control Migratorio' filter={'SimMovMigra'} />
                     <MetricaResumenJZonal title='░ Persona' filter={'SimPersona'} />
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
   filter: 'SimPersona' | 'SimMovMigra'
}

const { Title } = Typography

const MetricaResumenJZonal: FC<MetricaResumenJZProps> = ({ title, filter }) => {
   const { metricasResumenJZ, callGetMetricasResumenJefeZonal } = useMetricasJZ()

   useEffect(() => { callGetMetricasResumenJefeZonal() }, [])

   const adaptMetricasResumenJZ = useMemo(() => metricasResumenJZ.filter(mt => mt.tabla === filter), [metricasResumenJZ])
   const totalMetricasResumenJZ = useMemo(() => adaptMetricasResumenJZ.reduce((total, curr) => total + curr.total, 0), [adaptMetricasResumenJZ])

   return (
      <>
         <Title level={ 5 }>{ title }</Title>
         <MyPieChart<MetricaResumenJZ>
            data={ adaptMetricasResumenJZ }
            dataKey={ 'total' }
            getLabel={ (mt) => `${mt.estado}: ${formatNumber(mt.total)} ◄► ${((mt.total / totalMetricasResumenJZ) * 100).toFixed(2)}%` }
            getCellKey={ ({ estado }) => estado }
            getCellFill={ ({ estado }) => estado === 'Cumplen' ? '#27C2EB' : '#E97C7B' }
            width={ 620 }
            height={ 200 }
         />
      </>
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

   const metricasDependenciaJZSort = useMemo(() => metricasDependenciaJZ.sort((a, b) => a.total > b.total ? -1 : 1), [metricasDependenciaJZ])
   const totalMetricasDependenciaJZ = useMemo(() => metricasDependenciaJZ.reduce((acc, { total }) => acc + total, 0), [metricasDependenciaJZ])

   return (
      <SimpleGroupIndicators<MetricaDependenciaJZ>
         data={ metricasDependenciaJZSort }
         getKey={(it) => it.dependencia}
         getTitle={(it) => it.dependencia}
         getValue={(it) => it.total}
         getValueColor={(it) => convertValueToColorIntensityDegree('R', it.total, totalMetricasDependenciaJZ)}
      />
   )
}

export default SeguimientoCalidadDatoPage
