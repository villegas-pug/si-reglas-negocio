export * from './localstorage'
export * from './procesos'

export const XAMPLE_SQL = `
                              DROP TABLE IF EXISTS #tmp_i_tmm
                              SELECT
                                 mm.sIdMovMigratorio,
                                 mm.uIdPersona,
                                 mm.sTipo,
                                 [dFechaControl] = CAST(mm.dFechaControl AS DATE),
                                 [dFechaProgramada(SimItinerario)] = CAST(i.dFechaProgramada AS DATE),
                                 [sNumeroNave(SimItinerario)] = i.sNumeroNave,
                                 [nIdTransportista(SimItinerario)] = i.nIdTransportista,
                                 [sTipo(SimItinerario)] = i.sTipoMovimiento

                                 INTO #tmp_i_tmm
                              FROM SimMovMigra mm
                              JOIN SimItinerario i ON mm.sIdItinerario = i.sIdItinerario
                              WHERE
                                 mm.bAnulado = 0
                                 AND mm.bTemporal = 0
                                 AND mm.sIdDependencia = '27' -- 27 ↔ A.I.J.CH.
                                 AND (mm.sTipo IN ('E', 'S') AND i.sTipoMovimiento IN ('E', 'S'))
                                 AND mm.sTipo != i.sTipoMovimiento -- Distinto tipo de movimiento (SIM.dbo.SimMovMigra.sTipo != SIM.dbo.SimItinerario.sTipoMovimiento)
`
