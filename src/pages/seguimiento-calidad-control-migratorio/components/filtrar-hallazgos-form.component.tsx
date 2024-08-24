import { FC, useEffect } from 'react'

import {
   Button,
   Flex,
   Form,
   Select
} from 'antd'
import { useDimensionStore, useSeguimientoCalidadHallazgoStore } from '../../../stores'
import { SearchOutlined } from '@ant-design/icons'
import { useSeguimientoCalidadCMContext } from '../context'

type FormProps = {
   dimension: string
}

export const FiltrarHallazgosForm: FC = () => {
   const { dimensionDb, findAllRNDimension } = useDimensionStore()
   const { findAllHallazgosByPaginacion } = useSeguimientoCalidadHallazgoStore()
   const { setDimension } = useSeguimientoCalidadCMContext()

   useEffect(() => { findAllRNDimension() }, [])

   const handleSubmint = ({ dimension }: FormProps) => {
      findAllHallazgosByPaginacion({ currentPage: 1, recordsByPages: 20, dimension })
      setDimension(dimension)
   }

   return (
      <Form
         onFinish={handleSubmint}
         style={{ width: 610 }}
      >
         <Flex justify='space-between' gap={ 5 }>
            <Form.Item
               label='Buscar por tipo Dimensión'
               labelCol={{ span: 15 }}
               name='dimension'
               rules={[{ required: true, message: '¡Selecciona una dimensión!' }]}
            >
               <Select style={{ width: 280 }}>
                  {
                     dimensionDb.map(({ idDimension, nombre }) => (
                        <Select.Option key={idDimension} value={nombre}>{ nombre }</Select.Option>
                     ))
                  }
               </Select>
            </Form.Item>

            <Form.Item label=''>
               <Button
                  type='primary'
                  htmlType='submit'
                  icon={ <SearchOutlined /> }
               />
            </Form.Item>
         </Flex>
      </Form>
   )
}
