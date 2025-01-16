import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle filter as key-value pairs (e.g., filter=authorId)
    if (queryObj.filter) {
      const [field, value] = (queryObj.filter as string).split('=');
      if (field && value) {
        queryObj[field] = value;
      }
      delete queryObj.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = (this.query?.sortBy as string) || 'createdAt';
    const sortOrder = (this.query?.sortOrder as string) === 'desc' ? '-' : '';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    return this;
  }
}

export default QueryBuilder;
