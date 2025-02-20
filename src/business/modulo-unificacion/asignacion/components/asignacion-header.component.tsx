import { FC } from 'react'

import {
   Button,
   Input,
   Select,
   Form,
   DatePicker
} from 'antd'
import { NumberOutlined, SaveOutlined } from '@ant-design/icons'
import { useAsignacionContext } from '../context'
import dayjs from 'dayjs'

import type { FormProps } from 'antd'
import { RegisterAssignmentDto } from '../interfaces'
import { Rule } from 'antd/es/form'
import { registerTasksAssignment } from '../services'
import { useApiStatusStore } from '../../../../stores'
import { adaptEntitiesToAntdesignOptionType } from '../../../../adapters'

const inputAsignHeaderRules: Rule[] = [{
   required: true, message: '¡Campo requerido!'
}]

export const AsignacionHeader: FC = () => {
   const { isLoading: isLoadingRequets } = useApiStatusStore()
   const { tipoAsignacionDb, selectedIdsOperador, resetSelectedIdsOperador } = useAsignacionContext()

   const [frmAssign] = Form.useForm()

   const onFinish: FormProps<RegisterAssignmentDto>['onFinish'] = async ({ cantidad, fechaAsignaciones, idTipoAsignacion }) => {
      const registerAssignment: Partial<RegisterAssignmentDto>[] = selectedIdsOperador.map(idOperador => {
         return ({
            cantidad,
            fechaAsignaciones,
            idTipoAsignacion,
            idOperador: Number(idOperador)
         })
      })

      // Reset input's
      await registerTasksAssignment(registerAssignment)
      frmAssign.setFieldsValue({
         fechaAsignacion: dayjs()
      })

      resetSelectedIdsOperador()
   }

   const disabledDate = (current: any) => {
      return current && current < dayjs().startOf('day')
   }

   return (
      <Form
         form={ frmAssign }
         layout='horizontal'
         onFinish={onFinish}
         style={{ margin: 'auto', minWidth: 1700, display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}
      >
         <Form.Item
            name='cantidad'
            label='Cantidad'
            initialValue={ 300 }
            rules={ inputAsignHeaderRules }
         >
            <Input
               type='number'
               size='large'
               prefix={<NumberOutlined />}
               style={{
                  width: 150,
                  color: '#19c822',
                  fontSize: 18
               }}
               autoFocus
            />
         </Form.Item>

         <Form.Item
            name='fechaAsignaciones'
            label='Fecha asignación'
            initialValue={ dayjs() }
            rules={ inputAsignHeaderRules }
         >
            <DatePicker
               multiple
               maxTagCount='responsive'
               size='large'
               style={{ width: 900 }}
               disabledDate={disabledDate}
            />

         </Form.Item>

         <Form.Item
            name='idTipoAsignacion'
            label='Tipo asignación'
            initialValue={ 1 }
            rules={ inputAsignHeaderRules }
         >
            <Select
               size='large'
               style={{ width: 120 }}
               disabled
            >
               {
                  adaptEntitiesToAntdesignOptionType(tipoAsignacionDb, 'sDetalleAsignacion', 'idTipoAsignacion').map(({ label, value }) => (
                     <Select.Option key={ value } value={ value }>{ label }</Select.Option>
                  ))
               }
            </Select>
         </Form.Item>

         <Button
            htmlType='submit'
            type='primary'
            size='large'
            disabled={selectedIdsOperador.length === 0}
            loading={ isLoadingRequets }
            icon={ <SaveOutlined style={{ fontSize: 20 }} /> }
         >
            Asignar
         </Button>
      </Form>
   )
}
