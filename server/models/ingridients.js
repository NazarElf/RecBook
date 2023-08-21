import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        id: Number,
        name: String,
        type: String,
    }
)

const Product = mongoose.model('Product', productSchema);

export default Product;