export interface PaginacionHallazgos {
   idJefatura?: string
   currentPage: number
   recordsByPages: number
   fecIni?: Date
   fecFin?: Date
}

export type RangoFechas = { fecIni: Date, fecFin: Date }
