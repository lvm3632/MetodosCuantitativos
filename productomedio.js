var output = document.getElementById("square");
var tabla = document.getElementById("tabla");

window.onload = () => {
    let form = document.querySelector("form#form_square_medio");
    form.onsubmit = (e) => {
        var semilla = document.getElementById("rn").value;
        output.innerHTML = "<b>Método del producto medio</b> <br/>\nSemilla: " + semilla;
        e.preventDefault();
        let arr = generarNumeros(semilla);
        genera_tabla(18, arr);
    };
};

// R(n)R(n+1) === 5
function LeftMidRight(number) {
    let mid = number.toString().length / 2;
    let numberString = number.toString();
    let digitLeft = numberString.charAt([mid - 1]);
    let digitMid = numberString.charAt([mid]);
    let digitRight = numberString.charAt([mid + 1]);
    let res = digitLeft + digitMid + digitRight;
    return res;
}


// Método del producto medio
function generarNumeros(sem) {

    let semilla = sem;
    let snum2, valizq;
    let numero1, numero2;
    let s1, s2, firstdigit;
    let arr = [];
    let totalsemilla = 0;
    let rnmasuno = 155;

    s1 = semilla.toString().length;
    numero1 = semilla;

    let num1_before = 0;
    let rnmulti = 0;
    let hasZero = false;
    for (let i = 1; i < 20; i++) {
        totalsemilla = numero1 * rnmasuno;

        let len_semilla = totalsemilla.toString().length;
        num1_before = numero1;
        numero2 = totalsemilla;
        snum2 = numero2.toString();
        s2 = snum2.length;
        firstdigit = (s2 - s1) / 2;
        if (len_semilla >= 6) {
            let check_string = snum2.toString().substring(firstdigit, firstdigit + (s1 + 1));
            if (check_string.charAt(0) == '0') {
                console.log(check_string, "checando");
                console.log(snum2.toString().substring(firstdigit + 1, firstdigit + (s1 + 1)));
                rnmulti = parseInt(snum2.toString().substring(firstdigit + 1, firstdigit + (s1 + 1)), 10);
                hasZero = true;

            } else {
                rnmulti = parseInt(snum2.toString().substring(firstdigit, firstdigit + (s1 + 1)), 10);
            }
        } else if (len_semilla == 5) {
            rnmulti = parseInt(LeftMidRight(numero2), 10);
        } else if (len_semilla == 4) {
            rnmulti = parseInt(snum2.toString().substring(firstdigit + 1, firstdigit + (s1)), 10);
        } else if (len_semilla == 3) {
            rnmulti = parseInt(snum2.toString().charAt(snum2.length / 2));
        } else if (len_semilla == 2) {
            rnmulti = 0;
        } else {
            rnmulti = parseInt(snum2.toString().substring(firstdigit, firstdigit + (s1 + 1)), 10);
        }

        if (rnmulti.toString().length <= 2) {
            valizq = rnmulti;
        } else {
            if (hasZero) {
                valizq = snum2.toString().substring(firstdigit + 1, firstdigit + s1 + 1) - 0;
                hasZero = false;
            } else {
                valizq = snum2.toString().substring(firstdigit, firstdigit + s1) - 0;
                hasZero = false;
            }
        }

        let obj = {
            index: i - 1,
            rn: num1_before,
            rnmasuno: rnmasuno,
            rnmasunomult: totalsemilla,
            productomedio: rnmulti,
            valizq: valizq
        };
        numero1 = parseInt(rnmasuno);
        rnmasuno = valizq;
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
    var cabecera3Text = document.createTextNode("R(n+1)");
    cabecera3.appendChild(cabecera3Text);

    var cabecera4 = document.createElement("th");
    var cabecera4Text = document.createTextNode("R(n)R(n+1)");
    cabecera4.appendChild(cabecera4Text);

    var cabecera5 = document.createElement("th");
    var cabecera5Text = document.createTextNode("M.R(n)R(n+1)");
    cabecera5.appendChild(cabecera5Text);

    var cabecera6 = document.createElement("th");
    var cabecera6Text = document.createTextNode("Val Izq");
    cabecera6.appendChild(cabecera6Text);

    tblBody.appendChild(cabecera1);
    tblBody.appendChild(cabecera2);
    tblBody.appendChild(cabecera3);
    tblBody.appendChild(cabecera4);
    tblBody.appendChild(cabecera5);
    tblBody.appendChild(cabecera6);
    // Crea las celdas
    for (var i = 0; i < n + 1; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
        var celda = document.createElement("td");
        for (var j = 0; j < 6; j++) {
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
                var textoCelda = document.createTextNode(arr[i].rnmasuno.toString());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            } else if (j == 3) {
                var textoCelda = document.createTextNode(arr[i].rnmasunomult.toString());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            } else if (j == 4) {
                var textoCelda = document.createTextNode(arr[i].productomedio.toString());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            } else if (j == 5) {
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