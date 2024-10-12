import { TCreatePost } from "./types";
import { Request } from '../../types';
import { Response } from 'express';
import PostService from './post.service';

class PostController {
    async createOne(req: Request<TCreatePost>, res: Response) {
        await PostService.createPost(req.body);
        
        res.status(201).send();
    }
}

export default new PostController();