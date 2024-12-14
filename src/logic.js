let audioEncender = new Audio("public/onRalenti.wav");
let audioAcelerar1 = new Audio("public/gasSound.wav");
let audioAcelerar2 = new Audio("public/brakeSound2.wav");
let audioLanzada = new Audio("public/gasFirstSound.wav");

document.addEventListener("DOMContentLoaded", () => {
  [audioEncender, audioAcelerar1, audioAcelerar2, audioLanzada].forEach(
    (audio) => {
      audio.preload = "auto";
      audio.load();
    }
  );
});

const botonEncender = document.getElementById("encendido");
const botonAcelerar = document.getElementById("acelerar");
const botonLanzada = document.getElementById("lanzada");

let count = 0;
let isEncendido = false;
let isLanzada = false;
let isAcelerando = false;

function apagarTodosLosAudios() {
  [audioEncender, audioAcelerar1, audioAcelerar2, audioLanzada].forEach(
    (audio) => {
      audio.pause();
      audio.currentTime = 0;
    }
  );
}

botonEncender.addEventListener("click", () => {
  if (isEncendido) {
    apagarTodosLosAudios();
    isAcelerando = false;
    isLanzada = false;
    count = 0;

    botonEncender.classList.remove("bg-green-500");
    botonEncender.classList.add("bg-red-500");

    botonAcelerar.classList.remove("bg-orange-500");
    botonAcelerar.classList.remove("bg-blue-600");
    botonAcelerar.classList.add("bg-black");

    botonLanzada.classList.remove("bg-blue-200");
    botonLanzada.classList.add("bg-black");
  } else {
    apagarTodosLosAudios();
    audioEncender.play();

    botonEncender.classList.remove("bg-red-500");
    botonEncender.classList.add("bg-green-500");
    botonLanzada.classList.add("bg-blue-200");
  }

  isEncendido = !isEncendido;
});

botonLanzada.addEventListener("click", () => {
  if (isEncendido) {
    if (!isLanzada) {
      botonAcelerar.classList.remove("bg-black");
      botonAcelerar.classList.add("bg-blue-600");
      apagarTodosLosAudios();
      audioLanzada.play();
      count = 1;
      isAcelerando = true;
      isLanzada = true;
    }

    isLanzada = !isLanzada;
  }
});

botonAcelerar.addEventListener("click", () => {
  if (isEncendido && count === 1) {
    if (isAcelerando) {
      botonAcelerar.classList.remove("bg-blue-600");
      botonAcelerar.classList.add("bg-orange-500");
    } else {
      botonAcelerar.classList.remove("bg-orange-500");
      botonAcelerar.classList.add("bg-blue-600");
    }

    if (isAcelerando) {
      apagarTodosLosAudios();
      audioAcelerar2.play();
    } else {
      apagarTodosLosAudios();
      audioAcelerar1.play();
    }

    isAcelerando = !isAcelerando;
  }
});
