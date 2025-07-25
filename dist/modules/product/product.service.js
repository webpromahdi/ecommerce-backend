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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield product_model_1.Product.isProductExistsByName(productData.name)) {
        throw new Error('Product Already Exists');
    }
    const result = yield product_model_1.Product.create(productData); // build in static
    //const product = new Product(productData); // create an instance
    // if (await product.isProductExistsByName(productData.name)) {
    //   throw new Error('Product Already Exists');
    // }
    //const result = await product.save();
    return result;
});
const getProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(_id);
    const result = yield product_model_1.Product.findOne({ _id: objectId });
    return result;
});
const deleteProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(_id);
    const result = yield product_model_1.Product.updateOne({ _id: objectId }, { isDeleted: true });
    return result;
});
const UpdateProductFromDB = (_id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    //const objectId = new mongoose.Types.ObjectId(_id);
    const result = yield product_model_1.Product.findByIdAndUpdate(_id, updatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const searchProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const result = yield product_model_1.Product.find({
        $or: [{ name: regex }, { description: regex }, { tags: { $in: [regex] } }],
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    UpdateProductFromDB,
    deleteProductFromDB,
    searchProductsFromDB,
};
