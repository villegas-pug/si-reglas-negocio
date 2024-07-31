import { FC, useState } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import { Rule } from 'antd/es/form'

const { Option } = Select

type Props = {
   isOpen: boolean
   setIsOpen: (open: boolean) => void
}

const reglasValidacion: Rule[] = [
   { required: true, message: '¡Campo requerido!' }
]

export const FormAsideFloat: FC<Props> = ({ isOpen, setIsOpen }) => {
   const [initialValues, setInitialValues] = useState({ definicionRegla: '' })

   const onClose = () => {
      setIsOpen(false)
   }

   return (
      <Drawer
         title="Crear nueva regla"
         width={ 720}
         onClose={ onClose }
         open={ isOpen }
         styles={{
            body: {
               paddingBottom: 80
            }
         }}
         extra={
            <Space>
               <Button onClick={onClose}>Cancelar</Button>
               <Button onClick={onClose} type="primary">Crear</Button>
            </Space>
         }
      >
         <Form layout="vertical" initialValues={ initialValues } clearOnDestroy>
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
                        <Option value="xiao">Dimensión 1</Option>
                        <Option value="mao">Dimensión 2</Option>
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={ 24 }>
                  <Button htmlType='reset' onClick={ () => setInitialValues({ definicionRegla: '' }) } >Reset</Button>
                  <Button onClick={ () => { setInitialValues({ definicionRegla: 'Nueva regla 01' }) } }>Set initial values</Button>
               </Col>
            </Row>
         </Form>
      </Drawer>
   )
}
