// Div
var output = document.getElementById("square");
var tabla = document.getElementById("tabla");

window.onload = () => {
  let form = document.querySelector("form#form_square");
  form.onsubmit = (e) => {
    var semilla = document.getElementById("rn").value;
    output.innerHTML = "<b>Método del cuadrado medio</b> <br/>\nSemilla: " + semilla;
    e.preventDefault();
    let arr = generarNumeros(semilla);
    genera_tabla(12, arr);
  };

};

function LeftMidRight(number) {
  let mid = number.toString().length / 2;
  let numberString = number.toString();
  let digitLeft = numberString.charAt([mid - 1]);
  let digitMid = numberString.charAt([mid]);
  let digitRight = numberString.charAt([mid + 1]);
  let res = digitLeft + digitMid + digitRight;
  return res;
}


// Método del cuadrado medio
function generarNumeros(sem) {

  let semilla  = sem; 
  let snum2, snum3;
  let numero1, numero2;
  let s1, s2, firstdigit;
  let arr = [];

  s1 = semilla.toString().length;
  numero1 = semilla;

  let num1_before = 0;
  let rncuadradomid = "";

  for (let i = 1; i < 14; i++) {
    num1_before = numero1;
    numero2 = Math.pow(numero1, 2);
    snum2 = numero2.toString();
    s2 = snum2.length;
    firstdigit = (s2 - s1) / 2;

    if (numero2.toString().length == 5) {
      rncuadradomid = parseInt(LeftMidRight(numero2), 10);
    } else {
      rncuadradomid = parseInt(
        snum2.toString().substring(firstdigit, firstdigit + (s1 + 1)),
        10
      );
    }
    snum3 = snum2.toString().substring(firstdigit, firstdigit + s1) - 0;
    let obj = {
      index: i - 1,
      rn: num1_before,
      rncuadrado: snum2,
      rncuadradomid: rncuadradomid,
      valizq: snum3,
    };
    numero1 = parseInt(snum3);
    arr.push(obj);
    console.log(obj);

  }
    return arr;
}



function genera_tabla(n, arr) {
  tabla.innerText = "";

  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tblBody = document.createElement("tbody");

  var cabecera1 = document.createElement("th");
  var cabecera1Text = document.createTextNode("n");
  cabecera1.appendChild(cabecera1Text);

  var cabecera2 = document.createElement("th");
  var cabecera2Text = document.createTextNode("R(n)");
  cabecera2.appendChild(cabecera2Text);

  var cabecera3 = document.createElement("th");
  var cabecera3Text = document.createTextNode("R(n)^2");
  cabecera3.appendChild(cabecera3Text);

  var cabecera4 = document.createElement("th");
  var cabecera4Text = document.createTextNode("M.R(n)^2");
  cabecera4.appendChild(cabecera4Text);

  var cabecera5 = document.createElement("th");
  var cabecera5Text = document.createTextNode("Val Izq");
  cabecera5.appendChild(cabecera5Text);

  tblBody.appendChild(cabecera1);
  tblBody.appendChild(cabecera2);
  tblBody.appendChild(cabecera3);
  tblBody.appendChild(cabecera4);
  tblBody.appendChild(cabecera5);
  // Crea las celdas
  for (var i = 0; i < n + 1; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
    var celda = document.createElement("td");
    for (var j = 0; j < 5; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");

      if (j == 0) {
        var textoCelda = document.createTextNode(arr[i].index.toString());
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);


      } else if (j == 1) {
        var textoCelda = document.createTextNode(arr[i].rn.toString());
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      } else if (j == 2) {
        var textoCelda = document.createTextNode(arr[i].rncuadrado.toString());
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      } else if (j == 3) {
        var textoCelda = document.createTextNode(arr[i].rncuadradomid.toString());
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      } else if (j == 4) {
         var textoCelda = document.createTextNode(arr[i].valizq.toString());
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
}
