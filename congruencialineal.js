var output = document.getElementById("square");
var tabla = document.getElementById("tabla");

window.onload = () => {
    let form = document.querySelector("form#form_square_medio");
    form.onsubmit = (e) => {
        var semilla = document.getElementById("rn").value;
        var a = document.getElementById("a").value;
        var c = document.getElementById("c").value;
        var m = document.getElementById("m").value;

        output.innerHTML = "<b>Método de congruencia lineal</b> <br/>\nSemilla: " + semilla;
        e.preventDefault();
        let arr = generarNumeros(semilla, a, c, m);
        genera_tabla(15, arr);
    };
};

// Método de congruencia lineal
function generarNumeros(sem, a, c, m) {

    let semilla = parseInt(sem);
    let aV = parseInt(a);
    let cV = parseInt(c);
    let mV = parseInt(m);
    let arr = [];
    let totalSuma = 0;
    let modTotal = 0;

    let num1_before = 0;

    for (let i = 0; i < 16; i++) {
        num1_before = semilla;
        totalSuma = aV*semilla+cV;
        modTotal = totalSuma % mV;
        semilla = modTotal;
        let obj = {
            index: i,
            xn: normalize(num1_before),
            axc: normalize(totalSuma),
            axcmodm: normalize(modTotal)
        };
        arr.push(obj);
        console.log(obj);
    }
    return arr;
}

function normalize(value, min = 0, max = Math.pow(2,32)){
        normalized = (value-min)/(max-min);
        let res =  normalized*100000000;
        return res.toFixed(2);
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
    var cabecera2Text = document.createTextNode("X(n)");
    cabecera2.appendChild(cabecera2Text);

    var cabecera3 = document.createElement("th");
    var cabecera3Text = document.createTextNode("a*X(n)+c");
    cabecera3.appendChild(cabecera3Text);

    var cabecera4 = document.createElement("th");
    var cabecera4Text = document.createTextNode("[a*X(n)+c] mod m");
    cabecera4.appendChild(cabecera4Text);


    tblBody.appendChild(cabecera1);
    tblBody.appendChild(cabecera2);
    tblBody.appendChild(cabecera3);
    tblBody.appendChild(cabecera4);
    // Crea las celdas
    for (var i = 0; i < n+1 ; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
        var celda = document.createElement("td");
        for (var j = 0; j < 4; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            if (j == 0) {
                var textoCelda = document.createTextNode(arr[i].index.toString());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            } else if (j == 1) {
                var textoCelda = document.createTextNode(arr[i].xn.toString());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            } else if (j == 2) {
                var textoCelda = document.createTextNode(arr[i].axc.toString());
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            } else if (j == 3) {
                var textoCelda = document.createTextNode(arr[i].axcmodm.toString());
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
    var ejemplo = document.createElement("p");
    var textoEjemplo = document.createTextNode("Otro ejemplo:\n X(n)=5 \n a=7, \n c=9 \n m=11");
    ejemplo.appendChild(textoEjemplo)

    body.appendChild(tabla);
    body.appendChild(ejemplo);
}