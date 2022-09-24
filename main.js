const $cartas = document.querySelectorAll(".carta");

let colores = ["red", "blue", "green", "yellow", "purple", "orange"];

document.querySelector("#boton-jugar").onclick = iniciarJuego;

function iniciarJuego() {
  inicializarCantidadMovimientos();
  ocultarElemento(document.querySelector(".container-flex"));
  asignarColorAleatorioCartas();
  mostrarTablero();
  mostrarElemento($contadorMovimientos);
}

function ganarJuego() {
  ocultarElemento(document.querySelector("#tablero"));
  mostrarElemento(document.querySelector("#container-pantalla-reinicio"));
  actualizarMensajeContadorMovimientos();
  ocultarElemento($contadorMovimientos);
}

document.querySelector("#boton-reiniciar-juego").onclick = reiniciarJuego;

function reiniciarJuego() {
  colores = ["red", "blue", "green", "yellow", "purple", "orange"];
  ocultarTodasLasCartas();
  asignarColorAleatorioCartas();
  inicializarCantidadMovimientos();
  ocultarElemento(document.querySelector("#container-pantalla-reinicio"));
  mostrarTablero();
}

function obtenerNumeroAleatorio() {
  return Math.round(Math.random() * ($cartas.length - 1));
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
let $primerCarta = null;
let $contadorMovimientos = document.querySelector("#contador-movimientos");

function manejarInputJugador(e) {
  const $carta = e.target;

  mostrarCarta($carta);

  if ($primerCarta === null) {
    $primerCarta = $carta;
  } else {
    if ($primerCarta === $carta) {
      return;
    }
    $primerCarta = null;
  }
  if (cartasSeleccionadas.length < 2) {
    cartasSeleccionadas.push($carta.id);
  }

  if (cartasSeleccionadas.length === 2) {
    bloquearInputJugador();
    contarMovimiento();
    if (verificarCoincidencias()) {
      eliminarColorAcertado();
      cartasSeleccionadas = [];
    }
    setTimeout(() => {
      ocultarCartas();
      desbloquearInputJugador();
    }, 1000);
    cartasSeleccionadas = [];
    if (colores.length === 0) {
      ganarJuego();
    }
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
        $carta.style.backgroundColor = "transparent";
      }
    });
  });
}

function ocultarTodasLasCartas() {
  $cartas.forEach(($carta) => {
    $carta.style.backgroundColor = "transparent";
    $carta.id = "";
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
  document.querySelector("#tablero").className = "container-md";
}

function ocultarElemento(elementoHTML) {
  elementoHTML.className = "oculto";
}

function mostrarElemento(elementoHTML) {
  elementoHTML.className = "";
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

function inicializarCantidadMovimientos() {
  $contadorMovimientos.innerHTML = 0;
}

function contarMovimiento() {
  $contadorMovimientos.innerHTML++;
}

function actualizarMensajeContadorMovimientos() {
  const cantidadMovimientos = $contadorMovimientos.innerHTML;
  const $movimientosAlGanar = document.querySelector("#cantidad-movimientos");
  $movimientosAlGanar.innerHTML = `Ganaste en ${cantidadMovimientos} movimientos!`;
}
