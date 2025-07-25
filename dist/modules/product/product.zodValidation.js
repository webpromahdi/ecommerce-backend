"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productZodSchema = void 0;
const zod_1 = require("zod");
const productVariantSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty('Variant type is required'),
    value: zod_1.z.string().nonempty('Variant value is required'),
});
const productInventorySchema = zod_1.z.object({
    quantity: zod_1.z.number(), // required by default
    inStock: zod_1.z.boolean(), // required by default
});
exports.productZodSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty('Product name is required'),
    description: zod_1.z.string().nonempty('Description is required'),
    price: zod_1.z.number(),
    category: zod_1.z.string().nonempty('Category is required'),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    variants: zod_1.z.array(productVariantSchema).default([]),
    inventory: productInventorySchema,
    isDeleted: zod_1.z.boolean(),
});
