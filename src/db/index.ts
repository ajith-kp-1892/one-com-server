/*------------------------------------------------------------------------------
   About      : Db related operation
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

import { ConfigData }  from '../config/configs'
import pgPromise       from 'pg-promise'

const pg        = pgPromise({});

const db = pg(ConfigData.dbConfig);

export async function executeQuery(query : string) {
  console.log('executing', query)
  return await db.query(query)
}