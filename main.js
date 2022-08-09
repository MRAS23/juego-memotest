const $cartas = document.querySelectorAll(".carta");

const colores = ["rojo", "azul", "verde", "amarillo", "morado", "naranja"];

function obtenerNumeroAleatorio() {
  return Math.round(Math.random() * 11);
}

function asignarColorAleatorioCartas() {
  for (let i = 0; i < colores.length; i++) {
    let numeroAleatorio = obtenerNumeroAleatorio();
    for (let j = 0; j < 2; j++) {
      while ($cartas[numeroAleatorio].id !== "") {
        numeroAleatorio = obtenerNumeroAleatorio();
      }
      $cartas[numeroAleatorio].id = colores[i];
    }
  }
}

asignarColorAleatorioCartas();

let cartasSeleccionadas = [];

function manejarInputJugador(e) {
  const $carta = e.target;

  if (cartasSeleccionadas.length < 2) {
    cartasSeleccionadas.push($carta.id);
  }
  if (cartasSeleccionadas.length === 2) {
    verificarCoincidencias();
    console.log(verificarCoincidencias());
  }
}

