// CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");
const spanPlacar = document.getElementById("placar");

let pontuacao = 0;
let frames = 0;
let jogoAtivo = true;
let velocidadeGlobal = 3; 
let frequenciaCriacao = 30; 

let player = {
    x: 180,
    y: 430,
    tamanho: 35,
    velocidade: 60,
    cor: "#3498db"
};

let obstaculos = [];

// ENTRADA E MOVIMENTAÇÃO 
let teclas = {};
window.addEventListener("keydown", (e) => teclas[e.key] = true);
window.addEventListener("keyup", (e) => teclas[e.key] = false);

function gerenciarMovimento() {
    if (teclas["ArrowLeft"] && player.x > 0) {
        player.x -= player.velocidade;
    }
    if (teclas["ArrowRight"] && player.x + player.tamanho < canvas.width) {
        player.x += player.velocidade;
    }
    if (teclas["ArrowUp"] && player.y > 0) {
        player.y -= player.velocidade;
    }
    if (teclas["ArrowDown"] && player.y + player.tamanho < canvas.height) {
        player.y += player.velocidade;
    }
}

// LÓGICA DE DIFICULDADE
setInterval(() => {
    if (jogoAtivo) {
        velocidadeGlobal += 1;
        console.log("Aumentando velocidade base para: " + velocidadeGlobal);
    }
}, 30000);

// ATUALIZAÇÃO DOS OBJETOS (LÓGICA)
function atualizar() {
    frames++;

    if (frames % frequenciaCriacao === 0) {
        obstaculos.push({
            x: Math.random() * (canvas.width - 25),
            y: -30,
            tamanho: 25,
            cor: "#e74c3c"
        });
    }

    for (let i = 0; i < obstaculos.length; i++) {
        let obs = obstaculos[i];
        obs.y += velocidadeGlobal; 

        // Verificação de Colisão
        if (player.x < obs.x + obs.tamanho &&
            player.x + player.tamanho > obs.x &&
            player.y < obs.y + obs.tamanho &&
            player.y + player.tamanho > obs.y) {

            finalizarJogo();
        }

        // Pontuação e Limpeza
        if (obs.y > canvas.height) {
            obstaculos.splice(i, 1);
            i--;
            pontuacao++;
            spanPlacar.innerText = pontuacao;
        }
    }
}

// DESENHO (SAÍDA VISUAL)
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o Player 
    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x, player.y, player.tamanho, player.tamanho);

    // Desenha Obstáculos
    for (let obs of obstaculos) {
        ctx.fillStyle = obs.cor;
        ctx.fillRect(obs.x, obs.y, obs.tamanho, obs.tamanho);
    }
}

// INICIALIZAÇÃO
function finalizarJogo() {
    jogoAtivo = false;
    alert("Fim de Jogo! Pontuação: " + pontuacao);
    location.reload(); 
}

function loop() {
    if (jogoAtivo) {
        gerenciarMovimento();
        atualizar();
        desenhar();
        requestAnimationFrame(loop);
    }
}

loop(); 