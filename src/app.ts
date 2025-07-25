import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouter } from './modules/product/product.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', ProductRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Mahdi!');
});

export default app;
