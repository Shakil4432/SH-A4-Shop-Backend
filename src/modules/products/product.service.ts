import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../error/AppError';
import { sendImageTocloudinary } from '../utils/sendImageToCloudinary';
import { searchAbleFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';

const createProductIntoDB = async (file: any, payload: TProduct) => {
  if (!file?.path) {
    throw new AppError(httpStatus.BAD_REQUEST, 'File is required');
  }

  const imageName = payload.name;
  const { secure_url }: any = await sendImageTocloudinary(imageName, file.path);

  payload.image = secure_url;

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const ProductsQuery = new QueryBuilder(Product.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort();

  const result = await ProductsQuery.modelQuery;
  return result;
};

const updateProductIntoDB = async (
  id: string,
  userId: string,
  payload: Partial<TProduct>,
) => {
  const result = await Product.findOneAndUpdate(
    { _id: id, author: userId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not able to update this Product',
    );
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductIntoDB,
};
