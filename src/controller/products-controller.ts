/*------------------------------------------------------------------------------
   About      : Products related Controller
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
   
   Copyright (c) 2022 Obopay. All rights reserved.
------------------------------------------------------------------------------*/

import { 
         Request, 
         Response 
        }                      from "express"
import { sendSuccessResponse } from "../utils";

export class ProductController {

  async products(req: Request, res: Response) {
    
    let message = 'Please enter valid request'
    switch (req.method) {
      case 'POST':
        message = 'Product added successfully'
        break

      case 'GET':
        message = 'Products sent successfully'
        break

      case 'PUT':
      case 'PATCH':
        message = 'Product updated successfully'
        break

      case 'DELETE':
        message = 'Product deleted successfully'
        break
    }
    sendSuccessResponse(res, 200, message)
    return res
  }
}