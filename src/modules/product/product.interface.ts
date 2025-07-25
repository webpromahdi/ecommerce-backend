import { Model } from 'mongoose';

export type TProductVariant = {
  type: 'size' | 'style' | 'color' | string;
  value: string;
};

export type TProductInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TProductVariant[];
  inventory: TProductInventory;
  isDeleted: boolean;
};

// export type TProductMethod = {
//   isProductExistsByName(name: string): Promise<TProduct | null>;
// };

export interface ProductModel extends Model<TProduct> {
  isProductExistsByName(name: string): Promise<TProduct | null>;
}
