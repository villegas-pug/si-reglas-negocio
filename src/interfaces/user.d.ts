export interface User {
   user: string
   password: string
   access?: Access[]
}

interface Access {
   title: string
   description: string
   path: string
}
