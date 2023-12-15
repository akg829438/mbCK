const multer = require('multer');
const path = require('path');
const featureImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*1E9);
        const path = 'IMG' + uniqueSuffix + "." + file.originalname.split(".")[1];
      cb(null, path);
    }
  });
  
  exports.featureImageUpload = multer({
    storage: featureImageStorage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  }).single('featured_image');

  const productImagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*1E9);
        const path = 'IMG' + uniqueSuffix + "." + file.originalname.split(".")[1];
      cb(null, path);
    }
  });
  
  exports.productImagesUpload = multer({
    storage: productImagesStorage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  }).array('product_images', 5);