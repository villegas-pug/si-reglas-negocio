import { FC } from 'react'

import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import { Rule } from 'antd/es/form'

import { useReglaNegocioContext } from '../../context'
import { useDimensionStore } from '../../stores'

const { Option } = Select

const reglasValidacion: Rule[] = [
   { required: true, message: '¡Campo requerido!' }
]

export const FormAsideFloat: FC = () => {
   const { dimensionDb } = useDimensionStore()
   const { isOpenModalCrear, initialValues, setIsOpenModalCrear } = useReglaNegocioContext()

   const handleCloseModal = () => { setIsOpenModalCrear(false) }

   if (!isOpenModalCrear) return <></>

   return (
      <Drawer
         title="Crear nueva regla"
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
               <Button onClick={ handleCloseModal } type="primary">Crear</Button>
            </Space>
         }
      >
         <Form layout="vertical" initialValues={ initialValues }>
            <Row gutter={ 16 }>
               <Col span={ 24 }>
                  <Form.Item
                     name="definicionRegla"
                     label="Definición de la Regla"
                     rules={ reglasValidacion }
                  >
                     <Input placeholder="Ingresa definición de la regla" />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={ 12 }>
                  <Form.Item
                     name="tablas"
                     label="Tablas"
                     rules={ reglasValidacion }
                  >
                     <Input placeholder="Ingresar nombre de tablas" />
                  </Form.Item>
               </Col>
               <Col span={ 12 }>
                  <Form.Item
                     name="campos"
                     label="Campos"
                     rules={ reglasValidacion }
                  >
                     <Input placeholder="Ingresar nombre de campos" />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={ 12 }>
               <Col span={ 12 }>
                  <Form.Item
                     name="dimensionRegla"
                     label="Dimensión de Regla"
                     rules={ reglasValidacion }
                  >
                     <Select placeholder="Selecciona dimensión de la regla">
                        {
                           dimensionDb.map(({ idDimension, nombre }) => (
                              <Option key={idDimension} value={idDimension}>{ nombre }</Option>
                           ))
                        }
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </Drawer>
   )
}
