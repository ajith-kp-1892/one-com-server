/*------------------------------------------------------------------------------
   About      : Middleware to check the user has the proper access or not
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

import { ConfigData } from '../config/configs'
import { Response }   from 'express'
const jwt = require('jsonwebtoken')

export const canAuthenticate = (req : any, res : Response, next : any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, ConfigData.accessTokenSecret, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req['userInfo'] = user
      next()
      return
    })
  } else {
    res.locals.resp = { code : 401,error: 'unauthorized'}
    res.status(401).json('Not authorized to access endpoint')
  }
}