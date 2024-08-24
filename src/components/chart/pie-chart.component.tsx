import { FC } from 'react'

import { DefaultizedPieValueType, PieChart, PieValueType } from '@mui/x-charts'
import { Typography } from 'antd'

type Props = {
   title: string
   data: Omit<PieValueType, 'id'>[]
   arcLabel?: (params: Partial<DefaultizedPieValueType>) => string
   width?: number
   height?: number
}

export const MyPieChart: FC<Props> = ({ title, data, arcLabel, width = 200, height = 200 }) => {
   return (
      <div>
         <Typography.Title level={ 5 }>{ title }</Typography.Title>
         <PieChart
            title={ 'sdasdas' + title }
            series={[
               {
                  data,
                  innerRadius: 30,
                  outerRadius: 80,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  arcLabel
               }
            ]}
            width={ width }
            height={ height }
         />
      </div>
   )
}
