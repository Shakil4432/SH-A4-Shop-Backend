import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './middleware/globalErrorHandler';
import { AuthRoutes } from './modules/auth/auth.route';
import { ProductRoutes } from './modules/products/product.route';
import { AdminRoutes } from './modules/admin/admin.route';
import { OrderRoutes } from './modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth/', UserRoutes);
app.use('/api/auth/', AuthRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/orders/', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Product  Server is running ' });
});

app.use(globalErrorHandler);

export default app;
