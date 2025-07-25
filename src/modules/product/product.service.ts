import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExistsByName(productData.name)) {
    throw new Error('Product Already Exists');
  }
  const result = await Product.create(productData); // build in static

  //const product = new Product(productData); // create an instance
  // if (await product.isProductExistsByName(productData.name)) {
  //   throw new Error('Product Already Exists');
  // }
  //const result = await product.save();

  return result;
};

const getProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const objectId = new mongoose.Types.ObjectId(_id);
  const result = await Product.findOne({ _id: objectId });
  return result;
};

const deleteProductFromDB = async (_id: string) => {
  const objectId = new mongoose.Types.ObjectId(_id);
  const result = await Product.updateOne(
    { _id: objectId },
    { isDeleted: true },
  );
  return result;
};

const UpdateProductFromDB = async (_id: string, updatedData: any) => {
  //const objectId = new mongoose.Types.ObjectId(_id);
  const result = await Product.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const searchProductsFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const result = await Product.find({
    $or: [{ name: regex }, { description: regex }, { tags: { $in: [regex] } }],
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  UpdateProductFromDB,
  deleteProductFromDB,
  searchProductsFromDB,
};
