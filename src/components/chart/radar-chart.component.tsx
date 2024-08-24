import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

type Props<T> = {
   data: T[]
   angleAxisDataKey: keyof T
   radarDataKey: keyof T
   colorStroke: string
   colorFill: string
   width?: number
   height?: number
}

export const MyRadarChart = <T extends unknown>({ data, angleAxisDataKey, radarDataKey, colorStroke, colorFill, width = 700, height = 400 }: Props<T>) => {
   return (
      <ResponsiveContainer width={ width } height={ height }>
         <RadarChart
            cx='50%'
            cy='50%'
            outerRadius='65%'
            data={data}
         >
            <PolarGrid />
            <PolarAngleAxis dataKey={angleAxisDataKey as string} tick={{ fontSize: 10 }} />
            <Tooltip />
            <PolarRadiusAxis />
            <Radar dataKey={ radarDataKey as string } stroke={ colorStroke } fill={ colorFill } fillOpacity={ 0.6 } />
         </RadarChart>
      </ResponsiveContainer>
   )
}
