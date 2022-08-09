const $cartas = document.querySelectorAll(".col-sm");

const colores = ["rojo", "azul", "verde", "amarillo", "negro", "blanco"];

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
      /* if ($cartas[numeroAleatorio].id === "") {
        $cartas[numeroAleatorio].id = colores[i];
      } */
    }
  }
}

asignarColorAleatorioCartas();
