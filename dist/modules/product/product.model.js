"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductVariantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });
const ProductInventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { _id: false });
const ProductSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
ProductSchema.static('isProductExistsByName', function isProductExistsByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.Product.findOne({ name });
        return existingProduct;
    });
});
//query
ProductSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ProductSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
