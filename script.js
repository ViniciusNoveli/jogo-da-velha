//não deveria estar usando tanta variavel global mas acontece 
let jogador = 'X';
let jogadorDaVez = document.getElementById("jogador");
let terminou = false;
let velha = false;
let rodada = 0; //contador de rodadas
let pilhaJogadas = []; //armazena qual foi o ultimo botão clicado


//verifica qual botao está sendo clicado e manda para uma função, o indice do botao 
let buttons = document.querySelectorAll(".btn1");
buttons.forEach((btn,index) =>{
    btn.addEventListener("click", e =>{
        desenha(index);
        clicado(index);
    });
});

//Tabuleiro do jogo
let tabuleiro = [[0,0,0],
                 [0,0,0],
                 [0,0,0]];

//quando clicado, o botão que representa a posição do tabuleiro, preenche o tabuleiro e a pilha armazena 
//qual 
function clicado(index){
    let contador = 0;
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(index == contador && tabuleiro[i][j] === 0){
                tabuleiro[i][j] = `${jogador}`;
                pilhaJogadas.push(index);
                jogo();
                vez();
            }
            contador++;
        }
    }
    console.log(tabuleiro);
}

//muda a vez do jogador
function vez(){
    if(jogador === "X"){
        jogador = "O";
        jogadorDaVez.innerHTML = "O jogador da vez é o O";
    }else{
        jogadorDaVez.innerHTML = "O jogador da vez é o X";
        jogador = "X";
    }
}

//lógica do jogo
function jogo(){

        if(tabuleiro[0][0] == `${jogador}` && tabuleiro[0][1] == `${jogador}` && tabuleiro[0][2] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[1][0] == `${jogador}` && tabuleiro[1][1] == `${jogador}` && tabuleiro[1][2] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[2][0] == `${jogador}` && tabuleiro[2][1] == `${jogador}` && tabuleiro[2][2] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[0][0] == `${jogador}` && tabuleiro[1][0] == `${jogador}` && tabuleiro[2][0] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[0][1] == `${jogador}` && tabuleiro[1][1] == `${jogador}` && tabuleiro[2][1] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[0][2] == `${jogador}` && tabuleiro[1][2] == `${jogador}` && tabuleiro[2][2] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[0][0] == `${jogador}` && tabuleiro[1][1] == `${jogador}` && tabuleiro[2][2] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }else if(tabuleiro[0][2] == `${jogador}` && tabuleiro[1][1] == `${jogador}` && tabuleiro[2][0] == `${jogador}`){
            desenhaVencedor(jogador,velha);
            terminou = true;
            return;
        }
   
    //se for a ultima rodada e ninguem tiver vencido é velha
    if(rodada === 8){
        terminou = true;
        velha = true;
        console.log("VELHA");
        desenhaVencedor(jogador,velha);
    }
        
    rodada++;
}

//desenha na tela X ou O 
function desenha(index){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(tabuleiro[i][j] === 0){
                buttons[index].innerHTML = `${jogador}`;            
            }
        }
    }
}

//arrumar essa função
function desenhaVencedor(jogador,velha,volta=false){
    const result = document.getElementById('resultado');
    let escreve = document.createElement('h1');

    if(velha){
        escreve.innerHTML = "Velha!!";
    }else{
        escreve.innerHTML = `${jogador} venceu!`;
    }

    if(volta === true){
        let child = result.firstChild;
        result.removeChild(child);
        return;
    }

    result.appendChild(escreve);
}


/*
    O indice do botão que foi pressionado no HTML é adicionado a essa lista chamada pilhaJogadas.
    A idéia é utilizar realmente como uma pilha ou seja, a ultima jogada estará no topo e será a primeira 
    a ser retirada quando o botão voltar jogadas for pressionado. Após isso ele adiciona 0 a posição referente
    ao botão no tabuleiro, e limpa o texto do botão no html. Chama a função vez, que muda a vez do jogador, pois
    ao jogar sua vez muda, porem ao voltar, preciso mudar a vez do jogador novamente para o jogador antigo, e é 
    decrementado uma rodada do contador de rodadas
*/
function voltaJogada(){
    if(pilhaJogadas.length === 0 ){ //não tem nenhuma jogada pra voltar
        console.log("Nenhuma jogada para voltar!!");
        return;
    }

    let ultimaJogada = pilhaJogadas.pop(); //retira a ultima jogada da pilha
    buttons[ultimaJogada].innerHTML = "";

    vez(); //muda a vez

    if(terminou === true){
        desenhaVencedor("",velha,true); //remove a mensagem de vencedor
    }

    if(ultimaJogada === 0){
        tabuleiro[0][0] = 0;
    }else if(ultimaJogada === 1){
        tabuleiro[0][1] = 0;
    }else if(ultimaJogada === 2){
        tabuleiro[0][2] = 0;
    }else if(ultimaJogada === 3){
        tabuleiro[1][0] = 0;
    }else if(ultimaJogada === 4){
        tabuleiro[1][1] = 0;
    }else if(ultimaJogada === 5){
        tabuleiro[1][2] = 0;
    }else if(ultimaJogada === 6){
        tabuleiro[2][0] = 0;
    }else if(ultimaJogada === 7){
        tabuleiro[2][1] = 0;
    }else if(ultimaJogada === 8){
        tabuleiro[2][2] = 0;
    }

    rodada--; //decrementa rodada
    terminou = false;
}

function jogarPc(cb){
    if(cb.checked){
        
    }else{
       
    }
}
