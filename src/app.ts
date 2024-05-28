/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response,  } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoute } from './app/modules/users/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoute);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

export default app;
