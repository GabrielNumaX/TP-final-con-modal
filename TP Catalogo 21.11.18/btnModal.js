var modalDaVinci = document.getElementById('simpleModalDaVinci');

var modalBtnDaVinci = document.getElementById('modalBtnDaVinci');

var closeBtnDaVinci = document.getElementsByClassName('closeBtnDaVinci')[0];

var modalPicasso = document.getElementById('simpleModalPicasso');

var modalBtnPicasso = document.getElementById('modalBtnPicasso');

var closeBtnPicasso = document.getElementsByClassName('closeBtnPicasso')[0];

var modalVanGogh = document.getElementById('simpleModalVanGogh');

var modalBtnVanGogh = document.getElementById('modalBtnVanGogh');

var closeBtnVanGogh = document.getElementsByClassName('closeBtnVanGogh')[0];

var modalXul = document.getElementById('simpleModalXul');

var modalBtnXul = document.getElementById('modalBtnXul');

var closeBtnXul = document.getElementsByClassName('closeBtnXul')[0];

//listen al click q abre
modalBtnDaVinci.addEventListener('click', openModalDaVinci);

modalBtnPicasso.addEventListener('click', openModalPicasso);

modalBtnVanGogh.addEventListener('click', openModalVanGogh);

modalBtnXul.addEventListener('click', openModalXul);

//listen al click que cierra
closeBtnDaVinci.addEventListener('click', closeModalDaVinci);

closeBtnPicasso.addEventListener('click', closeModalPicasso);

closeBtnVanGogh.addEventListener('click', closeModalVanGogh);

closeBtnXul.addEventListener('click', closeModalXul);
//listen al click fuera de la ventana para cerrar
window.addEventListener('click', outsideClick);




//esta funcion hace que el boton abra el modal
function openModalDaVinci(){
  modalDaVinci.style.display = 'block';
}

//function para cerrar modal
function closeModalDaVinci(){
  modalDaVinci.style.display = 'none';
}

function openModalPicasso(){
  modalPicasso.style.display = 'block';
}

//function para cerrar modal
function closeModalPicasso(){
  modalPicasso.style.display = 'none';
}

function openModalVanGogh(){
  modalVanGogh.style.display = 'block';
}

function closeModalVanGogh(){
  modalVanGogh.style.display = 'none';
}

function openModalXul(){
  modalXul.style.display = 'block';
}

function closeModalXul(){
  modalXul.style.display = 'none'
}
//funcion para cerrar modal si click fuera ventana
function outsideClick(e){
  if(e.target == modalDaVinci){
    modalDaVinci.style.display = 'none';
  }
  if(e.target == modalPicasso){
    modalPicasso.style.display = 'none';
  }
  if(e.target == modalVanGogh){
    modalVanGogh.style.display = 'none';
  }
  if(e.target == modalXul){
    modalXul.style.display = 'none';
  }
}
