const express = require("express");
const { uploadFileMulter } = require('../components/middleware/uploadMulterMiddleware');
const multer = require('multer');
var bodyParser = require('body-parser')

const { uploadDocument, myDocViewOne, viewAllDocument, controllerSearchByTag } = require('../controllers/controllerMyDoc')

const app = express();
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = determineDestinationFolder(req);
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/upload1', upload.single('file'), (req, res) => {
    console.log(req.body); // Access form fields in req.body
    res.status(200).send('File uploaded successfully.');
});

app.use(router);

function determineDestinationFolder(req) {
    console.log("req.header", req.headers.test);
    console.log(req.body.tags)
    return 'uploads/' + req.body.userId;
  }

router.route('/upload').post(uploadFileMulter, uploadDocument);
router.route('/search-by-tag').post(controllerSearchByTag);
router.route('/view-one').post(myDocViewOne);
router.route('/view-all').post(viewAllDocument);

// router.route('/view').post(viewAllDocuments); // Need to work on this
// router.route('/delete').post(deleteDocument);
// router.route('/update').post(updateDocument);


module.exports = router;