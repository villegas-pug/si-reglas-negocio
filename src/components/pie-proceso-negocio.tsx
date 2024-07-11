import { FC } from 'react'

import { PieChart } from '@mui/x-charts/PieChart'
import { MakeOptional } from '@mui/x-charts/internals'
import { DefaultizedPieValueType, pieArcLabelClasses, PieValueType } from '@mui/x-charts'

type Props = {
   data: MakeOptional<PieValueType, 'id'>[]
   width?: number
   height?: number
}

export const PieProcesoNegocio: FC<Props> = ({ data, width = 450, height = 250 }) => {
   const TOTAL = data.map(item => item.value).reduce((acc, curr) => acc + curr, 0)

   const getArcLabel = (params: Partial<DefaultizedPieValueType>) => {
      const percent = params.value! / TOTAL
      return `${(percent * 100).toFixed(0)}%`
   }

   return (
      <PieChart
         series={[
            {
               data,
               innerRadius: 30,
               outerRadius: 100,
               paddingAngle: 5,
               cornerRadius: 5,
               arcLabel: getArcLabel
            }
         ]}
         sx={{
            [`& .${pieArcLabelClasses.root}`]: {
               fill: 'white',
               fontSize: 15
            }
         }}
         width={ width }
         height={ height }
      />
   )
}
