import React, { FC, useState } from 'react'

import {
   Button, Input, Select, Checkbox, Form,
   Cascader,
   ColorPicker,
   DatePicker,
   InputNumber,
   Radio,
   Rate,
   Slider,
   Switch,
   TreeSelect,
   Upload
} from 'antd'
import { NumberOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons'
import { useAsignacionContext } from '../context'
import { TipoAsignacion } from '../models'
import { DefaultOptionType } from 'antd/es/select'

import type { FormProps } from 'antd'

const adaptTipoAsignacionToOptionType = (tipoAsignaciones: TipoAsignacion[]) => {
   const optionTypes: DefaultOptionType[] = tipoAsignaciones.map(tipo => ({
      label: tipo.sDetalleAsignacion,
      value: tipo.idTipoAsignacion
   }))
   return optionTypes
}

export const AsignacionHeader: FC = () => {
   const { tipoAsignacionDb } = useAsignacionContext()

   const tipoAsignaciones = adaptTipoAsignacionToOptionType(tipoAsignacionDb)

   return (
      <div style={{
         margin: 'auto',
         width: '52vw',
         height: 100,
         display: 'flex',
         justifyContent: 'flex-start',
         alignItems: 'center',
         gap: 5
      }}>

         <Input
            type='date'
            size='large'
            /* prefix={<NumberOutlined />} */
            style={{
               width: 155
            }}
            autoFocus
         />

         <Select
            placeholder='Selecciona asignación'
            optionFilterProp='label'
            size='large'
            /* onChange={onChange} */
            options={ tipoAsignaciones }
            style={{
               width: 220
            }}
         />

         <Button
            size='large'
            icon={ <SaveOutlined style={{ fontSize: 20 }} /> }
         >
            Registrar
         </Button>

      </div>
   )
}

const FormDisabledDemo: React.FC = () => {
   const onFinish: FormProps = (values) => {
      console.log({ values })
   }

   return (
      <>
         <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={ onFinish }
         >

            <Form.Item label="Input">
               <Input
                  type='number'
                  name=
                  size='large'
                  defaultValue={ '200' }
                  prefix={<NumberOutlined />}
                  style={{
                     width: 120,
                     color: '#19c822',
                     fontSize: 22
                  }}
                  autoFocus
               />
            </Form.Item>

            <Form.Item label="Select">
               <Select>
                  <Select.Option value="demo">Demo</Select.Option>
               </Select>
            </Form.Item>

            <Form.Item label="DatePicker">
               <DatePicker />
            </Form.Item>

            <Form.Item label="InputNumber">
               <InputNumber />
            </Form.Item>

            <Form.Item label="Button">
               <Button>Button</Button>
            </Form.Item>

         </Form>
      </>
   )
}

export default () => <FormDisabledDemo />
