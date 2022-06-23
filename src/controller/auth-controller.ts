/*------------------------------------------------------------------------------
   About      : Auth related Controllers
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
   
   Copyright (c) 2022 Obopay. All rights reserved.
------------------------------------------------------------------------------*/

import { 
         Response 
        }                      from 'express'
import {      
         Login,      
         SignUp      
       }                       from '../interfaces/api-interfaces'
import { sign }                from 'jsonwebtoken'
import { ConfigData }          from '../config/configs';
import { sendSuccessResponse } from '../utils';
import { executeQuery }        from '../db';

//TODO : password should be encrypted

export class AuthController {

  async signup(params: SignUp.params, res: Response) {
    if (!params.password || !params.role || !params.userName) {
      throw Error('invalid params')
    }

    const results = await executeQuery(`select count(*) from one_com_user where username = '${params.userName}'`)
    if (results[0].count === '0') {

      const roleId = await this.getRoleId(params.role)

      await executeQuery(`INSERT INTO one_com_user(username, password, role_id) VALUES ('${params.userName}', '${params.password}', ${roleId})`)

      sendSuccessResponse(res, 200, 'Successfully Signed Up')
      return 
    }
    throw Error('Already registered')
    
  }

  async login(params: Login.params, res: Response) {

    if (!params.password || !params.userName) {
      throw Error('invalid params')
    }

    const data = await executeQuery(`SELECT * FROM one_com_user where username = '${params.userName}' and password = '${params.password}'`)
    if (!(data && data.length)) {
      throw Error('Username and password not matching with our records!')
    }

    const roleId = data[0].role_id

    const accessToken  = sign({ username: params.userName, role: roleId }, ConfigData.accessTokenSecret, { expiresIn: '20m' })

    res.status(200).json({ accessToken }).send()
  }

  private async getRoleId(roleName: string) {
    const results = await executeQuery(`SELECT id FROM one_com_role where role_name = '${roleName.toUpperCase()}'`)
    if (!(results && results.length)) {
      throw Error('invalid role')
    }
    return Number(results[0].id)
  }
}