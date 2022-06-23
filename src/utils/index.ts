/*------------------------------------------------------------------------------
   About      : Utility methods
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
   
   Copyright (c) 2022 Obopay. All rights reserved.
------------------------------------------------------------------------------*/

import { Response } from "express"

export const sendErrorResponse = (res : Response, code : number, errorMessage :string, e = null) => res.status(code).send({
  message: errorMessage
})

export const sendSuccessResponse = (res : Response, code : number, successMessage : any) => res.status(code).send({
  message : successMessage
})
