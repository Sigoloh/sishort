import { Request, Router, Response } from 'express'
import {LinkController} from './controller/LinkController';
export const router = Router();
const linkController = new LinkController();
router.get('/', (request: Request, response: Response) => {
  response.send('Hello world!');
})

router.get('/link/get/:alias', linkController.getLink);

router.post('/link/create', linkController.createNewLink);
