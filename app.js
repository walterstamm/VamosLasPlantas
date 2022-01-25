const express =  require ("express");
const session =  require ("express-session");
const cookies = require('cookie-parser'); 
const apiProductsRoutes = require('./routes/apiRoutes/apiProductsRoutes'); 
const apiUsersRoutes = require('./routes/apiRoutes/apiUsersRoutes');

const app = express ();
const methodOverride = require('method-override');

const usuarioLogueadoMiddleware = require('./middlewares/usuarioLogueadoMiddleware');

app.use(session({
    secret: "It's a secret",
    resave: false, 
    saveUninitialized: false,
    
}));

app.use(cookies());

app.use(usuarioLogueadoMiddleware); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const mainRoutes=require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes'); 
//const productRoutes = require('./routes/productRoutes');

app.use(express.static('./public'));

app.set("view engine", "ejs");

app.use('/', mainRoutes);
app.use('/api/products', apiProductsRoutes);
app.use('/api/users', apiUsersRoutes);



app.use((req,res,next)=>{
    res.status(404).render('404');
})

app.listen(3090, () =>  console.log ("Levantando servidor http://localhost:3090"));

 





    



