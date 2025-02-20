import { FC } from 'react'

import { FormProps, Form, Select, Button, Descriptions, DescriptionsProps } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { Rule } from 'antd/es/form'

import { Asignacion } from '../../asignacion/models'
import { UpdateAssignmentDto } from '../interfaces'
import TextArea from 'antd/es/input/TextArea'
import { useAuditoriaAsignacionContext } from '../context'
import { adaptEntitiesToAntdesignOptionType } from '../../../../adapters'
import { useApiStatusStore } from '../../../../stores'
import { switchIsTrabajadoTaskAssignment, updateTaskAssignment } from '../services'
import { adaptNormalizeKeysFromAsignacion } from '../adapters'

const formRules: Rule[] = [
   { required: true, message: '¡Campo requerido!' }
]

type Props = {
   assign: Asignacion
}

export const UpdateTaskAssignmentForm: FC<Props> = ({ assign }) => {
   const { isLoading: isLoadingRequest } = useApiStatusStore()
   const { tipoJustificacionDb, findAllAssigsOfCurrentUserByParams } = useAuditoriaAsignacionContext()

   const itemsInfo: DescriptionsProps['items'] = adaptNormalizeKeysFromAsignacion(assign).map(([key, value]) => ({
      key,
      label: key,
      children: value
   }))

   const onFinish: FormProps<UpdateAssignmentDto>['onFinish'] = async (values) => {
      await updateTaskAssignment({
         ...values,
         idAsignacion: assign.idAsignacion
      })

      await switchIsTrabajadoTaskAssignment({ idAsignacion: assign.idAsignacion, trabajado: true })

      // Tipo Asignación: 1 | Unión
      findAllAssigsOfCurrentUserByParams({ idTipoAsignacion: 1 })
   }

   return (
      <div style={{ width: '50vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

         {/* Info  */}

         <Descriptions
            title="Asignación info"
            items={itemsInfo}
         />

         {/* Form */}
         <Form
            labelCol={{ span: 5 }}
            onFinish={onFinish}
            style={{ width: '100%', marginTop: 25 }}
         >
            <Form.Item
               name='idJustifica'
               label='Justificación'
               initialValue={ assign.nidJustifica }
               rules={ formRules }
            >
               <Select
                  size='large'
                  style={{ width: 300 }}
               >
                  {
                     adaptEntitiesToAntdesignOptionType(tipoJustificacionDb, 'sdescripcionJust', 'nidJustifica').map(({ label, value }) => (
                        <Select.Option key={ value } value={ value }>{ label }</Select.Option>
                     ))
                  }
               </Select>
            </Form.Item>

            <Form.Item
               name='observacion'
               label='Observaciones'
               initialValue={ assign.nobservacion }
               rules={ formRules }
            >
               <TextArea
                  size='large'
                  rows={ 10 }
               />
            </Form.Item>

            <Button
               htmlType='submit'
               type='primary'
               size='large'
               disabled={ isLoadingRequest }
               loading={ isLoadingRequest }
               icon={ <SaveOutlined style={{ fontSize: 20 }} /> }
            >
               Actualizar
            </Button>
         </Form>
      </div>
   )
}
