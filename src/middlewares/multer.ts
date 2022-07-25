import * as multer from "multer";

const storage = multer.diskStorage({
        destination: "images",
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });
    const upload = multer({ storage: storage }).single("testImage");
   
export default upload