/*------------------------------------------------------------------------------
   About      : authorization control for role based
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
   
   Copyright (c) 2022 Obopay. All rights reserved.
------------------------------------------------------------------------------*/

import { Response }          from 'express'
import { sendErrorResponse } from "../utils";
import { executeQuery }      from '../db';


export const canAccess = async (req: any, res: Response, next: any) => {
  if(req.userInfo && req.userInfo.role) {

    const role    = req.userInfo.role,
          url     = req.originalUrl,
          method  = req.method

    const data = await executeQuery(`select id from one_com_permission where endpoint = '${url}' and  method ='${method}' and role_id = ${role}`)

    if(data && data.length && data[0].id) {
      next()
    }
  }
  sendErrorResponse(res, 401, "Not authorized to access endpoint")
}