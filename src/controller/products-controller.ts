/*------------------------------------------------------------------------------
   About      : Products related Controller
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

import { 
         Request, 
         Response 
        }                      from "express"

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
    return {code : 200, data : message}
  }
}