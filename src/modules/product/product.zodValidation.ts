import { z } from 'zod';

const productVariantSchema = z.object({
  type: z.string().nonempty('Variant type is required'),
  value: z.string().nonempty('Variant value is required'),
});

const productInventorySchema = z.object({
  quantity: z.number(), // required by default
  inStock: z.boolean(), // required by default
});

export const productZodSchema = z.object({
  name: z.string().nonempty('Product name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number(),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string()).default([]),
  variants: z.array(productVariantSchema).default([]),
  inventory: productInventorySchema,
  isDeleted: z.boolean(),
});
