import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import User from '../user/user.model';
import Blog from './blog.model';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const userData = req.user;
  console.log(userData);
  const blogDetails = req.body;
  blogDetails.author = await User.findById(userData?.userId);
  const result = await BlogServices.createBlogIntoDB(req.body);
  const { _id, title, content, author } = result;
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created succesfully',
    data: {
      _id,
      title,
      content,
      author,
    },
  });
});
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  console.log(result);

  if (result.length === 0) {
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.NO_CONTENT,
      message: 'No Blogs',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blogs fetched successfully',
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog is retrieved successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogData = await Blog.findById(id).populate('author');
  const userData = req.user;
  if (!blogData) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'This blog does not exist');
  }
  if (userData?.userId !== blogData?.author?._id.toString()) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }
  if (userData?.userRole === 'admin') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You cannot update the blog');
  }
  const result = await BlogServices.updateBlogIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blogData = await Blog.findById(id).populate('author');
  const userData = req.user;
  if (!blogData) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'This blog does not exist');
  }
  if (
    userData?.userRole !== 'admin' &&
    userData?.userId !== blogData?.author?._id.toString()
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }

  await BlogServices.deleteBlogFromDB(id);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});
export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
