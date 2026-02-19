const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");

// Config personagem
let player = {
  x: 360,
  y: 0,
  tamanho: 40,
  velocidade: 5,
  cor: "blue",
};

// Monitor de Teclas
let teclas = {};
window.addEventListener("keydown", (e) => (teclas[e.key] = true));
window.addEventListener("keyup", (e) => (teclas[e.key] = false));

function atualizar() {
  // Movimentaçao eixo y
  if (teclas["ArrowUp"]) player.y -= player.velocidade;
  if (teclas["ArrowDown"]) player.y += player.velocidade;
  // Movimentaçao eixo x
  if (teclas["ArrowLeft"]) player.x -= player.velocidade;
  if (teclas["ArrowRight"]) player.x += player.velocidade;

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
