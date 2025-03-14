import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../error/AppError';
import { searchAbleFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const ProductsQuery = new QueryBuilder(Product.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await ProductsQuery.countTotal();
  const result = await ProductsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById({ _id: id });
  return result;
};

const updateProductIntoDB = async (
  id: string,

  payload: Partial<TProduct>,
) => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not able to update this Product',
    );
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findOneAndDelete({ _id: id });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not able to delete this Product',
    );
  }

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
