import { Request, Response } from "express";
import StaticService from "./static.service";
import path from "path";
import fs from "fs";

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
            console.log(file);
        }

        res.send(arr).status(200);
    }

    static  getDirectoryTree(rootDir: string, indent = '', treeString = '') {
        try {
            if (rootDir === "node_modules" || rootDir === "dist") {
                return treeString;
            }
            const items = fs.readdirSync(rootDir);
            const visibleItems = items.filter(item => !item.startsWith('.'));
            
            visibleItems.forEach((item, index) => {
                const fullPath = path.join(rootDir, item);
                const stats = fs.statSync(fullPath);
                const isLast = index === visibleItems.length - 1;
                
                // Add to the tree string
                treeString += `${indent}${isLast ? '└──' : '├──'} ${item}\n`;
                
                if (stats.isDirectory()) {
                    const newIndent = `${indent}${isLast ? '    ' : '│   '}`;
                    treeString = this.getDirectoryTree(fullPath, newIndent, treeString);
                }
            });
            
            return treeString;
        } catch (err) {
            console.error(`Error reading directory: ${rootDir}`, err);
            return treeString;
        }
    }

    async getAllString(req: Request, res: Response) {
        try {
            const rootDirectory = process.argv[2] || '.';
            const header = `Directory tree for: ${path.resolve(rootDirectory)}\n`;
            const directoryTree = header + StaticController.getDirectoryTree(rootDirectory);
            res.header('Content-Type', 'text/plain');
            res.status(200).send(directoryTree);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}

export default new StaticController();