import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function (req, file, cb) {
        console.log("file => ", file);
        const name = crypto.randomUUID() + "-" + file.originalname.split('.')[1];
        req.body.image = `${process.env.STATIC_FILES_URL}/${name}`;
        cb(null, name);
    }
  })

export const upload = multer({ storage });