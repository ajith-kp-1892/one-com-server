/*------------------------------------------------------------------------------
   About      : Server starts from here
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
   
   Copyright (c) 2022 Obopay. All rights reserved.
------------------------------------------------------------------------------*/

import express, { Request, Response }        from 'express'
import { GetProducts, Login, SignUp }        from './interfaces'
import { canAuthenticate }                   from './middleware/auth'
import { ConfigData }                        from './config/configs'
import { canAccess }                         from './middleware/canAccess'
import { ProductController }                 from './controller/products-controller'
import { AuthController }                    from './controller/auth-controller'

const bodyParser = require('body-parser'),
      cors       = require('cors')


export class App {

  appServer         = express();
  productController = new ProductController();
  authController    = new AuthController();

  public init() {

    this.appServer.use(bodyParser.urlencoded({ extended: false }))
    this.appServer.use(bodyParser.json())

    this.appServer.listen(ConfigData.port, () => {
      console.log(`Server is running at https://localhost:${ConfigData.port}`)
    })

    this.initRoutes()
  }


  private initRoutes() {

    this.appServer.use(cors())

    this.appServer.post(SignUp.path, async (req: Request, res: Response) => {
      try {
        await this.authController.signup(req.body as SignUp.params, res)
      } catch (err) {
        res.status(500)
        return res.json({ error: (err as any).message })
      }
    })

    this.appServer.post(Login.path, async (req: Request, res: Response) => {
      try {
        await this.authController.login(req.body as Login.params, res)
      } catch (err) {
        res.status(500)
        return res.json({ error: (err as any).message })
      }
    })

    this.appServer.post(GetProducts.path, canAuthenticate, canAccess, async (req: Request, res: Response) => {
      try {
        await this.productController.products(req, res)
      } catch (err) {
        return res.status(500).json({ error: (err as any).message })
      }
    })

    this.appServer.get(GetProducts.path, canAuthenticate, canAccess, async (req: Request, res: Response) => {
      try {
        await this.productController.products(req, res)
      } catch (err) {
        return res.status(500).json({ error: (err as any).message })
      }
    })

    this.appServer.put(GetProducts.path, canAuthenticate, canAccess, async (req: Request, res: Response) => {
      try {
        await this.productController.products(req, res)
      } catch (err) {
        return res.status(500).json({ error: (err as any).message })
      }
    })

    this.appServer.patch(GetProducts.path, canAuthenticate, canAccess, async (req: Request, res: Response) => {
      try {
        await this.productController.products(req, res)
      } catch (err) {
        return res.status(500).json({ error: (err as any).message })
      }
    })

    this.appServer.delete(GetProducts.path, canAuthenticate, canAccess, async (req: Request, res: Response) => {
      try {
        await this.productController.products(req, res)
      } catch (err) {
        return res.status(500).json({ error: (err as any).message })
      }
    })

    this.appServer.all('*', (req, res) => {
      res.status(403).send({
        status: 'error',
        error: 'not authorized'
      })
    });
  }
}

new App().init()

