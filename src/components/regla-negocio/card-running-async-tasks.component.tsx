import { FC, useCallback, useEffect } from 'react'
import { Button, Flex, Descriptions, Tag, Divider, Tooltip } from 'antd'
import type { DescriptionsProps } from 'antd'
import { CaretRightOutlined, PauseOutlined, RetweetOutlined } from '@ant-design/icons'

import { useQueueApi } from '../../hooks'
import { AsyncIterable, StatusOfProcessed } from '../../interfaces'

type Props = {
   asyncTasks: AsyncIterable[]
}

export const CardRunningAsyncTasks: FC<Props> = ({ asyncTasks }) => {
   const { isPauseQueueApi, notyQueueApiStatus, toggleQueueApi, addToQueueApi } = useQueueApi()

   useEffect(() => { toggleQueueApi(false) }, [])

   const handleExecute = useCallback(() => {
      addToQueueApi(asyncTasks)
   }, [asyncTasks])

   const callsErr = notyQueueApiStatus.callsErr.calls

   const handleToggleQueueApi = () => {
      if (!notyQueueApiStatus.processing) return
      if (!isPauseQueueApi) {
         toggleQueueApi(true)
         return
      }

      toggleQueueApi(false)
   }

   return (
      <Flex vertical gap={10} style={{ width: 520 }}>
         <Flex gap={2}>
            <Tooltip title='Iniciar'>
               <Button
                  shape='round'
                  size='middle'
                  icon={ <CaretRightOutlined /> }
                  loading={ notyQueueApiStatus.processing }
                  onClick={ handleExecute }
               />
            </Tooltip>

            <Tooltip title={ isPauseQueueApi ? 'Reanudar' : 'Pausar'}>
               <Button
                  shape='round'
                  size='middle'
                  icon={ isPauseQueueApi ? <RetweetOutlined /> : <PauseOutlined /> }
                  disabled={!notyQueueApiStatus.processing}
                  onClick={ handleToggleQueueApi }
               />
            </Tooltip>
         </Flex>

         <Descriptions
            title='Estado de ejecución de reglas:'
            size='middle'
            items={ getDescriptionItems(notyQueueApiStatus) }
         />

         {/* Reglas no enjecutadas */}
         {
            callsErr.length > 0 && (
               <>
                  <Divider>Reglas no ejecutadas</Divider>
                  <Flex gap={ 2 } wrap >
                     {
                        callsErr.map(regla => (
                           <Tag key={ regla } color='error'>{ regla }</Tag>
                        ))
                     }

                  </Flex>
               </>
            )
         }
      </Flex>

   )
}

const getDescriptionItems = (queueApiStatus: StatusOfProcessed) => {
   const descriptions: DescriptionsProps['items'] = [
      {
         key: 1,
         label: 'Total reglas',
         children: queueApiStatus.callsToExecute
      }, {
         key: 2,
         label: 'Ejecutadas',
         children: queueApiStatus.callsExecuted
      }, {
         key: 3,
         label: 'No ejecutadas',
         children: queueApiStatus.callsErr.total
      }
   ]

   return descriptions
}
