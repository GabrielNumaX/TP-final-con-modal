var formComprar = [{inputButton: '<input type="button" name="button_compra" value="Comprar" onclick="compra()">'}]

function cargarForm() {

  var divCompra = document.getElementById("div_compra_xul");
  divCompra.innerHTML= '<form>';
  for(i=0; i<formComprar.length; i++){
    divCompra.innerHTML += formComprar[i].inputButton;
  }
  divCompra.innerHTML+= '</form>';
}

cargarForm();
