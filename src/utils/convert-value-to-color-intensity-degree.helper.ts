type Color = 'R' | 'G' | 'B'

const BASE_OPACITY = 0.4

export const convertValueToColorIntensityDegree = (color: Color, value: number, total: number) => {
   const PERCENTAGE_OF_TOTAL = value / total
   const FINAL_OPACITY = BASE_OPACITY + PERCENTAGE_OF_TOTAL

   switch (color) {
   case 'R':
      return `rgba(255, 0, 0, ${FINAL_OPACITY})`
   default:
      return `rgba(255, 0, 0, ${FINAL_OPACITY})`
   }
}
