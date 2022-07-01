/*------------------------------------------------------------------------------
   About      : Spec file for testing using Jest
   
   Created on : Fri Jul 01 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

import { GetProducts, Login, SignUp } from "../interfaces"

const TestSuitesName  = {
  Login   : 'Login',
  Signup  : 'Signup',
  Products: 'Products'
}

const request   = require('supertest'),
      appServer = require('../index')

describe(TestSuitesName.Login, () => {
  it('should create a new post', async () => {
    const res = await request(appServer)
      .post(Login.path)
      .send({
        userName: '',
        password: '',
      })
    expect(res.statusCode).toEqual(400)
  })

  it('should be valid login', async () => {
    const res = await request(appServer)
      .post(Login.path)
      .send({
        userName: 'Ajith',
        password: 'test',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.accessToken).toBeTruthy()
  })

  it('should be invalid login', async () => {
    const res = await request(appServer)
      .post(Login.path)
      .send({
        userName: 'Ajith12',
        password: 'password wrong',
      })
    expect(res.statusCode).toEqual(400)
    
  })
})

describe(TestSuitesName.Signup, () => {
  it('should create a new post', async () => {
    const res = await request(appServer)
      .post(SignUp.path)
      .send({
        userName: '',
        password: '',
        role    : ''
      })
    expect(res.statusCode).toEqual(400)
  })

  it('should be valid Signup', async () => {
    const res = await request(appServer)
      .post(SignUp.path)
      .send({
        userName: `TestUser${Date.now()}`,
        password: 'test',
        role    : 'ADMIN'
      })
    expect(res.statusCode).toEqual(200)
  })

  it('should be already exist', async () => {
    const res = await request(appServer)
      .post(SignUp.path)
      .send({
        userName: `Ajith`,
        password: 'test',
        role    : 'ADMIN'
      })
    expect(res.statusCode).toEqual(409)
  })

  it('invalid role', async () => {
    const res = await request(appServer)
      .post(SignUp.path)
      .send({
        userName: `TestUser${Date.now()}`,
        password: 'test',
        role    : 'role'
      })
    expect(res.statusCode).toEqual(400)
  })
})

describe(TestSuitesName.Products, () => {
  it('should create a new post', async () => {
    const res = await request(appServer)
      .post(GetProducts.path)
      .send({})
    expect(res.statusCode).toEqual(401)
  })

  it('should be valid Products', async () => {
    const res = await request(appServer)
      .post(Login.path)
      .send({
        userName: 'Ajith',
        password: 'test',
      })
    expect(res.statusCode).toEqual(200)
    
    const token = res.body.accessToken

    const res2 = await request(appServer)
      .post(GetProducts.path)
      .set('Authorization', 'Bearer ' + token)
      .send({})
    expect(res2.statusCode).toEqual(200)
    
    const res3 = await request(appServer)
      .get(GetProducts.path)
      .set('Authorization', 'Bearer ' + token)
      .send({})
    expect(res3.statusCode).toEqual(200)

    const res4 = await request(appServer)
      .delete(GetProducts.path)
      .set('Authorization', 'Bearer ' + token)
      .send({})
    expect(res4.statusCode).toEqual(200)

    const res5 = await request(appServer)
      .put(GetProducts.path)
      .set('Authorization', 'Bearer ' + token)
      .send({})
    expect(res5.statusCode).toEqual(200)
  })

  it('invalid token', async () => {
    const res2 = await request(appServer)
      .post(GetProducts.path)
      .set('Authorization', 'Bearer ' + 'invalid_token_passed')
      .send({})
    expect(res2.statusCode).toEqual(403)
  })

  it('should be valid Products', async () => {
    const res = await request(appServer)
      .post(Login.path)
      .send({
        userName: 'appa',
        password: 'test',
      })
    expect(res.statusCode).toEqual(200)
    
    const token = res.body.accessToken
    
    const res2 = await request(appServer)
      .delete(GetProducts.path)
      .set('Authorization', 'Bearer ' + token)
      .send({})
    expect(res2.statusCode).toEqual(401)
  })
})