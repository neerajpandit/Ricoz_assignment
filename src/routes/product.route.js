import express from 'express';
import { 
    createProduct,
    getAllProducts,
    getProductById, 
    deleteProductById, 
    updateProductById 
    } from "../controllers/product.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
import { uploadImage } from '../controllers/product.controller.js';

import multer from 'multer';


const upload = multer({ dest: 'public/temp' });

const router = express.Router();



router.post('/create', isAuthenticated, isAdmin,upload.single('image'),uploadImage, createProduct);
router.get('/getallProdect', getAllProducts);
router.get('/getallProdect/:id', getProductById);
router.delete('/deleteProductById/:id', isAuthenticated, isAdmin, deleteProductById);
router.put('/updateProductById/:id', isAuthenticated, isAdmin, updateProductById);


export default router;
