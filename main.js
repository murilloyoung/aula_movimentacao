const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");
const spanPlacar = document.getElementById("placar");

let pontuacao = 0;
let frames = 0;
let jogoAtivo = true;
let velocidadeGlobal = 3;
let frequenciaCriacao = 60;

// Config personagem
let player = {
  x: 180,
  y: 430,
  tamanho: 35,
  velocidade: 6,
  cor: "blue",
};

let obstaculos = [];

// Monitor de Teclas
let teclas = {};
window.addEventListener("keydown", (e) => (teclas[e.key] = true));
window.addEventListener("keyup", (e) => (teclas[e.key] = false));

function gerenciarMovimento() {}
// Movimentação do jogador
if (teclas["ArrowLeft"] && player.x > 0) {
  player.x -= player.velocidade;
}

if (teclas["ArrowRight"] && player.x < canvas.width - player.tamanho) {
  player.x += player.velocidade;
}

if (teclas["ArrowUp"] && player.y > 0) {
  player.y -= player.velocidade;
}

if (teclas["ArrowDown"] && player.y < canvas.height - player.tamanho) {
  player.y += player.velocidade;
}

setInterval(() => {
  if (jogoAtivo) {
    velocidadeGlobal += 1;
    console.log("Aumentando velocidade base para: " + velocidadeGlobal);
  }
}, 3000);

function atualizar() {
  frames++;
  if (frames % frequenciaCriacao === 0) {
    obstaculos.push({
      x: Math.random() * (canvas.width - 25),
      y: -30,
      tamanho: 25,
      cor: "#e74c3c",
    });
  }
}

// ! Movimentaçao player
function atualizar() {
  if (teclas["ArrowUp"] || teclas["w"] || teclas["W"])
    player.y -= player.velocidade;
  if (teclas["ArrowDown"] || teclas["s"] || teclas["S"])
    player.y += player.velocidade;
  if (teclas["ArrowLeft"] || teclas["a"] || teclas["A"])
    player.x -= player.velocidade;
  if (teclas["ArrowRight"] || teclas["d"] || teclas["D"])
    player.x += player.velocidade;

  // colisão com bordas do canvas
  if (player.x < 1) player.x = 0;
  if (player.y < 1) player.y = 0;
  if (player.x + player.tamanho > canvas.width) {
    player.x = canvas.width - player.tamanho;
  }
  if (player.y + player.tamanho > canvas.height) {
    player.y = canvas.height - player.tamanho;
  }
}

// limpar tela e criar o personagem
function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.cor;
  ctx.fillRect(player.x, player.y, player.tamanho, player.tamanho);

  // desenhar coordenadas
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  const coordText = `x: ${player.x}, y: ${player.y}`;
  ctx.fillText(coordText, 10, 20);
}

// iniciar o jogo
function loop() {
  atualizar();
  desenhar();
  requestAnimationFrame(loop);
}
loop();
