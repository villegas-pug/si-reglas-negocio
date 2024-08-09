import { CSSProperties, FC, useMemo, useRef, useState } from 'react'

import { Button, Card, Flex, Table, Tag } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Zoom } from 'react-awesome-reveal'

import { CustomModal } from '../components'

import { useControlHallazgos } from '../hooks'
import { findReglaNegocioById } from '../services'

import { ControlHallazgo } from '../interfaces'
import { ReglaNegocio } from '../models'

const renderTagHallazgo = (currentValue: string, record: ControlHallazgo, showSentenciaSql: (idRn: string) => void) => {
   const { camposErrCsv, ...rest } = record

   if (!camposErrCsv) return currentValue

   const [[currentField]] = Object.entries(rest).filter(([_, value]) => value === currentValue)

   const camposErr = camposErrCsv.split('|')

   const [, idRN] = camposErr.find(err => err.includes(currentField))?.split(',') || []

   if (!idRN) return currentValue

   return (
      <Flex gap='4px 0'>
         <Tag color='error' style={{ display: 'flex', alignItems: 'center' }}>{ currentValue }</Tag>
         <Button
            shape='circle'
            size='middle'
            icon={ <EyeOutlined /> }
            onClick={() => {
               showSentenciaSql(idRN)
            }}
         />
      </Flex>
   )
}

export const ControlHallazgosPage: FC = () => {
   const reglasVinculadasRef = useRef<ReglaNegocio>({} as ReglaNegocio)
   const [isOpenModalReglasVinculadas, setIsOpenModalReglasVinculadas] = useState(false)

   const { hallazgosDb } = useControlHallazgos()

   const showReglaNegocio = async (idRN: string) => {
      const reglaNegocio = await findReglaNegocioById(idRN.trim())
      reglasVinculadasRef.current = reglaNegocio
      setIsOpenModalReglasVinculadas(true)
   }

   const columns: TableColumnsType<ControlHallazgo> = useMemo(() => (
      [
         {
            title: 'Id Persona',
            dataIndex: 'Id Persona',
            align: 'center',
            width: 300,
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Id Mov Migratorio',
            dataIndex: 'Id Mov Migratorio(Control)',
            sorter: (a, b) => a['Id Mov Migratorio(Control)'].localeCompare(b['Id Mov Migratorio(Control)']),
            align: 'center',
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Fecha Control',
            dataIndex: 'Fecha(Control)',
            align: 'center',
            width: 150,
            sorter: (a, b) => a['Fecha(Control)'].localeCompare(b['Fecha(Control)']),
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Tipo Control',
            dataIndex: 'Tipo(Control)',
            align: 'center',
            width: 100,
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Calidad Migratoria',
            dataIndex: 'Calidad(Control)',
            align: 'center',
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Número Doc',
            dataIndex: 'Numero Doc(Control)',
            align: 'center',
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Pais Mov',
            dataIndex: 'Pais Mov(Control)',
            align: 'center',
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Login Digita',
            dataIndex: 'Login(Operador)',
            align: 'center',
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }, {
            title: 'Operador Digita',
            dataIndex: 'Nombre(Operador)',
            align: 'left',
            width: 400,
            render: (currentValue, record) => renderTagHallazgo(currentValue, record, showReglaNegocio)
         }
      ]
   ), [])

   return (
      <>
         <Zoom cascade duration={ 1000 }>
            <div style={{ marginTop: 5, minWidth: 2200 }}>
               <Table
                  columns={ columns }
                  dataSource={ hallazgosDb }
                  pagination={{ defaultPageSize: 10 }}
                  size='small'
                  scroll={{ y: 'calc(100vh - 270px)' }}
               />
            </div>
         </Zoom>

         {/* Modal's: */}
         <CustomModal title='░' isOpen={ isOpenModalReglasVinculadas } setIsOpen={ () => setIsOpenModalReglasVinculadas(false) } >
            <Card title='Regla vinculada al registro inconsistente'>
               <Card.Grid style={ headerCardStyle }>Id Regla</Card.Grid>
               <Card.Grid style={ headerCardStyle }>Definición Regla</Card.Grid>
               <Card.Grid style={ headerCardStyle }>Dimensión</Card.Grid>
               <Card.Grid>
                  { reglasVinculadasRef.current.idRN }
               </Card.Grid>
               <Card.Grid>
                  { reglasVinculadasRef.current.definicionRegla }
               </Card.Grid>
               <Card.Grid>
                  { reglasVinculadasRef.current.dimensionRegla?.nombre }
               </Card.Grid>
            </Card>
         </CustomModal>

      </>
   )
}

export default ControlHallazgosPage

const headerCardStyle: CSSProperties = {
   fontWeight: 'bold',
   textAlign: 'center'
}
