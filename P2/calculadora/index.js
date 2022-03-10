console.log("Ejecutando JS...");


display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("C")
del = document.getElementById("CE")


const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2_INIT: 3,
  OP2: 4,
}
let estado =ESTADO.INIT;
//ARRAY NUMEROS
let boton = document.getElementsByClassName("numero")
for (i=0; i<boton.length; i++) {
    boton[i].onclick = (bot) => {
    botones(bot.target.value);
    console.log('numero');
  }
}
//array para operaciones
let simbolo = document.getElementsByClassName("sim")
for (i=0; i<simbolo.length; i++) {
    simbolo[i].onclick = (simb) => {
    simbolos(simb.target.value);
    console.log('Simbolo');
  }
}
//Igual
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
  console.log('Resultado');
}
//Eliminar Todo
clear.onclick = () => {
  display.innerHTML = "";
}
// elimina Uno
del.onclick = () => {
  display.innerHTML = display.innerHTML.slice(0,-1);
}

function botones(num){
  //-- Segun el estado hacemos una cosa u otra
  if (estado == ESTADO.INIT) {
    display.innerHTML = num;
    estado = ESTADO.OP1;
  }else if (estado == ESTADO.OP1){
    display.innerHTML += num;
  } else if (estado == ESTADO.OPERATION) {
    display.innerHTML += num;
    estado = ESTADO.OP2_INIT;
  }else if (estado == ESTADO.OP2_INIT) {
    display.innerHTML +=  num;
    estado = ESTADO.OP2;
  }else if (estado == ESTADO.OP2){
    display.innerHTML += num;
  }
}

function simbolos(oper){
  if (estado != ESTADO.OPERATION) {
    display.innerHTML += oper;
    estado = ESTADO.OPERATION;
  }
}