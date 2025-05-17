const express = require("express")
const app = express();
const path = require("path")
var mongoose = require('mongoose'); //importing mongoose
mongoose.connect('mongodb://localhost:27017/contactDance'); //connecting to the database
const port = 8000 //port number for the server 

// Defining mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    email: String,
    phone: String,
    info: String,
});
// Create the model from the schema
var Contact = mongoose.model('Contact', contactSchema);
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) //for serving static files through express:
app.use(express.urlencoded()) 

//PUG SPECIFIC STUFF
app.set('view engine','pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//ENDPOINTS 
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('./home.pug',params)
});
app.get('/contact-us',(req,res)=>{
    const params = {}
    res.status(200).render('./contact-us.pug',params)
});
app.post('/contact-us', async (req, res) => {
    try {
        var myData = new Contact(req.body); // Use the Contact model
        await myData.save(); // Save the document to the database
        res.status(200).render('./contact-us.pug', { message: "Your data has been saved successfully!" });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(400).render('./contact-us.pug', { message: "There was an error saving your data." });
    }
});

//STARTING THE SERVER
app.listen(port,()=>{ 
    console.log(`The application started successfully on port ${port}`)
})