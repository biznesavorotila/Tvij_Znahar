import { Response, Request as ExpressRequest } from "express";
import { Request, RequestParams } from '../../types';
import { TProductCreate } from "./types";
import ProductService from "./product.service";

class ProductController {
    async create(req: Request<TProductCreate>, res: Response) {
        await ProductService.create(req.body);

        res.status(201).send(); // created
    }

    async update(req: ExpressRequest<{ id: string }, any, Partial<TProductCreate>>, res: Response) { 
        const productId = Number(req.params.id);

        await ProductService.update(productId, req.body);
        
        res.status(200).send();
    }

    async delete(req: RequestParams<{ id: string }>, res: Response) {
        const productId = Number(req.params.id);
        await ProductService.deleteProduct(productId);

        res.send();
    }

    async getAll(req: ExpressRequest<{}, {}, {}, { isCatalog?: boolean }>, res: Response) {
        const products = await ProductService.getAll(req.query.isCatalog);
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