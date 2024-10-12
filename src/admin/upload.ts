import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function (req, file, cb) {
        const name = `${process.env.STATIC_FILES_URL}/${crypto.randomUUID() + "-" + file.originalname}`;
        req.body.image = name;
        cb(null, name);
    }
  })

export const upload = multer({ storage });