export const formatDatetimeStrToDatetime = (datetime: string) => {
   // 2024-08-22T23:00:59.000+00:00

   const date = datetime.trim().slice(0, 10)
   const time = datetime.trim().slice(11, 19)

   return `${date} ${time}`
}
