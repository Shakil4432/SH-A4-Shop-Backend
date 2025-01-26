import { FilterQuery, Query } from 'mongoose';
import { excludingSearchFields } from '../modules/products/product.constant';
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleField: string[]) {
    const search = this.query?.search || '';
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleField.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    excludingSearchFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = (this.query?.sortBy as string) || 'createdAt';
    const sortOrder = this.query?.sortOrder === 'desc' ? -1 : 1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }
}

export default QueryBuilder;
