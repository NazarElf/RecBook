import Product from '../models/ingridients.js'

export const getIngridient = async (req, res) => 
{
    try {
        const products = await Product.find();

        console.log(products);

        res.status(200).json(products);
    } catch (error) {
        res.status(404).json(error)
    }
}

export const createIngridient = async (req, res) => 
{
    const product = req.body

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json(error)
    }
}
