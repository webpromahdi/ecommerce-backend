import mongoose, { model, Schema } from 'mongoose';
import {
  ProductModel,
  TProduct,
  TProductInventory,
  TProductVariant,
} from './product.interface';

const ProductVariantSchema = new Schema<TProductVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const ProductInventorySchema = new Schema<TProductInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const ProductSchema = new Schema<TProduct, ProductModel>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    variants: [ProductVariantSchema],
    inventory: ProductInventorySchema,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.static(
  'isProductExistsByName',
  async function isProductExistsByName(name: string) {
    const existingProduct = await Product.findOne({ name });
    return existingProduct;
  },
);

//query
ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
