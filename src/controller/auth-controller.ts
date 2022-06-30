/*------------------------------------------------------------------------------
   About      : Auth related Controllers
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

import { 
         Response 
        }                      from 'express'
import {      
         Login,      
         Retval,      
         SignUp      
       }                       from '../interfaces/api-interfaces'
import { sign }                from 'jsonwebtoken'
import { ConfigData }          from '../config/configs';
import { executeQuery }        from '../db';

//TODO : password should be encrypted

export class AuthController {

  async signup(params: SignUp.params) {
    if (!params.password || !params.role || !params.userName) {
      return {code : 400, error : 'invalid params'}
    }

    const results = await executeQuery(`select count(*) from one_com_user where username = '${params.userName}'`)
    if (results[0].count === '0') {

      const roleId = await this.getRoleId(params.role)
      if(roleId === -1) {
        return {code : 400, error : 'Role Not found'}
      }

      await executeQuery(`INSERT INTO one_com_user(username, password, role_id) VALUES ('${params.userName}', '${params.password}', ${roleId})`)

      return {code : 200, data : 'Successfully Signed Up'}
    }
    return {code : 409, error : 'Already registered'}
  }

  async login(params: Login.params) {

    if (!params.password || !params.userName) {
      return {code : 400, error : 'invalid params'}
    }

    const data = await executeQuery(`SELECT * FROM one_com_user where username = '${params.userName}' and password = '${params.password}'`)
    if (!(data && data.length)) {
      return {code : 400, error : 'Username and password not matching with our records!'}
    }

    const roleId = data[0].role_id

    const accessToken  = sign({ username: params.userName, role: roleId }, ConfigData.accessTokenSecret, { expiresIn: '20m' })

    return {code : 200, data :  {accessToken}}
  }

  private async getRoleId(roleName: string) {
    const results = await executeQuery(`SELECT id FROM one_com_role where role_name = '${roleName.toUpperCase()}'`)
    if (!(results && results.length)) {
      return -1
    }
    return Number(results[0].id)
  }
}