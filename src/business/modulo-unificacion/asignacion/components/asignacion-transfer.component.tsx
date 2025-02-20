import { FC } from 'react'
import { Transfer } from 'antd'
import type { TransferProps } from 'antd'
import { useAsignacionContext } from '../context'

const AsignacionTransfer: FC = () => {
   const { availableUsers, selectedIdsOperador, addIdsOperadorToSelection } = useAsignacionContext()

   const onChange: TransferProps['onChange'] = (newTargetKeys, _direction, _moveKeys) => {
      addIdsOperadorToSelection(newTargetKeys)
   }

   return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
         <Transfer
            titles={['Usuarios disponibles', 'Usuarios seleccionados']}
            dataSource={ availableUsers }
            targetKeys={ selectedIdsOperador }
            onChange={ onChange }
            render={ (item) => `${item.nombres}` }
            rowKey={(item) => item.idOperador}
            listStyle={{ width: '30rem', height: '60vh' }}
            pagination={{ pageSize: 10 }}
            oneWay
         />
      </div>
   )
}

export default AsignacionTransfer
