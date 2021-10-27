const controller={
    index:(req,res)=>{
        return res.render('index');
    },
    register:(req,res)=>{
        return res.render('register');
    },
    cart:(req,res)=>{
        return res.render('cart');
    },
    login:(req,res)=>{
        return res.render('login');
    },
}

module.exports=controller;