const $cartas = document.querySelectorAll(".carta");

let colores = ["red", "blue", "green", "yellow", "purple", "orange"];

document.querySelector("#boton-jugar").onclick = iniciarJuego;

function iniciarJuego() {
  asignarColorAleatorioCartas();
  mostrarTablero();
}

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

let cartasSeleccionadas = [];
let contadorMovimientos = 0;

function manejarInputJugador(e) {
  const $carta = e.target;

  mostrarCarta($carta);

  if (cartasSeleccionadas.length < 2) {
    cartasSeleccionadas.push($carta.id);
  }

  if (cartasSeleccionadas.length === 2) {
    bloquearInputJugador();
    contadorMovimientos++;
    if (verificarCoincidencias()) {
      eliminarColorAcertado();
      cartasSeleccionadas = [];
    }
    setTimeout(() => {
      ocultarCartas();
      desbloquearInputJugador();
    }, 1000);

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
}

function ocultarCartas() {
  $cartas.forEach(($carta) => {
    colores.forEach((color) => {
      if ($carta.id === color) {
        $carta.style.backgroundColor = "black";
      }
    });
  });
}

function eliminarColorAcertado() {
  for (let i = 0; i < colores.length; i++) {
    if (colores[i] === cartasSeleccionadas[1]) {
      colores.splice(i, 1);
    }
  }
}

function mostrarTablero() {
  const $tablero = document.querySelector("#tablero");
  $tablero.className = "container";
}

function ocultarTablero() {
  const $tablero = document.querySelector("#tablero");
  $tablero.className = "oculto";
}

function bloquearInputJugador() {
  $cartas.forEach(function ($carta) {
    $carta.onclick = function () {};
  });
}

function desbloquearInputJugador() {
  $cartas.forEach(function ($carta) {
    $carta.onclick = manejarInputJugador;
  });
}
