import Router from 'express'
import docController from '../controllers/doc.js'

const routes = Router();

routes.get('/', docController.getDoc)

export default routes;