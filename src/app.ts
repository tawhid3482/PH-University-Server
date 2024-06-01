import cors from 'cors';
import express, { Application, Request, Response, } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes refactor
app.use('/api/v1', router);


const test = async (req: Request, res: Response) => {
  Promise.reject()
  const a = 10;
  res.send(a);
};

app.get('/', test);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)
app.use(notFound)

export default app;
