const util = require('util');
const multer = require('multer');
// const { log } = require('console');
const maxSize = 2 * 1024 * 1024;
const basedir = __dirname;


// multer to upload/download files

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${basedir}/../../public/uploads`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

let uploadFile = multer(
    {
        storage: storage,
        limits: { fileSize: maxSize }
    }

).array("file");

let uploadFileMiddleware = util.promisify(uploadFile);

const UploadMiddleware = async (req, res, next) => {
    try {
        await uploadFileMiddleware(req, res);

        if (req.files == undefined) {
            return res.status(400).json({ error: true, message: "Please upload a file!" });
        }
        // console.log(req.files);

        //if file uploaded successfully go to post route and save data to database
        next();
        // console.log("upload function");

        // res.status(200).json({
        //     error: false, message: "Uploaded the file successfully"
        // });


    } catch (error) {
        console.log(error);

    }
}



module.exports={
    UploadMiddleware
}