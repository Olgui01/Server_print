const express = require("express");
const {engine} = require("express-handlebars");
const app = express();
const port = 3002
const bodyParser= require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))

app.engine('.hbs', engine({
    extname:'.hbs',
    helpers:require("./lib/helpers")
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use('/',require("./rout/update"));
app.use(express.static('./src/public'));
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});