// Define la función validarVar() fuera de la función ons.getScriptPage().onInit


const campo = document.getElementById("cod");
const sugerenciasDiv = document.getElementById("sugerencias");
campo.addEventListener("input", function () {

  validarVar();
  manejarAutocompletado();
  

});

campo.addEventListener("keydown", function (event) {
  if (event.key === "Tab" && sugerenciasDiv.style.display === "block") {
event.preventDefault(); // Evita que la tecla Tab cambie de foco
manejarAutocompletado();
completarSugerencia();

const palabraIngresada = obtenerUltimaPalabra(campo.value);
campo.value = campo.value.replace(palabraIngresada, sugerenciasDiv.textContent);
sugerenciasDiv.style.display = "none";
}
});



function ocultarSugerencias() {
sugerenciasDiv.style.display = "none";
}
function validarVar() {
  const codigo = campo.value.split('\n'),
    //   declaracionVar = /^declare\s+([a-zA-Z_]\w*(?:,\s*[a-zA-Z_]\w*)*)\s+(entero|real|cadena|logico|fecha);$/,
    declaracionVar = /^declare\s+([a-zA-Z_]\w*(?:,\s*[a-zA-Z_]\w*)*)\s+(entero|real|cadena|logico|fecha);$/i
  resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = "";

  for (let i = 0; i < codigo.length; i++) {
    const linea = codigo[i].trim();
    if (linea === "") continue;

    let estilo = "width: 100%;height: 20%;background-color: #12141b;";

    let mensaje = "";
    
    if (declaracionVar.test(linea)) {
      estilo += "color: #07f527";
      mensaje = "Correcta";
    } else {
      estilo += "color: red";
      mensaje = "Inválida";
    }

    resultadoDiv.innerHTML += `<div style="${estilo}">Línea ${i + 1}: ${mensaje}</div>`
  }

}
// coincidencia por espaciados
//sugerir declaracion de variable y especificar error 

//   const codigo = campo.value.split('\n');
//  const ultimaLinea = codigo[codigo.length - 1].trim(); // Obtén la última línea del textarea
//  const palabrasEnLinea = ultimaLinea.split(' '); // Divide la última línea en palabras
//  const palabraIngresada = palabrasEnLinea[palabrasEnLinea.length - 1]; // Obtén la última palabra

  console.log("Se ha escrito en el textarea");
  mostrarSugerencias();

  /////////

  function encontrarPalabraMasSimilar(palabraIngresada, listaDePalabras) {
    let palabraMasSimilar = "";
    let mayorSimilitud = 0;

    for (const palabra of listaDePalabras) {
      let similitud = calcularSimilitud(palabraIngresada, palabra);
      if (similitud > mayorSimilitud) {
        mayorSimilitud = similitud;
        palabraMasSimilar = palabra;
      }
    }

    return palabraMasSimilar;
  }

  function calcularSimilitud(palabra1, palabra2) {

    // algoritmos  de coeficiente de Jaccard, distancia Levenshtein, etc.

    // Por ejemplo, calcular la similitud basada en la longitud de la coincidencia.
    let longitudCoincidencia = 0;
    for (let i = 0; i < palabra1.length && i < palabra2.length; i++) {
      if (palabra1[i] === palabra2[i]) {
        longitudCoincidencia++;
      } else {
        break;
      }
    }

    return longitudCoincidencia;
  }


function manejarAutocompletado() {
const codigo = campo.value;
const palabrasClave = ["declare", "logico", "fecha", "entero", "real", "cadena"];

const palabraIngresada = obtenerUltimaPalabra(codigo);
const sugerencias = palabrasClave.filter(palabra => palabra.startsWith(palabraIngresada));

if (sugerencias.length > 0) {
const sugerenciaComun = encontrarSugerenciaComun(sugerencias);
if (sugerenciaComun) {
const textoAnterior = codigo.substring(0, codigo.lastIndexOf(palabraIngresada));
campo.value = textoAnterior + sugerenciaComun + " ";
}
}
}

  function mostrarSugerencias() {
const codigo = campo.value;
//listado temporal debe contener lo que tiene campo.value
const listaDePalabras = ["declare", "logico", "fecha", "entero", "real", "cadena"];

const palabraIngresada = obtenerUltimaPalabra(codigo);
const sugerencias = listaDePalabras.filter(palabra => palabra.startsWith(palabraIngresada));

const palabraMasSimilar = encontrarPalabraMasSimilar(palabraIngresada, listaDePalabras);
  console.log(palabraMasSimilar);

  if (sugerencias.length > 0) {
const sugerenciaComun = encontrarSugerenciaComun(sugerencias);
if (sugerenciaComun) {
const textoAnterior = codigo.substring(0, codigo.lastIndexOf(palabraIngresada));
campo.value = textoAnterior + sugerenciaComun + " ";
}
}
}

function encontrarSugerenciaComun(sugerencias) {
if (sugerencias.length === 1) {
return sugerencias[0];
}

const palabraIngresada = obtenerUltimaPalabra(campo.value);
return sugerencias.find(sugerencia => sugerencia === palabraIngresada);
}
  
  function obtenerUltimaPalabra(texto) {
const palabras = texto.trim().split(" ");
return palabras[palabras.length - 1];
}

function reemplazarUltimaPalabra(texto, nuevaPalabra) {
const palabras = texto.trim().split(" ");
palabras[palabras.length - 1] = nuevaPalabra;
return palabras.join(" ");
}

  //const palabraIngresada = campo.value; 
