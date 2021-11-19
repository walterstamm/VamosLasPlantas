const express =  require ("express");

const app = express ();
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const mainRoutes=require('./routes/mainRoutes');
const userRoutes=require('./routes/userRoutes');

app.use(express.static('./public'));

app.set("view engine", "ejs");

app.use('/', mainRoutes);
app.use('/user', userRoutes);

app.use((req,res,next)=>{
    res.status(404).render('404');
})

app.listen(3090, () =>  console.log ("Levantando servidor http://localhost:3090"));





    



