export interface HallazgoControlMigratorio {
   uIdPersona: string;
   sIdMovMigratorio: string;
   dFechaControl: string;
   sNombres: string
   sTipo: string;
   nIdCalidad: number;
   sCalidad: string;
   sIdPaisNacionalidad: string;
   sIdDocumento: string;
   sNumeroDoc: string;
   sIdPaisMov: string;
   nPermanencia: number;
   sNombre: string;
   sPaterno: string;
   sMaterno: string;
   sSexo: string;
   dFechaNacimiento: Date;
   sIdItinerario: string | null;
   dFechaProgramada: string | null;
   sTipoMovimiento: string | null;
   nCantidadMov: string | null
   sNumeroNave: string | null
   sLoginOpeDigita: string
   sNombreOpeDigita: string

   // Aux
   sIdDependencia: string | null
   sDimension: string
   sCamposErrCsv: string | null

   stabla: string | null
   nIdProceso: string | null
   jDatosDuplicados: string

   // Paginacion
   nTotalRows: number
}

export interface HallazgoControlMigratorioInternal extends HallazgoControlMigratorio {
   key: string
}
