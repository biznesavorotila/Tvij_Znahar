import { Request, Response } from "express";
import StaticService from "./static.service";

export class StaticController { 
    async clear(req: Request, res: Response) {
        StaticService.clear()
        .then(() => {
            res.send().status(200);
        })
    }

    async getAll(req: Request, res: Response) {
        res.send(StaticService.getAll()).status(200);
    }
}

export default new StaticController();