const $cartas = document.querySelectorAll(".carta");

let colores = ["red", "blue", "green", "yellow", "purple", "orange"];

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

  mostrarCarta($carta);

  if (cartasSeleccionadas.length < 2) {
    cartasSeleccionadas.push($carta.id);
  }
  if (cartasSeleccionadas.length === 2) {
    verificarCoincidencias();
    console.log(verificarCoincidencias());
    cartasSeleccionadas = [];
  }
}

$cartas.forEach(function ($carta) {
  $carta.onclick = manejarInputJugador;
});

function verificarCoincidencias() {
  if (cartasSeleccionadas[0] === cartasSeleccionadas[1]) {
    return true;
  } else {
    return false;
  }
}

function mostrarCarta($carta) {
  $carta.style.backgroundColor = $carta.id;

  setTimeout(function () {
    $carta.style.backgroundColor = "black";
  }, 500);
}
