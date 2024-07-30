import { FC, useRef, useState } from 'react'

import { Table, Tag, Tooltip } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ConsoleSqlOutlined, PieChartOutlined } from '@ant-design/icons'
import { VscDebugRerun } from 'react-icons/vsc'
import type { TableColumnsType } from 'antd'

import { CustomModal } from '../modal'
import { Editor } from '../editor-sql'
import { formatNumber } from '../../helpers'
import { LineChart } from '../chart'

import { EjecucionScriptDeteccion, ReglaNegocioInternal } from '../../interfaces'

import { createOneRegistroEjecucionScript } from '../../services'
import { useReglasNegocio } from '../../hooks'

type Props = {
   data: ReglaNegocioInternal[]
}

export const ReglasNegocioTable: FC<Props> = ({ data }) => {
   const sentenciaSqlRef = useRef('SQL ...')
   const ejecucionScriptDeteccionRef = useRef<EjecucionScriptDeteccion[]>([])

   const [isOpenModal, setIsOpenModal] = useState(false)
   const [isOpenModalLineChart, setIsOpenModalLineChart] = useState(false)

   const { findReglasNegocioByProcesoOfCurrPath } = useReglasNegocio()

   const showSentenciaSql = (sql: string) => {
      sentenciaSqlRef.current = sql
      setIsOpenModal(true)
   }

   const showProyeccionDeteccion = (ejecucionScript: EjecucionScriptDeteccion[]) => {
      ejecucionScriptDeteccionRef.current = ejecucionScript
      setIsOpenModalLineChart(true)
   }

   const columns: TableColumnsType<ReglaNegocioInternal> = [
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
         title: 'Ejecutar Detección',
         align: 'center',
         render: (_, record) => record.ejecucionScriptDeteccion.length > 0
            ? (
               <Tooltip title='Ejecutar Script Detección'>
                  <VscDebugRerun
                     style={{ fontSize: 25, cursor: 'pointer' }}
                     onClick={async () => {
                        await createOneRegistroEjecucionScript(record.idCtrlCambioDeteccion)
                        findReglasNegocioByProcesoOfCurrPath()
                     }}
                  />
               </Tooltip>
            )
            : <></>
      }
   ]

   return (
      <>
         <div style={{ marginTop: 5, width: '100vw' }}>
            <Table
               columns={columns}
               dataSource={data}
               pagination={{ defaultPageSize: 8 }}
               size='small'
               scroll={{ y: 'calc(100vh - 470px)' }}
            />
         </div>

         {/* Modal's: */}
         <CustomModal title='Sentencia SQL' isOpen={ isOpenModal } setIsOpen={ () => setIsOpenModal(false) } >
            <Editor sentenciaSql={ sentenciaSqlRef.current } />
         </CustomModal>

         <CustomModal title='Proyección lineal' isOpen={ isOpenModalLineChart } setIsOpen={ setIsOpenModalLineChart } >
            <LineChart label={'Proyección'} data={ ejecucionScriptDeteccionRef.current } width={ '70vw' } height={ 350 } />
         </CustomModal>
      </>
   )
}
