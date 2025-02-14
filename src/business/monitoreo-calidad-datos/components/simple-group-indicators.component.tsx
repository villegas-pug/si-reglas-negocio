import { ArrowUpOutlined } from '@ant-design/icons'
import { Card, Flex, Statistic } from 'antd'

type Props<T> = {
   data: T[]
   getKey: (it: T) => string
   getTitle: (it: T) => string
   getValue: (it: T) => number
   getValueColor: (it: T) => string
   width?: number
   height?: number
}

export const SimpleGroupIndicators = <T extends unknown>({ data, getKey, getTitle, getValue, getValueColor, width = 500, height = 350 }: Props<T>) => {
   return (
      <Flex wrap gap={ 5 } align='center' justify='space-around' style={{ width, height, overflow: 'auto' }}>
         {
            data.map(it => (
               <Card key={ getKey(it) } size='small' style={{ minWidth: 200 }}>
                  <Statistic
                     title={ getTitle(it) }
                     value={ getValue(it) }
                     prefix={<ArrowUpOutlined />}
                     valueStyle={{ color: getValueColor(it) }}
                  />
               </Card>
            ))
         }
      </Flex>
   )
}
