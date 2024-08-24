import { FC, useMemo, useRef, useState } from 'react'

import { Button, Flex, Table, Tag, Tooltip } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ConsoleSqlOutlined, DeleteOutlined, EditOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons'
import { VscDebugRerun } from 'react-icons/vsc'
import type { TableColumnsType } from 'antd'
import ReactJson from 'react-json-view'
import { Zoom } from 'react-awesome-reveal'

import { CustomModal } from '../modal'
import { Editor } from '../editor-sql'
import { formatNumber } from '../../helpers'
import { LineChart } from '../chart'

import { createOneRegistroEjecucionScript } from '../../services'
import { useReglasNegocio } from '../../hooks'
import { useReglaNegocioContext } from '../../context'
import { CardRunningAsyncTasks } from '../regla-negocio'

import { EjecucionScriptDeteccion, ReglaNegocioInternal } from '../../models'
import { AsyncIterable } from '../../interfaces'

type Props = {
   data: ReglaNegocioInternal[]
}

export const ReglasNegocioTable: FC<Props> = ({ data }) => {
   const sentenciaSqlRef = useRef('SQL ...')
   const resultadoDeteccionRef = useRef('')
   const ejecucionScriptDeteccionRef = useRef<EjecucionScriptDeteccion[]>([])
   const asyncTasksRef = useRef<AsyncIterable[]>([])

   const [isOpenModal, setIsOpenModal] = useState(false)
   const [isOpenModalLineChart, setIsOpenModalLineChart] = useState(false)
   const [isOpenModalResultSet, setIsOpenModalResultSet] = useState(false)

   const {
      isOpenModalRunningTasks,
      setInitialValues,
      setIsOpenModalCrear,
      setIsOpenModalRunningTasks
   } = useReglaNegocioContext()

   const { procesoOfCurrPath, findReglasNegocioByProcesoOfCurrPath } = useReglasNegocio()

   const showSentenciaSql = (sql: string) => {
      sentenciaSqlRef.current = sql
      setIsOpenModal(true)
   }

   const showProyeccionDeteccion = (ejecucionScript: EjecucionScriptDeteccion[]) => {
      ejecucionScriptDeteccionRef.current = ejecucionScript
      setIsOpenModalLineChart(true)
   }

   const columns: TableColumnsType<ReglaNegocioInternal> = useMemo(() => (
      [
         {
            title: '>>',
            align: 'center',
            render: (_, record) => (
               <Flex gap={7} justify='center'>
                  <Tooltip title='Editar regla'>
                     <Button
                        shape='circle'
                        size='middle'
                        icon={<EditOutlined />}
                        onClick={() => {
                           setInitialValues(record)
                           setIsOpenModalCrear(true)
                        }}
                     />
                  </Tooltip>
                  <Tooltip title='Eliminar regla'>
                     <Button
                        shape='circle'
                        size='middle'
                        icon={<DeleteOutlined />}
                     />
                  </Tooltip>
               </Flex>
            )
         },
         {
            title: 'Id Regla',
            dataIndex: 'idRN',
            key: 'idRN',
            sorter: (a, b) => a.idRN.localeCompare(b.idRN),
            ellipsis: true,
            align: 'center'
         }, {
            title: 'Tablas',
            dataIndex: 'tablas',
            key: 'tablas',
            align: 'center'
         }, {
            title: 'Campos',
            dataIndex: 'campos',
            key: 'Campos',
            align: 'justify',
            width: 250
         }, {
            title: 'Dimensión de Regla',
            key: 'dimensionRegla',
            align: 'center',
            render: (_, record) => record.dimensionRegla.nombre
         }, {
            title: 'Definición de Regla',
            dataIndex: 'definicionRegla',
            key: 'definicionRegla',
            align: 'justify',
            width: 400
         }, {
            title: 'Validación Inconsistencia',
            align: 'right',
            render: (_, record) => formatNumber(record.totalValidacionScript),
            sorter: (a, b) => a.totalValidacionScript - b.totalValidacionScript
         }, {
            title: 'Detección Inconsisitencia',
            align: 'right',
            render: (_, record) => formatNumber(record.totalDeteccionScript),
            sorter: (a, b) => a.totalDeteccionScript - b.totalDeteccionScript
         }, {
            title: 'Status Regla',
            dataIndex: 'statusRegla',
            align: 'center',
            filters: [{ text: 'APROBADO', value: 'APROBADO' }, { text: 'OBSERVADO', value: 'OBSERVADO' }],
            filterSearch: true,
            onFilter: (value, record) => record.statusRegla.nombre.includes(value as string),
            sorter: (a, b) => a.statusRegla.nombre.localeCompare(b.statusRegla.nombre),
            render: (_, { statusRegla }) => (

               statusRegla.nombre === 'APROBADO'
                  ? (<Tag icon={<CheckCircleOutlined />} color="success">{ statusRegla.nombre }</Tag>)
                  : (<Tag icon={<CloseCircleOutlined />} color="error">{ statusRegla.nombre }</Tag>)
            )
         }, {
            title: 'Script Validación',
            align: 'center',
            render: (_, record) => (
               <Tooltip title='Ver sentencia SQL'>
                  <ConsoleSqlOutlined
                     style={{ fontSize: 25 }}
                     onClick={() => showSentenciaSql(record.validacionScript)}
                  />
               </Tooltip>
            )
         }, {
            title: 'Script Detección',
            align: 'center',
            render: (_, record) => (
               <Tooltip title='Ver sentencia SQL'>
                  <ConsoleSqlOutlined
                     style={{ fontSize: 25 }}
                     onClick={() => showSentenciaSql(record.deteccionScript)}
                  />
               </Tooltip>
            )
         }, {
            title: 'Proyección Estadística',
            align: 'center',
            render: (_, record) => record.ejecucionScriptDeteccion.length > 0
               ? (
                  <Tooltip title='Ver proyección estadística'>
                     <PieChartOutlined
                        style={{ fontSize: 25 }}
                        onClick={() => showProyeccionDeteccion(record.ejecucionScriptDeteccion)}
                     />
                  </Tooltip>
               )
               : <></>
         }, {
            title: 'Mostrar Detección',
            align: 'center',
            render: (_, record) => record.resultSet.trim().length > 0
               ? (
                  <Tooltip title='Mostrar detalle detección'>
                     <TableOutlined
                        style={{ fontSize: 25, cursor: 'pointer' }}
                        onClick={() => {
                           resultadoDeteccionRef.current = record.resultSet
                           setIsOpenModalResultSet(true)
                        }}
                     />
                  </Tooltip>
               )
               : <></>
         }, {
            title: 'Ejecutar Detección',
            align: 'center',
            render: (_, record) => {
               if (record.deteccionScript.trim().length === 0) return <></>
               const callApi = () => createOneRegistroEjecucionScript(procesoOfCurrPath?.idProceso!, record.idCtrlCambioDeteccion)

               asyncTasksRef.current.push({
                  name: record.idRN,
                  method: callApi
               })

               return (
                  <Tooltip title='Ejecutar Script Detección'>
                     <VscDebugRerun
                        style={{ fontSize: 25, cursor: 'pointer' }}
                        onClick={ async () => {
                           await callApi()
                           findReglasNegocioByProcesoOfCurrPath()
                        }}
                     />
                  </Tooltip>
               )
            }
         }
      ]
   ), [])

   return (
      <>
         <Zoom>
            <div style={{ marginTop: 5, minWidth: 2200 }}>
               <Table
                  columns={columns}
                  dataSource={ data }
                  pagination={{ defaultPageSize: Infinity }}
                  size='small'
                  scroll={{ y: 'calc(100vh - 470px)' }}
               />
            </div>
         </Zoom>

         {/* Modal's: */}
         <CustomModal title='Sentencia SQL' isOpen={ isOpenModal } setIsOpen={ () => setIsOpenModal(false) } >
            <Editor sentenciaSql={ sentenciaSqlRef.current } />
         </CustomModal>

         <CustomModal title='Proyección lineal' isOpen={ isOpenModalLineChart } setIsOpen={ setIsOpenModalLineChart } >
            <LineChart label={'Proyección'} data={ ejecucionScriptDeteccionRef.current } width={ '70vw' } height={ 350 } />
         </CustomModal>

         <CustomModal title='Resutado script detección' isOpen={isOpenModalResultSet} setIsOpen={setIsOpenModalResultSet} >
            <ReactJson collapsed={ true } src={ JSON.parse(resultadoDeteccionRef.current || '{}') } />
         </CustomModal>

         <CustomModal
            title={'Ejecución masiva de reglas'}
            isOpen={isOpenModalRunningTasks}
            maskClosable={ false }
            setIsOpen={setIsOpenModalRunningTasks}
         >
            <CardRunningAsyncTasks asyncTasks={ asyncTasksRef.current } />
         </CustomModal>
      </>
   )
}
