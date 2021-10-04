const express =  require ("express");

const app = express ();

const path = require ("path");

app.listen(3090, () =>  console.log ("Levantando servidor http://localhost:3090"));

const publicFolder = path.resolve (__dirname, "./public");
app.use(express.static(publicFolder));

app.get("/", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/index.html"))
});

app.get("/register.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/register.html"))
});

app.get("/login.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/login.html"))
});

app.get("/productCart.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productCart.html"))
});

app.get("/productDetail.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productDetail.html"))
});

app.get("/accesories.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/accesories.html"))
});

app.get("/index.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/index.html"))
});





