const express = require("express")
const app = express();
const path = require("path")

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) //for serving static files through express:
app.use(express.urlencoded()) 

//PUG SPECIFIC STUFF
app.set('view engine','pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//ENDPOINTS 
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home',params)
});
app.get('/contact-us',(req,res)=>{
    const params = {}
    res.status(200).render('./contact-us.pug',params)
});


//STARTING THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});