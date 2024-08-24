export interface MetricaResumenJZ {

   tabla: string
   totalRegistros: number
   totalRegistrosIncumplen: number

}

export interface MetricaDependenciaJZ {

   dependencia: string
   sigla: string
   total: number

}

export interface MetricaOperadorJZ {

   tabla: string
   loginOpeDigita: string
   nombreOpeDigita: string
   total: number

}

export interface MetricaOperadorJZInternal {

   loginOpeDigita: string
   simMovMigra: number
   simPersona: number

}

export interface MetricaDatoInvalidoJZ {

   camposErrCsv: string
   total: number

}

export interface MetricaDatoInvalidoJZInternal {

   /* regla: string */
   campo: string
   total: number

}
