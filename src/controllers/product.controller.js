import Product from '../models/product.model.js';
import cloudinary from '../utils/cloudinary.js';

// Upload image using Multer and store URL in Cloudinary


export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        req.imageURL = result.secure_url;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Image upload failed' });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const image = req.imageURL;

        const product = await Product.create({ title, description, price, image });
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Product creation failed' });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Update product by ID
export const updateProductById = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const image = req.imageURL;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;

        await product.save();
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete product by ID
export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};