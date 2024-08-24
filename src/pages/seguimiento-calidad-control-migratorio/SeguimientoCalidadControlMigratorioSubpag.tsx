import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'

import { Badge, Card, Flex, Table } from 'antd'
import type { TableColumnsType } from 'antd'

import { DescripcionHorizontalDeStringify, FiltrarHallazgosForm, renderTagHallazgo } from './components'
import { dimensionTagComponent, CustomModal } from '../../components'
import { ReglaNegocio, HallazgoControlMigratorio } from '../../models'
import { findReglaNegocioById } from '../../services'
import { useSeguimientoCalidadHallazgoStore } from '../../stores'
import { useSeguimientoCalidadCMContext } from './context'

const PAGE_SIZE = 30

export const SeguimientoCalidadControlMigratorioSubpag: FC = () => {
   const reglasVinculadasRef = useRef<ReglaNegocio>({} as ReglaNegocio)
   const [isOpenModalReglasVinculadas, setIsOpenModalReglasVinculadas] = useState(false)
   const {
      hallazgosControlMigratorio,
      totalHallazgosControlMigratorio,
      findAllHallazgosByPaginacion
   } = useSeguimientoCalidadHallazgoStore()

   const { dimension } = useSeguimientoCalidadCMContext()

   useEffect(() => { findAllHallazgosByPaginacion({ currentPage: 1, recordsByPages: PAGE_SIZE, dimension }) }, [])

   const showReglaNegocio = async (idRN: string) => {
      const reglaNegocio = await findReglaNegocioById(idRN.trim())
      reglasVinculadasRef.current = reglaNegocio
      setIsOpenModalReglasVinculadas(true)
   }

   const columns: TableColumnsType<HallazgoControlMigratorio> = useMemo(() => (
      [
         {
            title: 'Dimensión',
            dataIndex: 'sDimension',
            align: 'center',
            width: 250,
            sorter: (a, b) => a.sDimension.localeCompare(b.sDimension),
            render: (_, record) => <Flex justify='center' align='center' gap={ 5 }>{record.sDimension.split(',').map(e => dimensionTagComponent[e.trim()]) }</Flex>
         }, {
            title: (
               <Badge.Ribbon text='Control Migratorio' color='red' placement='start'>
                  <Card size='small'>Id Persona</Card>
               </Badge.Ribbon>
            ),
            dataIndex: 'uIdPersona',
            align: 'center',
            width: 350,
            render: (_, record) => renderTagHallazgo('uIdPersona', record, showReglaNegocio)
         }, {
            title: 'Id Mov Migratorio',
            dataIndex: 'sIdMovMigratorio',
            sorter: (a, b) => a.sIdMovMigratorio.localeCompare(b.sIdMovMigratorio),
            align: 'center',
            render: (_, record) => renderTagHallazgo('sIdMovMigratorio', record, showReglaNegocio)
         }, {
            title: 'Fecha Control',
            dataIndex: 'dFechaControl',
            align: 'center',
            width: 250,
            sorter: (a, b) => a.dFechaControl.localeCompare(b.dFechaControl),
            render: (_, record) => renderTagHallazgo('dFechaControl', record, showReglaNegocio)
         }, {
            title: 'Nombres',
            dataIndex: 'sNombres',
            align: 'center',
            width: 350,
            render: (_, record) => renderTagHallazgo('sNombres', record, showReglaNegocio)
         }, {
            title: 'Tipo Control',
            dataIndex: 'sTipo',
            align: 'center',
            width: 100,
            render: (_, record) => renderTagHallazgo('sTipo', record, showReglaNegocio)
         }, {
            title: 'Id Calidad',
            dataIndex: 'nIdCalidad',
            align: 'center',
            render: (_, record) => renderTagHallazgo('nIdCalidad', record, showReglaNegocio)
         }, {
            title: 'Calidad Migratoria',
            dataIndex: 'sCalidad',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sCalidad', record, showReglaNegocio)
         }, {
            title: 'Pais Nacionalidad',
            dataIndex: 'sIdPaisNacionalidad',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sIdPaisNacionalidad', record, showReglaNegocio)
         }, {
            title: 'Documento',
            dataIndex: 'sIdDocumento',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sIdDocumento', record, showReglaNegocio)
         }, {
            title: 'Numero Documento',
            dataIndex: 'sNumeroDoc',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sNumeroDoc', record, showReglaNegocio)
         }, {
            title: 'Pais Mov',
            dataIndex: 'sIdPaisMov',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sIdPaisMov', record, showReglaNegocio)
         }, {
            title: 'Permanencia',
            dataIndex: 'nPermanencia',
            align: 'center',
            render: (_, record) => renderTagHallazgo('nPermanencia', record, showReglaNegocio)
         }, {
            title: (
               <Badge.Ribbon text='Datos Persona' color='green-inverse' placement='start'>
                  <Card size='small'>Nombre</Card>
               </Badge.Ribbon>
            ),
            dataIndex: 'sNombre',
            width: 300,
            align: 'center',
            render: (_, record) => renderTagHallazgo('sNombre', record, showReglaNegocio)
         }, {
            title: 'Paterno',
            dataIndex: 'sPaterno',
            width: 250,
            align: 'center',
            render: (_, record) => renderTagHallazgo('sPaterno', record, showReglaNegocio)
         }, {
            title: 'Materno',
            dataIndex: 'sMaterno',
            width: 250,
            align: 'center',
            render: (_, record) => renderTagHallazgo('sMaterno', record, showReglaNegocio)
         }, {
            title: 'Sexo',
            dataIndex: 'sSexo',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sSexo', record, showReglaNegocio)
         }, {
            title: 'Fecha Nacimiento',
            dataIndex: 'dFechaNacimiento',
            width: 300,
            align: 'center',
            render: (_, record) => renderTagHallazgo('dFechaNacimiento', record, showReglaNegocio)
         }, {
            title: (
               <Badge.Ribbon text='Datos Itinerario' color='lime' placement='start'>
                  <Card size='small'>Id Itinerario</Card>
               </Badge.Ribbon>
            ),
            dataIndex: 'sIdItinerario',
            align: 'center',
            width: 320,
            render: (_, record) => renderTagHallazgo('sIdItinerario', record, showReglaNegocio)
         }, {
            title: 'Fecha Programada',
            dataIndex: 'dFechaProgramada',
            align: 'center',
            width: 250,
            render: (_, record) => renderTagHallazgo('dFechaProgramada', record, showReglaNegocio)
         }, {
            title: 'Tipo Movimiento',
            dataIndex: 'sTipoMovimiento',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sTipoMovimiento', record, showReglaNegocio)
         }, {
            title: 'Cantidad Mov',
            dataIndex: 'nCantidadMov',
            align: 'center',
            render: (_, record) => renderTagHallazgo('nCantidadMov', record, showReglaNegocio)
         }, {
            title: 'Numero Nave',
            dataIndex: 'sNumeroNave',
            align: 'center',
            render: (_, record) => renderTagHallazgo('sNumeroNave', record, showReglaNegocio)
         }, {
            title: (
               <Badge.Ribbon text='Datos Operador' color='cyan' placement='start'>
                  <Card size='small'>Login Digita</Card>
               </Badge.Ribbon>
            ),
            dataIndex: 'sLoginOpeDigita',
            align: 'center',
            width: 320,
            render: (_, record) => renderTagHallazgo('sLoginOpeDigita', record, showReglaNegocio)
         }, {
            title: 'Operador Digita',
            dataIndex: 'sNombreOpeDigita',
            align: 'left',
            width: 400,
            render: (_, record) => renderTagHallazgo('sNombreOpeDigita', record, showReglaNegocio)
         }
      ]
   ), [])

   return (
      <>
         {/* Header  */}
         <FiltrarHallazgosForm />

         <div style={{ marginTop: 5, minWidth: 5500 }}>
            <Table
               columns={ columns }
               dataSource={ hallazgosControlMigratorio }
               pagination={{
                  total: totalHallazgosControlMigratorio,
                  pageSize: PAGE_SIZE,
                  onChange: (page, pageSize) => {
                     if (pageSize === 0) return
                     findAllHallazgosByPaginacion({ currentPage: page, recordsByPages: pageSize, dimension })
                  }
               }}
               expandable={{
                  rowExpandable: (record) => record.jDatosDuplicados?.length > 0,
                  expandedRowRender: (record) => <DescripcionHorizontalDeStringify json={record.jDatosDuplicados} />
               }}
               size='small'
               scroll={{ y: 'calc(100vh - 400px)' }}
            />
         </div>

         {/* Modal's: */}
         <CustomModal title='►' isOpen={ isOpenModalReglasVinculadas } setIsOpen={ () => setIsOpenModalReglasVinculadas(false) } >
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

export default SeguimientoCalidadControlMigratorioSubpag

const headerCardStyle: CSSProperties = {
   fontWeight: 'bold',
   textAlign: 'center'
}
