import { FC, useRef, useState } from 'react'

import type { TableColumnsType } from 'antd'
import { Space, Table, Tag, Tooltip } from 'antd'
import { ReglaNegocio } from '../interfaces'
import { CheckCircleOutlined, CloseCircleOutlined, ConsoleSqlOutlined, PieChartOutlined } from '@ant-design/icons'
import { CustomModal } from './modal'
import { Editor } from './editor-sql'
import { formatNumber } from '../helpers'

type Props = {
   data: ReglaNegocio[]
}

export const ReglasNegocioTable: FC<Props> = ({ data }) => {
   const sentenciaSql = useRef('SQL ...')
   const [isOpenModa, setIsOpenModa] = useState(false)

   const showSentenciaSql = (sql: string) => {
      sentenciaSql.current = sql
      setIsOpenModa(true)
   }

   const columns: TableColumnsType<ReglaNegocio> = [
      {
         title: 'Id Regla',
         dataIndex: 'idRegla',
         key: 'idRegla',
         sorter: (a, b) => a.idRegla.localeCompare(b.idRegla),
         ellipsis: true,
         align: 'center'
      }, {
         title: 'Tablas',
         dataIndex: 'tabla',
         key: 'Tabla',
         align: 'center'
      }, {
         title: 'Campos',
         dataIndex: 'campos',
         key: 'Campos',
         align: 'justify',
         width: 250
      }, {
         title: 'Dimensión de Regla',
         dataIndex: 'dimensionRegla',
         key: 'dimensionRegla',
         align: 'center'
      }, {
         title: 'Definición de Regla',
         dataIndex: 'definicionRegla',
         key: 'definicionRegla',
         align: 'justify',
         width: 500
      }, {
         title: 'Total Registros Correctos',
         dataIndex: 'totalRegCorrectos',
         key: 'totalRegCorrectos',
         align: 'right',
         render: (_, record) => formatNumber(record.totalRegCorrectos),
         sorter: (a, b) => a.totalRegCorrectos - b.totalRegCorrectos
      }, {
         title: 'Total Registros Incorrectos',
         dataIndex: 'totalRegIncorrectos',
         key: 'totalRegIncorrectos',
         align: 'right',
         render: (_, record) => formatNumber(record.totalRegIncorrectos),
         sorter: (a, b) => a.totalRegIncorrectos - b.totalRegIncorrectos
      }, {
         title: 'Status Regla',
         dataIndex: 'statusRegla',
         key: 'statusRegla',
         align: 'center',
         filters: [{ text: 'APROBADO', value: 'APROBADO' }, { text: 'OBSERVADO', value: 'OBSERVADO' }],
         filterSearch: true,
         onFilter: (value, record) => record.statusRegla.includes(value as string),
         sorter: (a, b) => a.statusRegla.localeCompare(b.statusRegla),
         render: (_, record) => (

            record.statusRegla === 'APROBADO'
               ? (<Tag icon={<CheckCircleOutlined />} color="success">{ record.statusRegla }</Tag>)
               : (<Tag icon={<CloseCircleOutlined />} color="error">{ record.statusRegla }</Tag>
               )
         )
      }, {
         title: 'Script SQL Validación',
         key: 'scriptSQLValidacion',
         align: 'center',
         render: (_, record) => (
            <Tooltip title='Ver sentencia SQL'>
               <ConsoleSqlOutlined
                  style={{ fontSize: 25 }}
                  onClick={() => showSentenciaSql(record.scriptSQLHallazgo)}
               />
            </Tooltip>
         )
      }, {
         title: 'Script SQL Hallazgo',
         key: 'scriptSQLValidacion',
         align: 'center',
         render: (_, record) => (
            <Tooltip title='Ver sentencia SQL'>
               <ConsoleSqlOutlined
                  style={{ fontSize: 25 }}
                  onClick={() => showSentenciaSql(record.scriptSQLHallazgo)}
               />
            </Tooltip>
         )
      }, {
         title: 'Estadístico',
         key: 'estadistico',
         align: 'center',
         render: (_, record) => (
            <Tooltip title='Ver estadisticas'>
               <PieChartOutlined
                  style={{ fontSize: 25 }}
                  onClick={() => showSentenciaSql(record.scriptSQLValidacion)}
               />
            </Tooltip>
         )
      }
   ]

   return (
      <>
         <Space>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 12 }} scroll={{ y: 'calc(100vh - 315px)' }} />
         </Space>

         <CustomModal isModalOpen={ isOpenModa } setIsModalOpen={ () => setIsOpenModa(false) } >
            <Editor sentenciaSql={ sentenciaSql.current } />
         </CustomModal>
      </>
   )
}
