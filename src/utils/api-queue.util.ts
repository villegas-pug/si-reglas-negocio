type Queue = {
   requestMethod: <D>(...params: []) => Promise<D>
   resolve: (isResolved: boolean) => void
   reject: (err: unknown) => void
   loading: boolean
}

export class ApiQueue {
   private processing: boolean
   private queue: Array<Queue>

   constructor () {
      this.processing = false
      this.queue = []
   }

   addToQueue (requestMethod: any) {
      return new Promise((resolve, reject) => {
         this.queue.push({
            requestMethod,
            resolve,
            reject,
            loading: false
         })

         this.processQueue()
      })
   }

   async processQueue () {
      if (this.processing) return

      this.processing = true

      const call = this.queue.shift()
      if (!call) return // Termina la ejecución recursica ...

      try {
         call.loading = true
         await call.requestMethod()
         call.resolve(true)
      } catch (error) {
         call.reject(error)
      } finally {
         call.loading = false
      }

      this.processQueue()
   }
}
