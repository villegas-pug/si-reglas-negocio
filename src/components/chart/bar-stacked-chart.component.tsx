import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type Props<T> = {
   data: T[]
   xAxis: keyof T
   dataKey1: keyof T
   colorDataKey1: string
   dataKey2: keyof T
   colorDataKey2: string
   width: number
   height: number
   /* Tooltip: (props: MyTooltipProps<T>) => ReactElement */
}

export const MyStackedBar = <T extends unknown>({ data, xAxis, dataKey1, colorDataKey1, dataKey2, colorDataKey2, width, height }: Props<T>) => {
   return (
      <div style={ { width, overflowY: 'hidden', overflowX: 'auto' } }>
         <ResponsiveContainer minWidth={ width } height={ height } >
            <BarChart
               data={data}
            >
               <CartesianGrid strokeDasharray='3 3' />
               <XAxis dataKey={ xAxis as string } angle={ -10 } tick={{ fontSize: TICK_FONT_SIZE }} />
               {/* <Tooltip content={ <MyTooltipToChar<T> /> } /> */}
               <Tooltip />
               <YAxis tick={{ fontSize: TICK_FONT_SIZE }} />
               <Bar dataKey={ dataKey1 as string } stackId='a' fill={ colorDataKey1 } />
               <Bar dataKey={ dataKey2 as string } stackId='a' fill={ colorDataKey2 } />
            </BarChart>
         </ResponsiveContainer>
      </div>
   )
}

const TICK_FONT_SIZE = 9
