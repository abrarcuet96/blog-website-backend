import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author').select('_id title content author'),
    query,
  )
    .search(BlogSearchableFields)
    .filter()
    .sort();
  const result = await blogQuery.modelQuery;
  return result;
};
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload);
  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  getSingleBlogFromDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};