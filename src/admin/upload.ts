import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function (req, file, cb) {
        console.log("file => ", file);
        const uploadsUrl = process.env.STATIC_FILES_URL as string

        // create if not exits
        if (!fs.existsSync(uploadsUrl)) {
          fs.mkdirSync(uploadsUrl)
        }

        const splits = file.originalname.split('.');
        const name = crypto.randomUUID() + "." + file.mimetype.split('/')[1];
        req.body.image = `${uploadsUrl}/${name}`;
        cb(null, name);
    }
  })

export const upload = multer({ storage });