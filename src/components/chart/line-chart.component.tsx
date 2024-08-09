import { FC, useMemo } from 'react'
import { AxisOptions, Chart, UserSerie } from 'react-charts'
import { EjecucionScriptDeteccion } from '../../models'

type LineChartProps = {
   label: string
   data: EjecucionScriptDeteccion[]
   width?: number | string
   height?: number
}

export const LineChart: FC<LineChartProps> = ({ label, data: dataSeries, width = 300, height = 300 }) => {
   const data: UserSerie<EjecucionScriptDeteccion>[] = [
      {
         label,
         data: dataSeries
      }
   ]

   if (dataSeries.length === 0) return <></>

   const primaryAxis = useMemo((): AxisOptions<EjecucionScriptDeteccion> => ({
      getValue: record => record.fechaEjecucion,
      elementType: 'line'
   }), [])
   const secondaryAxes = useMemo((): AxisOptions<EjecucionScriptDeteccion>[] => [{ getValue: record => record.resultado, elementType: 'line' }], [])

   return (
      <div style={{ width, height }}>
         <Chart
            options={{
               data,
               primaryAxis,
               secondaryAxes
            }}
         />
      </div>
   )
}
