import multer from "multer";

// donde se van a guardar los archivos que se suban 
const storage = multer.diskStorage({
    //la carpeta destino
    destination: function(req,file,cb){
        cb(null,`./src/public/images`)
    } ,
    //con que nombre lo guardo
    filename: function(req,file,cb){
        //
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

const uploader = multer({storage});

export default uploader;