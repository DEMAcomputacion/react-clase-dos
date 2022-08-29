import React, { useState } from "react";
import "./Memotest.css";
import FancyButton from "../small/FancyButton";

const Cuadro = ({ color, onClick = () => {} }) => {
  return <div className={"cuadro " + color} onClick={onClick}></div>;
};

const PantallaWin = ({ show, onRestart = () => {} }) => {
  return (
    <div className={show ? "pantallaWin" : "pantallaWin--hidden"}>
      <span className="pantallaWin-text">{`Ganaste!!`}</span>
      <FancyButton onClick={onRestart}>Jugar nuevamente?</FancyButton>
    </div>
  );
};

const armaTablero = () => {
  const tablero = [];
  const colores = [
    "rojo",
    "rojo",
    "azul",
    "azul",
    "verde",
    "verde",
    "amarillo",
    "amarillo",
    "marron",
    "marron",
    "naranja",
    "naranja",
  ];
  const coloresRandom = colores.sort(() => Math.random() - 0.5);
  coloresRandom.map((elem, index) => {
    tablero.push({
      id: index,
      color: elem,
      visible: false,
      oculto: false,
    });
    return null;
  });
  return tablero;
};

const useGameState = () => {
  const [tablero, setTablero] = useState(armaTablero());
  const app = document.querySelector("#root");
  let endGame = false;
  const finalizado = Object.values(tablero).filter(
    (elem) => elem.oculto === true
  );

  const setCuadro = (posicion) => {
    setTablero({ ...tablero }, (tablero[posicion].visible = true));
    checkeaJugada();
  };

  const checkeaJugada = () => {
    const jugadas = Object.values(tablero).filter(
      (elem) => elem.visible === true
    );
    if (jugadas.length === 2) {
      app.style.pointerEvents = "none";
      setTimeout(() => {
        jugadas[0].color === jugadas[1].color
          ? armaPareja(jugadas[0].id, jugadas[1].id)
          : resetRonda(jugadas[0].id, jugadas[1].id);
      }, 700);
    }
  };

  const armaPareja = (cuadro1, cuadro2) => {
    setTablero(
      { ...tablero },
      (tablero[cuadro1].oculto = true),
      (tablero[cuadro2].oculto = true)
    );
    resetRonda(cuadro1, cuadro2);
  };

  const resetRonda = (cuadro1, cuadro2) => {
    app.style.pointerEvents = "all";
    setTablero(
      { ...tablero },
      (tablero[cuadro1].visible = false),
      (tablero[cuadro2].visible = false)
    );
  };

  const restart = () => {
    setTablero(armaTablero());
  };

  finalizado.length === 12 && (endGame = true);

  return { tablero, setCuadro, endGame, restart };
};

const Memotest = () => {
  const { tablero, setCuadro, endGame, restart } = useGameState("");
  const condicionalClase = (nro) =>
    tablero[nro].oculto ? "oculto" : tablero[nro].visible && tablero[nro].color;

  return (
    <div className="tablero" id="tablero">
      <PantallaWin show={endGame} onRestart={restart} />
      <div className="memo-row">
        <Cuadro color={condicionalClase(0)} onClick={() => setCuadro(0)} />
        <Cuadro color={condicionalClase(1)} onClick={() => setCuadro(1)} />
        <Cuadro color={condicionalClase(2)} onClick={() => setCuadro(2)} />
        <Cuadro color={condicionalClase(3)} onClick={() => setCuadro(3)} />
      </div>
      <div className="memo-row">
        <Cuadro color={condicionalClase(4)} onClick={() => setCuadro(4)} />
        <Cuadro color={condicionalClase(5)} onClick={() => setCuadro(5)} />
        <Cuadro color={condicionalClase(6)} onClick={() => setCuadro(6)} />
        <Cuadro color={condicionalClase(7)} onClick={() => setCuadro(7)} />
      </div>
      <div className="memo-row">
        <Cuadro color={condicionalClase(8)} onClick={() => setCuadro(8)} />
        <Cuadro color={condicionalClase(9)} onClick={() => setCuadro(9)} />
        <Cuadro color={condicionalClase(10)} onClick={() => setCuadro(10)} />
        <Cuadro color={condicionalClase(11)} onClick={() => setCuadro(11)} />
      </div>
    </div>
  );
};

export default Memotest;
