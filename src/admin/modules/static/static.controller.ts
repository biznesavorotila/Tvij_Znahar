import { Request, Response } from "express";
import StaticService from "./static.service";
import path from "path";

export class StaticController { 
    async clear(req: Request, res: Response) {
        StaticService.clear()
        .then(() => {
            res.send().status(200);
        })
    }

    async getAll(req: Request, res: Response) {
        const arr: Array<String> = new Array();
        for (const file of StaticService.getAll()) {
            arr.push(file);
        }

        res.send(arr).status(200);
    }
}

export default new StaticController();