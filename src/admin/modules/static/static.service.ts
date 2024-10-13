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

    getAll() {
        return fs.readdirSync(path.join(__dirname, '..', '..', '..', 'uploads'));
    }   
}

export default new StaticService();