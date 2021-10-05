const express =  require ("express");

const app = express ();

const path = require ("path");

app.listen(3090, () =>  console.log ("Levantando servidor http://localhost:3090"));

const publicFolder = path.resolve (__dirname, "./public");
app.use(express.static(publicFolder));

app.set("view engine", "ejs");

app.get("/", function (req, res){
    res.render("pages/index.ejs");})

app.get("/index.ejs", function (req, res){
    res.render("pages/index.ejs");})

app.get("/register.ejs", function (req, res){
    res.render("pages/register.ejs");})

app.get("/login.ejs", function (req, res){
    res.render("pages/login.ejs");})

app.get("/cart.ejs", function (req, res){
    res.render("pages/cart.ejs");})

app.get("/product.ejs", function (req, res){
    res.render("pages/product.ejs");})

app.get("/accesories.ejs", function (req, res){
    res.render("pages/accesories.ejs");})

/*
app.get("/index.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/index.html"))
    }); 
    
app.get("/", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/index.html"))
    }); 

app.get("/accesories.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/accesories.html"))
});

app.get("/productCart.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productCart.html"))
});

app.get("/register.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/register.html"))
});

app.get("/productDetail.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productDetail.html"))
});

app.get("/productCart.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/productCart.html"))
});

app.get("/login.html", function (req, res){
    res.sendFile (path.resolve (__dirname, "./views/login.html"))
});

*/


    



