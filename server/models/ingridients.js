import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        id: Number,
        name: String,
        type: String,
    }
)

const Product = mongoose.model('ingridients', productSchema);

export default Product;