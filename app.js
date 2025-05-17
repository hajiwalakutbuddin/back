const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'static')));

//Pug specific settings

app.set ('view engine', 'pug');
app.set('views', './views');;

// Default route
app.get('/', (req, res) => {
   res.render('home'); 
 });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});