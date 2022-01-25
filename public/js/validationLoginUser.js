window.onload = function(){
    let formLogin = document.querySelector('#login-form');
    let inputUser=document.querySelector('#user_email');
    let inputPass=document.querySelector('#user_password');
    let listaErrores= document.querySelector(".errores_login");



    let errores = [];

    formLogin.addEventListener("submit", function(e){


        if(formLogin.user_email.value == ""){
            errores.push("Debe ingresar un email válido <br> ");
            inputUser.classList.add("is-invalid");
        }else{
            inputUser.classList.add("is-valid");
        }

        if(formLogin.user_password.value == ""){
            errores.push("Debe ingresar un password <br> ");
          inputPass.classList.add("is-invalid");
        }else{
            inputPass.classList.add("is-valid");
        }

        if(errores.length > 0){
            e.preventDefault();

            listaErrores.innerHTML = "";
            for(error of errores){
                listaErrores.innerHTML += "<li>"+error+"</li>";
                listaErrores.classList.add("alert-warning");
            }
            errores=[];
        }else{
            formLogin.submit();
        }



    })

}