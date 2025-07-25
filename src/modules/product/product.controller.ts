import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productZodSchema } from './product.zodValidation';
import mongoose from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
  const parsed = productZodSchema.safeParse(req.body.product);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parsed.error.issues,
    });
  }
  const productData = parsed.data;

  try {
    //const { product: ProductData } = req.body;
    const result = await ProductServices.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message ||
        'Failed to create Product. Something went wrong on the server.',
      error: err,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products are retrived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message ||
        'Failed to load products. Something went wrong on the server.',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is retrived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message ||
        'Failed to load product. Something went wrong on the server.',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message ||
        'Failed to load product. Something went wrong on the server.',
      error: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    const updatedData = req.body.product;
    const result = await ProductServices.UpdateProductFromDB(
      productId,
      updatedData,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or update failed',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product is updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong.',
      error: err,
    });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.search?.toString() || '';

    const result = await ProductServices.searchProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong.',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
