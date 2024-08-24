import { Avatar, Card } from 'antd'

type Payload<T> = {
   chartType: undefined
   color: string
   dataKey: string
   fill: string
   formatter: undefined
   hide: boolean
   name: string
   payload: T
   type: undefined
   unit: undefined
   value: number
}

export type MyTooltipProps<T> = {
   active?: boolean
   payload?: Payload<T>[]
   label?: string
}

const { Meta } = Card

export const MyTooltipToChar = <T, >({ active, payload, label }: MyTooltipProps<T>) => {
   if (!active) return <></>

   console.log({ payload })

   return (
      <Card
         style={{ minWidth: 250 }}
      >
         <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title="Card title"
            description="This is the description"
         />
         <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            /* title={ `${payload?.[0].payload[title as keyof T]}` } */
            title={ label }
            description="This is the description"
         />
      </Card>
   )
}

// <Tooltip content={<CustomTooltip />} />
