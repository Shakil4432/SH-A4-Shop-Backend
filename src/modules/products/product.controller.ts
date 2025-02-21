import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = CatchAsync(async (req, res) => {
  const id = req.user?.id;
  const result = await ProductServices.createProductIntoDB(req.file,req.body);
 console.log(req.file)
 console.log(req.body)
  sendResponse(res, {
    success: true,
    message: 'Book created successfully',
    statusCode: 201,
    data: result,
  });
});

const getAllProduct = CatchAsync(async (req, res) => {
  console.log('Request received:', req.query);
  try {
    const result = await ProductServices.getAllProductsFromDB(req.query);
    console.log('Query result:', result);
    sendResponse(res, {
      success: true,
      message: 'All Products retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


const updateProduct = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await ProductServices.updateProductIntoDB(
    id,
    userId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Product updated successfully',
    statusCode: 200,
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  updateProduct,
};
