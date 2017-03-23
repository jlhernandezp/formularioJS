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
*   5.Validar la EDAD que contenga solamente valores numéricos y que esté en el rango de
*   0 a 105. Si se produce algún error mostrar el mensaje en el contenedor "errores" y
*   poner el foco en el campo EDAD.
*   6. Validar el NIF. Utilizar una expresión regular que permita solamente 8 números un
*   guión y una letra. Si se produce algún error mostrar el mensaje en el contenedor
*   "errores" y poner el foco en el campo NIF. No es necesario validar que la letra sea
*   correcta. Explicar las partes de la expresión regular mediante comentarios.
*   7. Validar el E-MAIL. Utilizar una expresión regular que nos permita comprobar que el email
*   sigue un formato correcto. Si se produce algún error mostrar el mensaje en el
*   contenedor "errores" y poner el foco en el campo E-MAIL. Explicar las partes de la
*   expresión regular mediante comentarios.
*   8. Validar que se haya seleccionado alguna de las PROVINCIAS. Si se produce algún error
*   mostrar el mensaje en el contenedor "errores" y poner el foco en el campo
*   PROVINCIA.
9. Validar el campo FECHA utilizando una expresión regular. Debe cumplir alguno de los
siguientes formatos: dd/mm/aaaa o dd-mm-aaaa. No se pide validar que sea una fecha
de calendario correcta. Si se produce algún error mostrar el mensaje en el contenedor
"errores" y poner el foco en el campo FECHA. Explicar las partes de la expresión
regular mediante comentarios.
10. Validar el campo TELEFONO utilizando una expresión regular. Debe permitir 9 dígitos
obligatorios. Si se produce algún error mostrar el mensaje en el contenedor "errores" y
poner el foco en el campo TELEFONO. Explicar las partes de la expresión regular
mediante comentarios.
11. Validar el campo HORA utilizando una expresión regular. Debe seguir el patrón de
hh:mm. No es necesario validar que sea una hora correcta. Si se produce algún error
mostrar el mensaje en el contenedor "errores" y poner el foco en el campo HORA.
Explicar las partes de la expresión regular mediante comentarios.
12. Pedir confirmación de envío del formulario. Si se confirma el envío realizará el envío de
los datos; en otro caso cancelará el envío.
**/

function iniciar(){
    borrarCookie("numeroDeIntentos");
    document.getElementById("nombre").addEventListener('blur',function (){aMayusculas("nombre");},false);
    document.getElementById("apellidos").addEventListener('blur',function (){aMayusculas("apellidos");},false);
    document.getElementById("edad").addEventListener('blur',function (){numericoConLimites("edad",0,105);},false);
    
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
            document.getElementById(campo).className="error";
            return false;
        } else {
            document.getElementById(campo).value=document.getElementById(campo).value.toUpperCase();
            document.getElementById(campo).className="";
       
        }
       return true;     
    }
     
    
    
/*
 * 
 * @param {type} campo nombre del elemento a comprobar.
 * @param {type} min valor mínimo
 * @param {type} max valor máximo
 * @returns {Boolean}
 */

    function numericoConLimites(campo, min, max){
        
        patt=/[0-9]*/;
        if (patt.test(document.getElementById(campo).value)) {
            numero=parseInt(document.getElementById(campo).value);
            if (numero<min||numero>max) {
                document.getElementById('errores').innerHTML="Error: Los datos introducidos en el campo "+campo + " deben estar entre "+min+" y "+max+".";
                document.getElementById(campo).focus();
                document.getElementById(campo).style.background="yellow";
                document.getElementById(campo).className="error";
                return false;
            }
        }
        document.getElementById(campo).className="";
        return true;
    }
    
   /**
    * 
    * @param {type} campo nombre del elemento a comprobar.
    * @returns {Boolean}
    */
    function comprobarDni (campo){
        
        patt=/[0-9]{8}[A-Z]$/; // [0-9] indica que solo acepte números {8} que sean 8 números y [A-Z] sólo una letra mayúscula
        
        if (!patt.test( document.getElementById(campo).value)) {
             document.getElementById('errores').innerHTML="Error: Los datos introducidos en el campo "+campo + " nos son válidos formato:99999999L.";
            document.getElementById(campo).focus();
            document.getElementById(campo).style.background="yellow";
            document.getElementById(campo).className="error";
            return false;
        }
        document.getElementById(campo).className="";
        return true;
    }   
    /**
     * 
     * @param {type} campo  campo nombre del elemento a comprobar
     * @returns {Boolean}
     */
    function comprobarEmail(campo) {
        patt=/(^[-\w\.]{2,})@([-\w\.]{2,}*)\.([a-zA-Z]{2,6}$)/;
       if (!patt.test( document.getElementById(campo).value)) {
             document.getElementById('errores').innerHTML="Error: Los datos introducidos en el campo "+campo + " no son válidos.";
            document.getElementById(campo).focus();
            document.getElementById(campo).style.background="yellow";
            document.getElementById(campo).className="error";
            return false;
        }
        document.getElementById(campo).className="";
        return true;
    }
    