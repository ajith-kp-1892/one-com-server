/*------------------------------------------------------------------------------
   About      : Utility methods
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

export const logger = (apiName : string, method : string, type: string,  data : any) => {
  const value = data ? typeof(data) === 'object' ? JSON.stringify(data) : data.toString() : ''
  console.log(`${new Date().toLocaleString()} ${apiName} ${method} ${type} ${value} \n`)
}
