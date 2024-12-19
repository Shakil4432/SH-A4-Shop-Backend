import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './middleware/globalErrorHandler';
import { AuthRoutes } from './modules/auth/auth.route';
import { BlogRoutes } from './modules/blog/blog.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth/register', UserRoutes);
app.use('/api/auth/login', AuthRoutes);
app.use('/api/blogs', BlogRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Blog  Server is running ' });
});

app.use(globalErrorHandler);

export default app;
