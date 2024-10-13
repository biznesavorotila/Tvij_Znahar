import fs from 'fs';
import path from 'path';

class StaticService {
    async clear () {
        fs.readdir(path.join(__dirname, '..', '..', '..', 'uploads'), (err, files) => {
            if (err) {
                console.log(err);
            }
            files.forEach(file => {
                fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', file), err => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        });
    }

    // getAll(dir?: string) {
    //     return fs.readdirSync(path.join(__dirname, '..', '..', '..', 'uploads'));
    // }

    *readAllFiles(dir: string): Generator<string> {
        const files = fs.readdirSync(dir, { withFileTypes: true });
      
        for (const file of files) {
          if (file.isDirectory()) {
            yield* this.readAllFiles(path.join(dir, file.name));
          } else {
            yield path.join(dir, file.name);
          }
        }
      }
    
}

export default new StaticService();