window.onload = function(){

    let form = document.querySelector('form.register');
    let fieldName = document.querySelector('input.name');
    let fieldEmail = document.querySelector('input.mail');
    let fieldPassword = document.querySelector('input.password');
    let fieldRePassword = document.querySelector('input.repassword')
    letfieldDateofBirth =document.querySelector('input.date')
    let fieldImagen = document.querySelector('input.avatar');
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    let regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

    //Validando el campo Nombre
    
    let errorName = document.querySelector(".errorName p");    
    
    fieldName.addEventListener('focus', function () {
        
        if (fieldName.value == "") {

            errorName.innerHTML += "El campo nombre no debe estar vacío";

        }
                
    })

    fieldName.onkeydown  = function () {
   
        errorName.innerHTML = "";           
    }

    fieldName.onblur  = function () {

        if (fieldName.value.length < 2 ) {

            errorName.innerHTML = "El campo nombre de poseer al menos 2 caracteres";  
            

        } else {

            errorName.innerHTML = "";
        }
                 
    }

    
    //Validando el campo Email
    
    let errorEmail = document.querySelector(".errorEmail p");    
    
    fieldEmail.addEventListener('focus', function () {

        if (fieldEmail.value == "") {

            errorEmail.innerHTML += "El campo email no debe estar vacío";   

        }
            
             
    })
    
    fieldEmail.onkeydown  = function () {
       
        errorEmail.innerHTML = "";           
    }
    
    fieldEmail.onblur  = function () {
    
        if (regex.test(fieldEmail.value) == false) {

            errorEmail.innerHTML = "debes escribir un email válido";

        } else {
    
            errorEmail.innerHTML = "";
        }
                     
    }

    //Validando el campo Password
    
    let errorPassword = document.querySelector(".errorPassword p");    
    
    fieldPassword.addEventListener('focus', function () {

        if (fieldPassword.value == "") {

            errorPassword.innerHTML += "El campo password no debe estar vacío"; 

        }
    })
    
    fieldPassword.onkeydown  = function () {
       
        errorPassword.innerHTML = "";           
    }
    
    fieldPassword.onblur  = function () {
    
        if (fieldPassword.value.length < 8 ) {
    
            errorPassword.innerHTML = "La contraseña debe poseer al menos 8 caracteres";  
    
        } else {
    
            errorPassword.innerHTML = "";
        }
                     
    }

    
    let errorImagen = document.querySelector(".errorImagen p");    
    
    fieldImagen.addEventListener('mouseover', function () {
            
        errorImagen.innerHTML = "Deseas subir una imagen??";        
    })
      
    fieldImagen.onclick  = function () {    

        errorImagen.innerHTML = "Recuerda que los formatos admitidos son JPG, JPEG, PNG y GIF";  
                   
    }
    
    fieldImagen.onmouseout  = function () {  
        
        if (fieldImagen.value.indexOf('.jpg') != -1 || fieldImagen.value.indexOf('.jpeg') !=-1 || fieldImagen.value.indexOf('.gif') !=-1 || fieldImagen.value.indexOf('.png') !=-1) {

            errorImagen.innerHTML = "Bien!!! subiste un formato válido";      
        
        } else {

            errorImagen.innerHTML = "El archivo que elegiste no coincide los formatos admitidos (JPG, JPEG, PNG y GIF)"; 

        }              
    }

    Edad.addEventListener('blur', () => {
        switch (true) {
            case !Edad.value:
                errorEdad.innerHTML = "Debe ingresar su fecha de nacimiento"
                Edad.classList.add('is-invalid');
                break;
            case moment(Edad.value) > moment():
                errorEdad.innerHTML = "Coloque una fecha adecuada"
                Edad.classList.add('is-invalid');
                break;
            case moment().diff(moment(Edad.value), 'years') < 18:
                errorEdad.innerHTML = "Debe ser mayor de edad para continuar"
                Edad.classList.add('is-invalid');
                break;
            default:
                errorEdad.innerHTML = "";
                Edad.classList.remove('is-invalid');
                Edad.classList.add('is-valid');
                break;
        }
    })


    


    

}