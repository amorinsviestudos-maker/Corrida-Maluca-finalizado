const carro1 = document.getElementById("carro1");
const carro2 = document.getElementById("carro2");

const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");
const reiniciar = document.getElementById("reiniciar");

const mensagem = document.getElementById("mensagem");
const chegada = document.querySelector(".chegada");

let position1 = 0;
let position2 = 0;
let terminou = false;
let turboEmUso = false; 
let tempoTurbo;

function acelerar(jogador, passo = 15){
    if(terminou) return;

    const limite = Math.max(0, chegada.offsetLeft - carro1.offsetWidth);
    
    if(jogador === 1){
        position1 = Math.min(position1 + passo, limite);
        carro1.style.left = `${position1}px`;

        if(position1 >= limite){
            mensagem.textContent = "🏆 Jogador 1 venceu!";
            terminou = true;
            desativarBotoes();
        }
    }

    if(jogador === 2){
        position2 = Math.min(position2 + passo, limite);
        carro2.style.left = `${position2}px`;

        if(position2 >= limite){
            mensagem.textContent = "🏆 Jogador 2 venceu!";
            terminou = true;
            desativarBotoes();
        }
    }
}
function usarTurbo(jogador) {
    if(terminou || turboEmUso) 
        
        return;

    turboEmUso = true;
    turbo1.disabled = true;
    turbo2.disabled = true;
    mensagem.textContent = `⚡ Turbo ativado pelo Jogador ${jogador}!`;

    
    acelerar(jogador, 60);

    tempoTurbo = setTimeout(() => {
        if(!terminou){
            turboEmUso = false;
            turbo1.disabled = false;
            turbo2.disabled = false;
            mensagem.textContent = "⚡ Turbo liberado!";
        }
    }, 3000);
}

function desativarBotoes() {
    turbo1.disabled = true;
    turbo2.disabled = true;
}


botao1.addEventListener("click", function() { acelerar(1, 15); });
botao2.addEventListener("click", function() { acelerar(2, 15); });
turbo1.addEventListener("click", function() { usarTurbo(1); });
turbo2.addEventListener("click", function() { usarTurbo(2); });

document.addEventListener("keydown", function(evento) {
    if(evento.repeat) return;

    const tecla = evento.key.toLowerCase();

    if(tecla === "a"){
        acelerar(1, 15);
    }
    if(tecla === "s"){
        usarTurbo(1);
    }
    if(tecla === "l"){
        acelerar(2, 15);
    }
    if(tecla === "k"){
        usarTurbo(2);
    }
});


reiniciar.addEventListener("click", function(){
    clearTimeout(tempoTurbo); 
    
    position1 = 0;
    position2 = 0;
    terminou = false;
    turboEmUso = false;

    carro1.style.left = "0px";
    carro2.style.left = "0px";

    botao1.disabled = false;
    botao2.disabled = false;
    turbo1.disabled = false;
    turbo2.disabled = false;

    mensagem.textContent = "Preparar, apontar, já!";
});