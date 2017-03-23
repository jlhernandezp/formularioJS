/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
 **/
window.onload=iniciar;
/*
 *  2. Almacenar en una cookie el número de intentos de envío del formulario que se van
 *  produciendo y mostrar un mensaje en el contenedor "intentos" similar a: "Intento de
*   Envíos del formulario: X". Es decir cada vez que le demos al botón de enviar tendrá que
*   incrementar el valor de la cookie en 1 y mostrar su contenido en el div antes
*   mencionado. Nota: para poder actualizar el contenido de un contenedor o div la
*   propiedad que tenemos que modificar para ese objeto es innerHTML.
*   3. Cada vez que los campos NOMBRE y APELLIDOS pierdan el foco, el contenido que se
*   haya escrito en esos campos se convertirá a mayúsculas.
*   4. Realizar una función que valide los campos de texto NOMBRE y APELLIDOS. Si se
*   produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en
*   los campos correspondientes.
**/

function iniciar(){
    borrarCookie("numeroDeIntentos");
    document.getElementById("nombre").addEventListener('blur',function (){aMayusculas("nombre");},false);
    document.getElementById("apellidos").addEventListener('blur',function (){aMayusculas("apellidos");},false);
    document.getElementById("enviar").addEventListener('click',nuevoIntento,false);
    
    
};
/*
 * Añade 1 al valor de la cookie numeroDeIntentos cada vez que pulsamos enviar o la crea con valor 1 si no existe.
 * 
 * @param {type} eventopordefecto evento para no ejecutar el salto a la página indicada en el formulario
 * @returns {undefined} 
 */
function nuevoIntento(eventopordefecto){
    if (leerCookie("numeroDeIntentos")!=""){
        intentos=parseInt(leerCookie("numeroDeIntentos"))+1;
        document.cookie="numeroDeIntentos="+intentos.toString();
     //   document.getElementById("intentos").innerHTML=" La cookie existe y tiene un valor de: "+intentos;
    } else {
        document.cookie="numeroDeIntentos=1;path=/";
     //   document.getElementById("intentos").innerHTML="Acabamos de crear la cookie valor 1 ";
    }
    document.getElementById("intentos").innerHTML="Intento de envíos al formulario: "+leerCookie("numeroDeIntentos");  
    eventopordefecto.preventDefault();
}
/*
 * Borra la cookie. puede hacerse llamando a crear cookie con parámetros en blanco o 0.
 * @param {type} nombreDeCookie
 * @returns {undefined}
 * 
 */

function borrarCookie(nombreDeCookie){
    
    document.cookie= nombreDeCookie+"="+""+"; max-age=0; path=/";
    
};
/* Lee el valor de una cookie,
 
 **@param : nombreDeCookie nombre de la cookie de la cual obtendremos el valor
 * 
 **/
function leerCookie(nombreDeCookie){ //lee el valor de una cookie
        
    ck=document.cookie;
    
    cookies=ck.split(";");
    valor="";
    for (i=0 ; i < cookies.length; i++){
        if (cookies[i].startsWith(nombreDeCookie)){
            valor=cookies[i].substr(nombreDeCookie.length+1);
        }
    }
    return valor;
    }
    
    /*
     * *************************************
     *  Funciones de validación de campos  *
     * *************************************
     */
    
    function aMayusculas(campo){      
        
        patt=/[^a-zA-Z'\s]+/;
        
        if (patt.test(document.getElementById(campo).value)){
            document.getElementById('errores').innerHTML="Error: Los datos introducidos en el campo "+campo + " deben ser caracteres.";
            document.getElementById(campo).focus();
            document.getElementById(campo).style.background="yellow";
        } else {
            document.getElementById(campo).value=document.getElementById(campo).value.toUpperCase();
            
            
        }
            
    }
    
   
    