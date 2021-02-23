import Router from 'express'
import indexController from '../controllers/index.js'

const routes = Router();

routes.get('/', indexController.getIndex)

export default routes;