const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const boton = document.getElementById("girar");
const resultado = document.getElementById("resultado");

let opciones = [];
let anguloActual = 0;

fetch("opciones.json")
  .then(res => res.json())
  .then(data => {
    opciones = data;
    dibujarRuleta();
  });

function dibujarRuleta() {
  const total = opciones.length;
  const arco = 2 * Math.PI / total;

  for (let i = 0; i < total; i++) {
    const anguloInicio = i * arco;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${i * (360 / total)}, 70%, 60%)`;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, anguloInicio, anguloInicio + arco);
    ctx.lineTo(250, 250);
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(anguloInicio + arco / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(opciones[i], 230, 10);
    ctx.restore();
  }

  // Dibujar la flecha arriba
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(240, 20);
  ctx.lineTo(260, 20);
  ctx.fillStyle = "black";
  ctx.fill();
}

function girarRuleta() {
  const gradosExtra = 720 + Math.floor(Math.random() * 360);
  const radExtra = gradosExtra * Math.PI / 180;

  anguloActual += radExtra;

  canvas.style.transition = "transform 4s ease-out";
  canvas.style.transform = `rotate(${anguloActual}rad)`;

  setTimeout(() => {
    const total = opciones.length;
    const anguloFinal = (anguloActual % (2 * Math.PI));
    const indiceGanador = Math.floor((total - (anguloFinal / (2 * Math.PI)) * total)) % total;
    resultado.textContent = `👉 ${opciones[indiceGanador]}`;
  }, 4000);
}

boton.addEventListener("click", girarRuleta);
