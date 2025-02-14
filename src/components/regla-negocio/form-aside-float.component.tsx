import { FC, useMemo, useRef } from 'react'

import { Button, Col, Drawer, Flex, Form, Input, Row, Select, Space, Typography } from 'antd'
import { Rule } from 'antd/es/form'

import { useReglaNegocioContext } from '../../context'
import { useDimensionStore } from '../../stores'
import { EyeOutlined, PaperClipOutlined } from '@ant-design/icons'
import { CustomModal } from '../modal'
import { Editor } from '../editor-sql'
import { useReglasNegocio } from '../../hooks'
import { FormValuesControlMigratorio } from '../../interfaces'

const { Option } = Select

const { Title } = Typography

const reglasValidacion: Rule[] = [
   { required: true, message: '¡Campo requerido!' }
]

export const FormAsideFloat: FC = () => {
   const btnSubmitRef = useRef({} as HTMLButtonElement)

   const { dimensionDb } = useDimensionStore()
   const {
      isOpenModalCrear,
      isOpenModalDeteccion,
      isOpenModalValidacion,
      scriptDeteccion,
      scriptValidacion,
      selectedReglaNegocio,
      setScriptDeteccion,
      setIsOpenModalCrear,
      setIsOpenModalScriptDeteccion,
      setIsOpenModalScriptValidacion,
      setScriptValidacion
   } = useReglaNegocioContext()

   const { saveReglaNegocio } = useReglasNegocio()

   const handleCloseModal = () => { setIsOpenModalCrear(false) }

   const handleSaveReglaNegocio = (values: FormValuesControlMigratorio) => {
      saveReglaNegocio(values)
   }

   const initialValues: FormValuesControlMigratorio = useMemo(() => {
      const { definicionRegla, tablas, campos, dimensionRegla } = selectedReglaNegocio
      return {
         definicionRegla,
         tabla: tablas,
         campos,
         dimensionRegla: dimensionRegla?.idDimension
      }
   }, [selectedReglaNegocio])

   const isEditMode = Object.values(selectedReglaNegocio).length > 0

   if (!isOpenModalCrear) return <></>

   return (
      <>
         <Drawer
            title={ isEditMode ? 'Actualizar regla' : 'Crear nueva regla' }
            width={ 720 }
            onClose={ handleCloseModal }
            open={ isOpenModalCrear }
            styles={{
               body: {
                  paddingBottom: 80
               }
            }}
            extra={
               <Space>
                  <Button onClick={ handleCloseModal }>Cancelar</Button>
                  <Button
                     type='primary'
                     onClick={ () => { btnSubmitRef.current.click() } }
                  >
                     { isEditMode ? 'Actualizar' : 'Crear'}
                  </Button>
               </Space>
            }
         >
            {
               isEditMode && (
                  <Title level={ 2 } type='success'> { selectedReglaNegocio.idRN } </Title>
               )
            }
            <Form
               layout='vertical'
               initialValues={ initialValues }
               onFinish={ handleSaveReglaNegocio }
            >
               <Row gutter={ 16 }>
                  <Col span={ 24 }>
                     <Form.Item
                        name='definicionRegla'
                        label='Definición de la Regla'
                        rules={ reglasValidacion }
                     >
                        <Input.TextArea rows={ 5 } autoFocus placeholder='Ingresa definición de la regla' />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={ 12 }>
                     <Form.Item
                        name='tabla'
                        label='Tabla'
                        rules={ reglasValidacion }
                     >
                        <Input placeholder='Ingresar nombre de tablas' />
                     </Form.Item>
                  </Col>
                  <Col span={ 12 }>
                     <Form.Item
                        name='campos'
                        label='Campos'
                        rules={ reglasValidacion }
                     >
                        <Input placeholder='Ingresar nombre de campos' />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={ 12 }>
                  <Col span={ 12 }>
                     <Form.Item
                        name='dimensionRegla'
                        label='Dimensión de Regla'
                        rules={ reglasValidacion }
                     >
                        <Select placeholder='Selecciona dimensión de la regla'>
                           {
                              dimensionDb.map(({ idDimension, nombre }) => (
                                 <Option key={idDimension} value={idDimension}>{ nombre }</Option>
                              ))
                           }
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>

               {/* Script's  */}
               <Row gutter={ 12 }>
                  <Col span={ 12 }>
                     <Form.Item
                        name='scriptDeteccion'
                        label='Script Detección'
                        rules={[{ required: !(scriptDeteccion.trim().length > 0), message: '¡Script requerido!' }]}
                     >
                        <Flex style={{ width: 110 }} justify='space-around'>
                           <Button
                              type={ scriptDeteccion.length ? 'primary' : 'default' }
                              size='large'
                              shape='circle'
                              icon={ scriptDeteccion.length ? <EyeOutlined /> : <PaperClipOutlined /> }
                              onClick={ () => setIsOpenModalScriptDeteccion(true) }
                           />
                        </Flex>
                     </Form.Item>
                  </Col>

                  <Col span={ 12 }>
                     <Form.Item
                        name='scriptValidacion'
                        label='Script Validación'
                        rules={[{ required: !(scriptValidacion.trim().length > 0), message: '¡Script requerido!' }]}
                     >
                        <Flex style={{ width: 110 }} justify='space-around'>
                           <Button
                              type={ scriptValidacion.length ? 'primary' : 'default' }
                              size='large'
                              shape='circle'
                              icon={ scriptValidacion.length ? <EyeOutlined /> : <PaperClipOutlined /> }
                              onClick={ () => setIsOpenModalScriptValidacion(true) }
                           />
                        </Flex>
                     </Form.Item>
                  </Col>

               </Row>

               <Form.Item>
                  <Button htmlType='submit' ref={ btnSubmitRef } style={{ display: 'none' }} />
               </Form.Item>
            </Form>
         </Drawer>

         {/* Modal  */}
         <CustomModal title='Sentencia SQL' isOpen={ isOpenModalDeteccion } handleIsOpen={ setIsOpenModalScriptDeteccion } >
            <Editor sentenciaSql={ scriptDeteccion } onChange={ setScriptDeteccion } width={ 1000 } />
         </CustomModal>

         <CustomModal title='Sentencia SQL' isOpen={ isOpenModalValidacion } handleIsOpen={ setIsOpenModalScriptValidacion } >
            <Editor sentenciaSql={ scriptValidacion } onChange={ setScriptValidacion } width={ 1000 } />
         </CustomModal>

      </>
   )
}
