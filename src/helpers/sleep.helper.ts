export const sleep = (seconds: number = 2): Promise<boolean> => {
   return new Promise(resolve => {
      setTimeout(() => {
         resolve(true)
      }, seconds * 1000)
   })
}
