import { FC, useRef, useState } from 'react'

import type { TableColumnsType } from 'antd'
import { Space, Table, Tag, Tooltip } from 'antd'
import { ReglaNegocioInternal } from '../interfaces'
import { CheckCircleOutlined, CloseCircleOutlined, ConsoleSqlOutlined, PieChartOutlined } from '@ant-design/icons'
import { CustomModal } from './modal'
import { Editor } from './editor-sql'
import { formatNumber } from '../helpers'

type Props = {
   data: ReglaNegocioInternal[]
}

export const ReglasNegocioTable: FC<Props> = ({ data }) => {
   const sentenciaSql = useRef('SQL ...')
   const [isOpenModa, setIsOpenModa] = useState(false)

   const showSentenciaSql = (sql: string) => {
      sentenciaSql.current = sql
      setIsOpenModa(true)
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
         width: 500
      }, {
         title: 'Validación Inconsistencia',
         key: 'totalValidacionScript',
         align: 'right',
         render: (_, record) => formatNumber(record.totalValidacionScript),
         sorter: (a, b) => a.totalValidacionScript - b.totalValidacionScript
      }, {
         title: 'Detección Inconsisitencia',
         key: 'totalRegIncorrectos',
         align: 'right',
         render: (_, record) => formatNumber(record.totalDeteccionScript),
         sorter: (a, b) => a.totalDeteccionScript - b.totalDeteccionScript
      }, {
         title: 'Status Regla',
         dataIndex: 'statusRegla',
         key: 'statusRegla',
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
         key: 'scriptSQLValidacion',
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
         key: 'scriptSQLValidacion',
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
         key: 'Proyección Estadística',
         align: 'center',
         render: (_, record) => (
            <Tooltip title='Ver estadisticas'>
               <PieChartOutlined
                  style={{ fontSize: 25 }}
                  onClick={() => showSentenciaSql(record.deteccionScript)}
               />
            </Tooltip>
         )
      }
   ]

   return (
      <>
         <Space>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 8 }} scroll={{ y: 'calc(100vh - 470px)' }} />
         </Space>

         <CustomModal isModalOpen={ isOpenModa } setIsModalOpen={ () => setIsOpenModa(false) } >
            <Editor sentenciaSql={ sentenciaSql.current } />
         </CustomModal>
      </>
   )
}
