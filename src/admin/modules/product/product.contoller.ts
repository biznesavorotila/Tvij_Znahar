import { Response } from "express";
import { Request, RequestParams } from '../../types';
import { TProductCreate, TProductGetOne } from "./types";
import ProductService from "./product.service";

class ProductController {
    async create(req: Request<TProductCreate>, res: Response) {
        await ProductService.create(req.body);

        res.status(201).send(); // created
    }

    async update(req: Request<any>, res: Response) { 
    
    }

    async delete(req: Request<any>, res: Response) {

    }

    async getAll(req: Request<any>, res: Response) {
        const products = await ProductService.getAll();
        console.log(products);
        res.send(products);
    }

    async getOne(req: RequestParams<{ id: string }>, res: Response) {
        if (!req.params.id) {
            res.status(401).send('No id provided!');
        }
        const product = await ProductService.getProduct(Number(req.params.id));
        res.send(product);
    }
}

export default new ProductController();