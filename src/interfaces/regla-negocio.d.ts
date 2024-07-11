export interface ReglaNegocio {
   idRegla: string
   tabla: string
   campos: string
   dimensionRegla: string
   definicionRegla: string
   totalRegCorrectos: number
   totalRegIncorrectos: number
   scriptSQLValidacion: string
   scriptSQLHallazgo: string
   statusRegla: string
}
