const multer = require('multer');

const uploadedFiles = {};

exports.uploadFileMulter = (req, res, next) => {
  const check = req.headers.test;

  if (check == 123) {
    console.log("Water")
  } else if (check == "") {
    console.log("default")
  }


  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {

        cb(null, 'uploads'); // Destination folder / File uploaded folder
      },
      filename: function (req, file, cb) {
        const originalExtension = file.originalname.split('.').pop();
        const newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + originalExtension;
        uploadedFiles[file.originalname] = newFileName;
        cb(null, newFileName);
      },
    }),
  }).single('file');

  upload(req, res, function (err) {
    if (err) {
      // Handle the file upload error
      console.error(err);
      return res.status(500).json({ message: 'File upload failed.' });
    }
    next();
  });
};
