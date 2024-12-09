const botonEncender = document.getElementById("encendido");
const botonAcelerar = document.getElementById("acelerar");
const botonLanzada = document.getElementById("lanzada");

let audioEncender;
let audioAcelerar1;
let audioAcelerar2;
let audioLanzada;
let count = 0;

let isEncendido = false;
let isLanzada = false;
let isAcelerando = false;

// Apagar todos los audios
function apagarTodosLosAudios() {
  if (audioEncender) {
    audioEncender.pause();
    audioEncender.currentTime = 0;
  }
  if (audioAcelerar1) {
    audioAcelerar1.pause();
    audioAcelerar1.currentTime = 0;
  }
  if (audioAcelerar2) {
    audioAcelerar2.pause();
    audioAcelerar2.currentTime = 0;
  }
  if (audioLanzada) {
    audioLanzada.pause();
    audioLanzada.currentTime = 0;
  }
}

botonEncender.addEventListener("click", () => {
  if (!audioEncender) {
    audioEncender = new Audio("public/onRalenti.wav");
    audioEncender.loop = true;
  }

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
    if (!audioLanzada) {
      audioLanzada = new Audio("public/gasFirstSound.wav");
    }

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
  if (isEncendido && count == 1) {
    if (!audioAcelerar1) {
      audioAcelerar1 = new Audio("public/gasSound.wav");
    }
    if (!audioAcelerar2) {
      audioAcelerar2 = new Audio("public/brakeSound.wav");
    }

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
