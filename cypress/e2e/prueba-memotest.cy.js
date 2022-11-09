const { set } = require("lodash");

+(
  /// <reference types="Cypress" />

  context("memotest", () => {
    before(() => {
      cy.visit("/");
    });

    describe("Juega al memotes", () => {
      const NUMERO_CARTAS = 12;
      it("se asegura que haya un tablero con cartas", () => {
        cy.get("#tablero").find(".carta").should("have.length", NUMERO_CARTAS);
      });

      it("se asugura que el color de las cartas sea aleatorio", () => {
        cy.get(".carta").then((cartas) => {
          let clasesOriginales = [];
          cartas.each(function (i, carta) {
            clasesOriginales.push(carta.className);
          });

          cy.visit("/");

          let clasesNuevas = [];
          cy.get(".carta").then((clasesNuevas) => {
            clasesNuevas.each(function (i, carta) {
              clasesNuevas.push(carta.className);
            });

            cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas);
          });
        });
      });

      describe("resuelve el juego", () => {
        let mapaDePares, listaDePares;

        it("elige una combinacion erronea", () => {
          cy.get(".carta").then((cartas) => {
            const $tablero = cy.get("#tablero");
            $tablero.should("have.class", "oculto");
            cy.get("#boton-jugar").should("have.class", "btn btn-outline-primary btn-lg").click().wait(100);
            $tablero.should("have.class", "container-md");

            setTimeout(() => {
              mapaDePares = obtenerParesDeCuadros(cartas);
              listaDePares = Object.values(mapaDePares);

              listaDePares[0][0].click();
              listaDePares[1][0].click();
            }, 100);

            setTimeout(() => {
              expect(cartas).to.have.css("background-color", "rgba(0, 0, 0, 0)");
            }, 2000);
          });
        });
        it("resuelve el juego", () => {
          cy.get("#tablero").find(".carta").should("have.length", NUMERO_CARTAS).wait(2000);

          listaDePares.forEach((par) => {
            cy.get(par[0]).click();
            cy.get(par[1]).click().wait(1000);
          });

          cy.get("#tablero").should("have.class", "oculto");
          cy.get("#container-pantalla-reinicio").should("have.class", "");
          cy.get("#cantidad-movimientos").should("have.text", "Ganaste en 7 movimientos!");
          cy.get("#boton-reiniciar-juego").click();
        });
      });
    });
  })
);

function obtenerParesDeCuadros(cartas) {
  const pares = {};

  cartas.each((i, carta) => {
    const claseColor = carta.className.replace("carta ", "");

    if (pares[claseColor]) {
      pares[claseColor].push(carta);
    } else {
      pares[claseColor] = [carta];
    }
  });

  console.log(pares);
  return pares;
}

/* context("simon-dice", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("juega al simon dice", () => {
    const NUMERO_BOTONES = 4;

    it("se asegura que haya un tablero con botones", () => {
      cy.get("#simon").find(".cuadrado").should("have.length", NUMERO_BOTONES);
    });
  });

  describe("Resuelve el juego", () => {
    it("pierde a la primera", () => {
      const $botonJugar = cy.get("#boton-comenzar");
      $botonJugar.should("have.class", "boton-neon");
      $botonJugar.click();
      $botonJugar.should("have.class", "oculto");

      cy.window()
        .wait(1000)
        .then((win) => {
          if (`.${win.secuenciaPC[0]}` == ".verde") {
            cy.get(`.rojo`).click().wait(1000);
          } else if (`.${win.secuenciaPC[0]}` == ".amarillo") {
            cy.get(`.rojo`).click().wait(1000);
          } else if (`.${win.secuenciaPC[0]}` == ".azul") {
            cy.get(`.rojo`).click().wait(1000);
          } else if (`.${win.secuenciaPC[0]}` == ".rojo") {
            cy.get(`.verde`).click().wait(1000);
          }
        });

      const $BotonVolverAJugar = cy.get("#boton-volver-a-jugar");
      $BotonVolverAJugar.should("have.class", "boton-neon");
      $BotonVolverAJugar.click().wait(1000);
    });

    it("llega a la 4ta ronda", () => {
      cy.window().then((win) => {
        cy.get(".rondas").should("have.text", "0");
        cy.get(`.${win.secuenciaPC}`).click().wait(3100);
        cy.window().then((win) => {
          cy.get(".rondas").should("have.text", "1");
          cy.get(`.${win.secuenciaPC[0]}`).click().wait(500);
          cy.get(`.${win.secuenciaPC[1]}`)
            .click()
            .wait(1000 * 3);
        });
        cy.window().then((win) => {
          cy.get(".rondas").should("have.text", "2");
          cy.get(`.${win.secuenciaPC[0]}`).click().wait(500);
          cy.get(`.${win.secuenciaPC[1]}`).click().wait(500);
          cy.get(`.${win.secuenciaPC[2]}`)
            .click()
            .wait(1000 * 4);
        });
        cy.window().then((win) => {
          cy.get(".rondas").should("have.text", "3");
          cy.get(`.${win.secuenciaPC[0]}`).click().wait(500);
          cy.get(`.${win.secuenciaPC[1]}`).click().wait(500);
          cy.get(`.${win.secuenciaPC[2]}`).click().wait(500);
          cy.get(`.${win.secuenciaPC[3]}`)
            .click()
            .wait(1000 * 5);
        });
        cy.get(".rondas").should("have.text", "4");
        if (`.${win.secuenciaPC[0]}` == ".verde") {
          cy.get(`.rojo`).click();
        } else if (`.${win.secuenciaPC[0]}` == ".amarillo") {
          cy.get(`.rojo`).click();
        } else if (`.${win.secuenciaPC[0]}` == ".azul") {
          cy.get(`.rojo`).click();
        } else if (`.${win.secuenciaPC[0]}` == ".rojo") {
          cy.get(`.verde`).click();
        }

        cy.get("#simon").should("have.class", "oculto");
      });
    });
  });
});
 */
