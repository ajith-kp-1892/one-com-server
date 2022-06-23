/*------------------------------------------------------------------------------
   About      : API declaration
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
   
   Copyright (c) 2022 Obopay. All rights reserved.
------------------------------------------------------------------------------*/

export namespace SignUp {
  export const path  =  '/signup'

  export type params  = {
    userName : string
    password : string
    role     : 'ADMIN'| 'SELLER' | 'SUPPORTER'|'CUSTOMER' 
  }
}

export namespace Login {
  export const path  = '/login'

  export type params  = {
    userName : string
    password : string
  }
}

export namespace GetProducts {
  export const path  =  '/products'

  export type params  = {
  }
}