const user = require("../models/user");
const multer = require("multer");
const path = require("path");

const fileUpload = async (req, res) => {

    const username = req.body.username;
    console.log(username);

    try {
        
        const foundUser = await user.findOne({ username: username }).exec();

        if(!foundUser){
            console.log("User not found");
            return res.sendStatus(403);
        }

            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'uploads');
                },
                filename: function (req, file, cb) {
                    cb(null, username + path.extname(file.originalname));
                }
            })
            
            const upload = multer({
                 storage: storage,
                 fileFilter: function (req, file, callback) {
                    var ext = path.extname(file.originalname);
                    if(ext !== '.pdf' && ext !== '.jpeg' && ext !== '.jpg') {
                        return callback(new Error('Only pdf, jpeg and jpg file are allowed'));
                    }
                    callback(null, true)
                },
                limits:{
                    fileSize: 1024 * 1024 * 10
                }
            }).single("resume");
        
            upload(req, res, function (err)  {
                if (err instanceof multer.MulterError) {
        
                  console.error("Error in fileUploadController");
                  console.log(err);
                    return res.satus(500).json({"Message" : "File size too large to upload"});
        
                } else if (err) {
                    console.error("Error in fileUploadController");
                    console.error(err);
                    return res.status(422).json({"Message" : err.message});
                }
        
                user.findOneAndUpdate({username: username}, {resume : true, status: "In Progress ..."}, {}, (err)=>{
                    if(err)
                        console.error(err);
                });
                        
                res.json({"Message" : "File uploaded successfuly"});
            });
        

    } catch (error) {
        console.error("Error in fileUploadController.js\n", error);
    }

}

module.exports = {fileUpload};