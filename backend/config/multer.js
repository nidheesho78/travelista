import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

  destination: (req, file, cb) => {
     cb(null, "backend/Public/UserProfileImages") },

  filename: (req, file, cb) => { 
    cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ) }

});

const blogStorage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,"backend/Public/UserBlogImages")
  },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
})
const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    
    cb(null, true);

  } else {

    cb(new Error("Only images are allowed!"), false);

  }

};


export const multerUploadUser = multer({
  storage: storage,
  blogStorage:blogStorage,
  fileFilter: fileFilter,
});