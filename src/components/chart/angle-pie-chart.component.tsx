import { PieChart, Pie, ResponsiveContainer } from 'recharts'

type Props<T> = {
   data: T[]
   dataKey: keyof T
   label: (data: T) => string
   colorFill: string
   width?: number
   height?: number
}

export const MyAnglePie = <T extends unknown>({ data, dataKey, label, colorFill, width = 400, height = 250 }: Props<T>) => {
   return (
      <ResponsiveContainer width={ width } height={ height }>
         <PieChart>
            <Pie
               data={data}
               dataKey={dataKey as string}
               fill={colorFill}
               startAngle={180}
               endAngle={0}
               cx='50%'
               cy='50%'
               outerRadius={80}
               label={label}
               fontSize={ 11 }
            />
         </PieChart>
      </ResponsiveContainer>
   )
}
