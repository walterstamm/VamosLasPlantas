const express =  require ("express");

const app = express ();

const path = require ("path");

app.listen(3050, () =>  console.log ("Levantando servidor http://localhost:3090"));

const publicFolder = path.resolve (__dirname, "./public");
app.use(express.static(publicFolder));

app.get("/", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/home.html"))
});

app.get("/register", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/register.html"))
});

app.get("/login", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/login.html"))
});

app.get("/login", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productCart.html"))
});

app.get("/login", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productDetail.html"))
});



