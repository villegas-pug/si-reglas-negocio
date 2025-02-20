import { FC, useMemo, useRef, useState } from 'react'

import { Button, Flex, Switch, Table, Tooltip } from 'antd'
import type { TableColumnsType } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Fade } from 'react-awesome-reveal'

import { useAuditoriaAsignacionContext } from '../context'
import { Asignacion } from '../../asignacion/models'
import { CustomModal } from '../../../../components'
import { UpdateTaskAssignmentForm } from './update-task-assignment-form.component'
import { switchIsTrabajadoTaskAssignment } from '../services'

export const AuditoriaTable: FC = () => {
   const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
   const assignSelectedRef = useRef<Asignacion>({} as Asignacion)

   const {
      asignacionDb,
      estadoAsignacionDb,
      tipoJustificacionDb,
      findAllAssigsOfCurrentUserByParams
   } = useAuditoriaAsignacionContext()

   const handleFindAllAssigsOfCurrentUserByParams = () => {
      findAllAssigsOfCurrentUserByParams({ idTipoAsignacion: 1 }) // ...
   }

   const columns: TableColumnsType<Asignacion> = useMemo(() => (
      [
         {
            title: '>>',
            align: 'center',
            key: 'idAsignacion',
            width: 80,
            fixed: 'left',
            render: (_, record) => (
               <Flex gap={7} justify='center' align='center'>

                  <Tooltip title='¿Completado?'>
                     <Switch checked={record.btrabajado} onChange={async (isActive: boolean) => {
                        await switchIsTrabajadoTaskAssignment({ idAsignacion: record.idAsignacion, trabajado: isActive })
                        handleFindAllAssigsOfCurrentUserByParams()
                     }} />
                  </Tooltip>

                  <Tooltip title='Editar asignación'>
                     <Button
                        shape='circle'
                        size='middle'
                        icon={<EditOutlined />}
                        onClick={() => {
                           assignSelectedRef.current = record
                           setIsOpenModalEdit(true)
                        }}
                     />
                  </Tooltip>
               </Flex>
            )
         }, {
            title: 'Id Asignación',
            dataIndex: 'idAsignacion',
            sorter: (a, b) => a.idAsignacion > b.idAsignacion ? 1 : -1,
            ellipsis: true,
            align: 'center',
            width: 150,
            fixed: 'left'
         }, {
            title: 'Nombres',
            dataIndex: 'sNombre',
            key: 'sNombre',
            sorter: (a, b) => a.sNombre.localeCompare(b.sNombre),
            ellipsis: true,
            align: 'justify',
            width: 200
         }, {
            title: 'Primer Apellido',
            dataIndex: 'sPaterno',
            align: 'justify',
            width: 200
         }, {
            title: 'Segundo Apellido',
            dataIndex: 'sMaterno',
            align: 'justify',
            width: 200
         }, {
            title: 'Sexo',
            dataIndex: 'sSexo',
            align: 'center',
            width: 70
         }, {
            title: 'Fecha Nacimiento',
            dataIndex: 'dFechaNacimiento',
            align: 'center',
            width: 150
         }, {
            title: 'Fecha Asignación',
            dataIndex: 'dFechaAsignacion',
            align: 'center',
            width: 150
         }, {
            title: 'Justificación',
            align: 'center',
            width: 300,
            render: (_, record) => tipoJustificacionDb.find(tipo => tipo.nidJustifica === record.nidJustifica)?.sdescripcionJust
         }, {
            title: 'Estado',
            align: 'center',
            width: 150,
            render: (_, record) => estadoAsignacionDb.find(estado => estado.nidEstado === record.nidEstado)?.sestado
         }, {
            title: 'Observaciones',
            dataIndex: 'nobservacion',
            align: 'justify',
            width: 500
         }
      ]
   ), [asignacionDb, estadoAsignacionDb, tipoJustificacionDb])

   return (
      <>
         <Fade duration={ 2000 }>
            <div style={{ marginTop: 5 }}>
               <Table
                  columns={ columns }
                  dataSource={ asignacionDb }
                  pagination={{
                     pageSize: 12,
                     total: asignacionDb.length
                  }}
                  size='small'
                  scroll={{ y: 'calc(100vh - 400px)', x: 'clamp(2600px, 50%, 4000px)' }}
               />
            </div>
         </Fade>

         {/* Modal's: */}
         <CustomModal title='░ Actualización de asignación' isOpen={ isOpenModalEdit } maskClosable={ false } handleIsOpen={ setIsOpenModalEdit } >
            <UpdateTaskAssignmentForm assign={ assignSelectedRef.current } />
         </CustomModal>

      </>
   )
}
