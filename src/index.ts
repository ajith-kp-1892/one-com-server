/*------------------------------------------------------------------------------
   About      : Server starts from here
   
   Created on : Thu Jun 23 2022
   Author     : Ajith K P
------------------------------------------------------------------------------*/

import express, { Request, Response }        from 'express'
import { GetProducts, Login, SignUp }        from './interfaces'
import { canAuthenticate }                   from './middleware/auth'
import { ConfigData }                        from './config/configs'
import { canAccess }                         from './middleware/canAccess'
import { ProductController }                 from './controller/products-controller'
import { AuthController }                    from './controller/auth-controller'
import { logger }                            from './utils'

const bodyParser = require('body-parser'),
      cors       = require('cors')


const client    = require('prom-client'),
      metricsInterval =client.collectDefaultMetrics()

const httpRequestDurationMicroseconds  = new client.Histogram({
  name       : 'http_request_duration_ms',
  help       : 'Duration of HTTP requests in ms',
  labelNames : ['method', 'route', 'code'],
  buckets    : [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
}) 


//Custom Metric
const productsTotal = new client.Counter({
  name: 'api_hits_total',
  help: 'Total number of API hits',
  labelNames: ['api_hit']
})
  
export class App {

  appServer         = express();
  productController = new ProductController();
  authController    = new AuthController();

  public init() {

    this.appServer.use(bodyParser.urlencoded({ extended: false }))
    this.appServer.use(bodyParser.json())

    const appListen = this.appServer.listen(ConfigData.port, () => {
      console.log(`Server is running at https://localhost:${ConfigData.port}`)
    })

    this.initRoutes()
    process.on('SIGTERM', () => {
      clearInterval(metricsInterval)
    
      appListen.close((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        process.exit(0)
      })
    })
  }

  private initRoutes() {

    this.appServer.use(cors())

    // Runs before each requests
    this.appServer.use((req, res, next) => {
      res.locals.startTime = Date.now()
      next()
    })

    //Signup Handler
    this.appServer.post(SignUp.path, async (req: Request, res: Response, next) => {
      logger(req.path, req.method, 'Req', req.body)
      const resp = await this.authController.signup(req.body as SignUp.params)
      res.locals.resp = resp

      const methodName = `SignUp`
      productsTotal.inc({ api_hit:  methodName })

      next()
    })

    //Login Handler
    this.appServer.post(Login.path, async (req: Request, res: Response, next) => {
      logger(req.path, req.method, 'Req', req.body)
      const resp = await this.authController.login(req.body as Login.params)
      res.locals.resp = resp

      const methodName = `Login`
      productsTotal.inc({ api_hit:  methodName })

      next()
    })

    //Products Handler
    this.appServer.all(GetProducts.path, canAuthenticate, canAccess, async (req: Request, res: Response, next) => {
      logger(req.path, req.method, 'Req', req.body)
      const resp = await this.productController.products(req, res)
      
      //Delaying process
      if(Math.random()%2 === 0) {
        await new Promise((resolve, rej) => {
          setTimeout(()=>{resolve('')}, 3000)
        })
      }
      

      const methodName = `Products_${req.method}`
      productsTotal.inc({ api_hit :  methodName })
      
      res.locals.resp = resp
      next()
    })

    //Metrics Handler
    this.appServer.get('/metrics', async (req, res) => {
      res.set('Content-Type', client.register.contentType)
      res.end(client.register.metrics())
    })

    // Runs after each requests
    this.appServer.use((req, res, next) => {
      const responseTimeInMs = Date.now() - res.locals.startTime

      if(res.locals.resp) {
        const resp = res.locals.resp
        res.status(resp.code).json(resp.data ? resp.data : resp.error)
      }

      logger(req.path, req.method, 'Res', res.locals.resp)

      if(req.route) {
        httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(responseTimeInMs)
      }

      next()
    })
  }
}

new App().init()