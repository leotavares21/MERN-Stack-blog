const crypto = require("crypto");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-fides",
    transformation: [{ width: 740, height: 420 }],
    public_id: (req, file) =>
      `${crypto.randomBytes(16).toString("hex")}-blog-fides-image`,
  },
});

const multerConfig = {
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
};

module.exports = (req, res, next) => {
  multer(multerConfig).single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.message === "File too large") {
        err.message = "Arquivo grande demais";
        res.status(500).send({ error: err.message });
      } else {
        res.status(500).send({ error: err.message });
      }
    } else if (err) {
      console.log(err);
    }
    next(err);
  });
};
