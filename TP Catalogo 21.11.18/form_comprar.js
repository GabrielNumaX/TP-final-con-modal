//este es el archivo js que carga el boton de compra en todas las paginas de todos las obras
//incialmente cargaba un campo de email y el boton de compra
//pero me decidi por un solo boton gestionado con un prompt y alerts
//la dificultad de esta decision fue que no logre implementar mongoDB
//para que trajera el email del window.alert y lo guardara en la base de datos... seguire investigando otras opciones

var formComprar = [{inputButton: '<input type="button" name="button_compra" value="Comprar" onclick="compra()">'}]

function cargarForm() {

  var divCompra = document.getElementById("div_compra_davinci");
  divCompra.innerHTML= '<form>';
  for(i=0; i<formComprar.length; i++){
    divCompra.innerHTML += formComprar[i].inputButton;
  }
  divCompra.innerHTML+= '</form>';
}

cargarForm();
