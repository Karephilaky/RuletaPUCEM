const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const boton = document.getElementById("girar");
const resultado = document.getElementById("resultado");

let opciones = [];
let anguloActual = 0;
let total = 0;

fetch("opciones.json")
  .then(res => res.json())
  .then(data => {
    opciones = data;
    total = opciones.length;
    dibujarRuleta();
  });

function dibujarRuleta() {
  const arco = 2 * Math.PI / total;

  for (let i = 0; i < total; i++) {
    const inicio = i * arco;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${i * (360 / total)}, 80%, 75%)`;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, inicio, inicio + arco);
    ctx.lineTo(250, 250);
    ctx.fill();

    // Texto horizontal centrado en el segmento
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(inicio + arco / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#2c3e50";
    ctx.font = "bold 14px Quicksand";
    ctx.fillText(opciones[i], 220, 10);
    ctx.restore();
  }

  // Flecha
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(240, 30);
  ctx.lineTo(260, 30);
  ctx.fillStyle = "#2c3e50";
  ctx.fill();
}

function girarRuleta() {
  const extra = 360 * 4 + Math.random() * 360;
  const radExtra = extra * Math.PI / 180;
  anguloActual += radExtra;

  canvas.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
  canvas.style.transform = `rotate(${anguloActual}rad)`;

  setTimeout(() => {
    const anguloFinal = anguloActual % (2 * Math.PI);
    const ganador = total - Math.floor((anguloFinal / (2 * Math.PI)) * total) % total;
    resultado.textContent = `👉 ${opciones[ganador % total]}`;
  }, 4100);
}

boton.addEventListener("click", girarRuleta);
