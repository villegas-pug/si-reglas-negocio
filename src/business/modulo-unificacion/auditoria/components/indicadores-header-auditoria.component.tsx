import { FC } from 'react'

import { AlertOutlined, NumberOutlined, ScheduleOutlined, UserAddOutlined } from '@ant-design/icons'
import { Row, Col, Statistic } from 'antd'
import { useAuditoriaAsignacionContext } from '../context'

export const IndicadoresHeaderAuditoria: FC = () => {
   const { asignacionDb } = useAuditoriaAsignacionContext()

   const totalAssigs = asignacionDb.length
   const totalAssigsWorked = asignacionDb.filter(assig => assig.btrabajado).length
   const totalAssigsJustifie = asignacionDb.filter(assig => assig.nidJustifica).length

   return (
      <Row gutter={ 24 } style={{ marginBottom: 10 }}>
         <Col span={ 8 }>
            <Statistic
               title='Total asignados'
               value={totalAssigs}
               prefix={<UserAddOutlined />}
               suffix={<NumberOutlined />}
               valueStyle={{ color: '#9c9a96' }}
            />
         </Col>
         <Col span={ 8 }>
            <Statistic
               title='Total trabajados'
               value={totalAssigsWorked}
               prefix={ <ScheduleOutlined /> }
               suffix={ <NumberOutlined /> }
               valueStyle={{ color: '#19c81d' }}
            />
         </Col>
         <Col span={ 8 }>
            <Statistic
               title='Total devueltos'
               value={totalAssigsJustifie}
               prefix={<AlertOutlined />}
               suffix={ <NumberOutlined /> }
               valueStyle={{ color: '#FF5733' }}
            />
         </Col>
      </Row>
   )
}
