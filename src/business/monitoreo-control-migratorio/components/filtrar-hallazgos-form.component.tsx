import { FC } from 'react'

import {
   Button,
   Flex,
   Form,
   DatePicker,
   Typography,
   Space
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useMonitoreoControlMigratorioContext } from '../context'
import { formatNumber } from '../../utils'

type FormProps = {
   rangoFechas: any[]
}

const RangePicker = DatePicker.RangePicker

const { Title, Text } = Typography

export const FiltrarHallazgosForm: FC = () => {
   const { totalHallazgosControlMigratorio, findAllHallazgosByPaginacion, setRangoFechasFilter } = useMonitoreoControlMigratorioContext()

   const handleSubmint = ({ rangoFechas }: FormProps) => {
      const fecIni = new Date(rangoFechas[0].$y, rangoFechas[0].$M, rangoFechas[0].$D)
      const fecFin = new Date(rangoFechas[1].$y, rangoFechas[1].$M, rangoFechas[1].$D)

      findAllHallazgosByPaginacion({
         currentPage: 1,
         recordsByPages: 20,
         fecIni,
         fecFin
      })

      setRangoFechasFilter({ fecIni, fecFin })
   }

   return (
      <Flex>

         <Space>
            <Text type='secondary'>Resultado: </Text>
            <Title level={ 3 } type='success'>{ formatNumber(totalHallazgosControlMigratorio) }</Title>
         </Space>

         <Form
            onFinish={handleSubmint}
            style={{ width: 650 }}
         >
            <Flex justify='space-between' gap={ 5 }>
               <Form.Item
                  label='Buscar por rango fechas'
                  labelCol={{ span: 15 }}
                  name='rangoFechas'
                  rules={[{ required: true, message: '¡Ingresa rango de fechas!' }]}
               >
                  <RangePicker style={{ width: 300 }} />
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
      </Flex>
   )
}
