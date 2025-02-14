import { FC, useMemo, useRef, useState } from 'react'

import { Button, Flex, Popconfirm, Table, Tag, Tooltip } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ConsoleSqlOutlined, DeleteOutlined, EditOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons'
import { VscDebugRerun } from 'react-icons/vsc'
import type { TableColumnsType } from 'antd'
import ReactJson from 'react-json-view'
import { Zoom } from 'react-awesome-reveal'

import { Editor, CustomModal, LineChart, CardRunningAsyncTasks } from '../../components'
import { formatNumber } from '../../utils'

import { createOneRegistroEjecucionScript, createOneRegistroValidacionScript } from '../../services'
import { useReglasNegocio } from '../../hooks'
import { useReglaNegocioContext } from '../../context'

import { EjecucionScriptDeteccion, ReglaNegocioInternal } from '../../models'
import { AsyncIterable } from '../../interfaces'

type Props = {
   data: ReglaNegocioInternal[]
}

export const ReglasNegocioTable: FC<Props> = ({ data }) => {
   const sentenciaSqlRef = useRef('SQL ...')
   const resultadoDeteccionRef = useRef('')
   const ejecucionScriptDeteccionRef = useRef<EjecucionScriptDeteccion[]>([])

   const [isOpenModal, setIsOpenModal] = useState(false)
   const [isOpenModalLineChart, setIsOpenModalLineChart] = useState(false)
   const [isOpenModalResultSet, setIsOpenModalResultSet] = useState(false)

   const {
      isOpenModalRunningTasks,
      setSelectedReglaNegocio,
      setIsOpenModalCrear,
      setIsOpenModalRunningTasks,
      setScriptDeteccion,
      setScriptValidacion
   } = useReglaNegocioContext()

   const { procesoOfCurrPath, findReglasNegocioByProcesoOfCurrPath, deleteReglaNegocio } = useReglasNegocio()

   const showSentenciaSql = (sql: string) => {
      sentenciaSqlRef.current = sql
      setIsOpenModal(true)
   }

   const showProyeccionDeteccion = (ejecucionScript: EjecucionScriptDeteccion[]) => {
      ejecucionScriptDeteccionRef.current = ejecucionScript
      setIsOpenModalLineChart(true)
   }

   const asyncTasks: AsyncIterable[] = useMemo(() => {
      const tasks: AsyncIterable[] = data.sort((a, b) => a.runtimeDeteccion < b.runtimeDeteccion ? -1 : 1).map(rn => {
         return {
            name: rn.idRN,
            method: () => createOneRegistroEjecucionScript(rn.proceso.idProceso, rn.idCtrlCambioDeteccion)
         }
      })
      return tasks
   }, [data])

   const handleEditarReglaNegocio = (record: ReglaNegocioInternal) => {
      setSelectedReglaNegocio(record)
      setScriptDeteccion(record.deteccionScript)
      setScriptValidacion(record.validacionScript)
      setIsOpenModalCrear(true)
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
                        onClick={() => { handleEditarReglaNegocio(record) }}
                     />
                  </Tooltip>

                  <Tooltip title='Eliminar regla'>
                     <Popconfirm
                        title='Eliminar regla negocio'
                        description='¿Estas seguro de eliminar esta regla?'
                        onConfirm={ () => deleteReglaNegocio(record.idRN) }
                        okText='Si'
                        cancelText='No'
                     >
                        <Button
                           shape='circle'
                           size='middle'
                           icon={<DeleteOutlined />}
                        />
                     </Popconfirm>
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
            render: (_, record) => formatNumber(record.totalValidacionScript || 0),
            sorter: (a, b) => a.totalValidacionScript - b.totalValidacionScript
         }, {
            title: 'Detección Inconsisitencia',
            align: 'right',
            render: (_, record) => formatNumber(record.totalDeteccionScript!),
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
               return (
                  <Popconfirm
                     title='Ejecucion de regla detección'
                     description='¿Estas seguro de ejecutar esta regla?'
                     onConfirm={ async () => {
                        await createOneRegistroEjecucionScript(procesoOfCurrPath?.idProceso!, record.idCtrlCambioDeteccion)
                        findReglasNegocioByProcesoOfCurrPath()
                     } }
                     okText='Si'
                     cancelText='No'
                  >
                     <VscDebugRerun
                        style={{ fontSize: 25, cursor: 'pointer' }}
                     />
                  </Popconfirm>
               )
            }
         }, {
            title: 'Ejecutar Validación',
            align: 'center',
            render: (_, record) => {
               if (record.validacionScript.trim().length === 0) return <></>
               return (
                  <Popconfirm
                     title='Ejecucion de regla validación'
                     description='¿Estas seguro de ejecutar esta regla?'
                     onConfirm={async () => {
                        await createOneRegistroValidacionScript(record.idCtrlCambioValidacion)
                        findReglasNegocioByProcesoOfCurrPath()
                     }}
                     okText='Si'
                     cancelText='No'
                  >
                     <VscDebugRerun style={{ fontSize: 25, cursor: 'pointer' }} />
                  </Popconfirm>
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
                  columns={ columns }
                  dataSource={ data }
                  pagination={{
                     pageSize: 20,
                     total: data.length
                  }}
                  size='small'
                  scroll={{ y: 'calc(100vh - 470px)' }}
               />
            </div>
         </Zoom>

         {/* Modal's: */}
         <CustomModal title='Sentencia SQL' isOpen={ isOpenModal } handleIsOpen={ setIsOpenModal } >
            <Editor sentenciaSql={ sentenciaSqlRef.current } />
         </CustomModal>

         <CustomModal title='Proyección lineal' isOpen={ isOpenModalLineChart } handleIsOpen={ setIsOpenModalLineChart } >
            <LineChart label={'Proyección'} data={ ejecucionScriptDeteccionRef.current } width={ '70vw' } height={ 350 } />
         </CustomModal>

         <CustomModal title='Resutado script detección' isOpen={isOpenModalResultSet} handleIsOpen={ setIsOpenModalResultSet } >
            <ReactJson collapsed={ true } src={ JSON.parse(resultadoDeteccionRef.current || '{}') } />
         </CustomModal>

         <CustomModal
            title={'Ejecución masiva de reglas'}
            isOpen={ isOpenModalRunningTasks }
            maskClosable={ false }
            handleIsOpen={ setIsOpenModalRunningTasks }
         >
            <CardRunningAsyncTasks asyncTasks={ asyncTasks } />
         </CustomModal>
      </>
   )
}
