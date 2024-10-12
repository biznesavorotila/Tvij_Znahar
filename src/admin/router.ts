import { Router } from "express";
import { upload } from "./upload";
import ProductController from "./modules/product/product.contoller";
import PostController from "./modules/post/post.controller";

export const router = Router();

// Test
router.get('/hello', (req, res) => { 
    res.send('Hello There!').status(200);
});

// Product
router.post('/product/create', upload.single('image'), ProductController.create);
router.get('/product/getAll', ProductController.getAll);
router.get('/product/getOne/:id', ProductController.getOne);

// User
router.post('/post/create', upload.single('image'), PostController.createOne);