const Express = require('express');
const multer = require('multer');
const app = Express();
const PORT = 3000;

const upload = multer ({
    dest: _dirname + '/uploads/images'
});
//^^ is ignored if Storage is set
//with dest, multer stores files in a DiskStorage instance that*it*creates with random filenames

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file)
    } else {
        throw 'error'
    };
});

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})



// let bodyParser = require('body-parser'); //* Original
// app.use(bodyParser.json()) //*Original

//** The following is from the original article--not the format I would like to use
/* 
let Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

//fieldname: field name specified on the client side form
//originalname: name of the file on the user's computer
//destination: the folder to which the file has been saved
//filename: the name of the file in the destination

//now, we create a multer object that accepts the Storage variable as a parameter
let upload = multer({
    storage: Storage
}).array("imgUploader", 3); //field name and max number of items in the array

//now, we write our post
app.get("/", function(req, res) {
    res.sendFile(_dirname + "/index.html");
});
*/