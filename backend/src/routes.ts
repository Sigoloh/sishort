import { Request, Router, Response } from 'express'

export const router = Router();
router.get('/', (request: Request, response: Response) => {
  response.send('Hello world!');
})
