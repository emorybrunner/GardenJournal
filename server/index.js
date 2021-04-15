require('dotenv').config();
const Express = require('express');
const app = Express();
const multer = require('multer');
const PORT = 3000;

const upload = multer ({
    dest: _dirname + '/uploads/images'
});
//^^ is ignored if Storage is set
//with dest, multer stores files in a DiskStorage instance that*it*creates with random filenames

//Connects controllers to index: user, plant, and calendar
const user = require('./controllers/usercontroller');
const plant = require('./controllers/plantcontroller');
const calendar = require('./controllers/calendarcontroller');

sequelize.sync();

//Sets up middleware and express functionality
app.use(require('./middleware/headers'));
app.use(express.json());
app.use(express.static('public'));

//Sets up endpoints for each controller
app.use('/user', user);
app.use('/plant', plant);
app.use('/calendar', calendar);

//Ensures that the database is synced at the proper port
db.authenticate()
    .then(() => db.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Now listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`Oh no! The server crashed!`);
        console.error(err);
    })



//*Will end up in the user controller and the plant controller
//Uploads images -- profile image & plant image
app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file)
    } else {
        throw 'error'
    };
});


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