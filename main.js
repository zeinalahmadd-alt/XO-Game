let title=document.querySelector('.title');

let turn='x';

let square=[];

let gameOver=false;

let scores = { xWins: 0, oWins: 0, draws: 0 };

let titleInterval = null;

function end(num1,num2,num3){
    gameOver=true;
    if(titleInterval) clearInterval(titleInterval);
    let winnerMark = square[num1];
    title.innerHTML=`${winnerMark} winner`;
    if(winnerMark === 'x'){
        scores.xWins++;
    } else if(winnerMark === 'o'){
        scores.oWins++;
    }
    [num1,num2,num3].forEach(n=>{
        document.getElementById(`item`+n).style.background=`#adaaaa`;
    });
    titleInterval = setInterval(() => {
        title.innerHTML+=`.`; 
    },1000);
    setTimeout(()=>{
        resetGame();
    },4000);
    updateScoreboard();
}
function winner(){
    for(let i=1;i<10;i++){
        square[i]= document.getElementById(`item${i}`).innerHTML;
    }
    if(square[1] == square[2] &&square[2] == square[3] && square[1] != ''){
        end(1,2,3);
    }
    else if(square[4]==square[5] && square[5]==square[6] &&square[4] !=''){
        end(4,5,6);
    }
    else if(square[7]==square[8] && square[8]==square[9] &&square[7] !=''){
        end(7,8,9);
    }
    else if(square[1]==square[4] && square[4]==square[7] &&square[1] !=''){
        end(1,4,7);
    }
    else if(square[2]==square[5] && square[5]==square[8] &&square[2] !=''){
        end(2,5,8);
    }
    else if(square[3]==square[6] && square[6]==square[9] &&square[3] !=''){
        end(3,6,9);
    }
    else if(square[7]==square[5] && square[5]==square[3] &&square[7] !=''){
        end(7,5,3);
    }
    else if(square[1]==square[5] && square[5]==square[9] &&square[1] !=''){
        end(1,5,9);
    }
    else {
        let allFilled = true;
        for(let i=1;i<10;i++){
            if(square[i] == ''){
                allFilled = false;
                break;
            }
        }
        if(allFilled && !gameOver){
            gameOver=true;
            title.innerHTML="It's a Draw!";
            title.classList.add('draw-state');
            scores.draws++;
            updateScoreboard();
            setTimeout(()=>{
                resetGame();
            },3000);
        }
    }
}

function resetGame(){

    if(titleInterval){ clearInterval(titleInterval); titleInterval = null; }
    for(let i=1;i<10;i++){
        let el = document.getElementById(`item${i}`);
        el.innerHTML='';
        el.style.background='';
        el.classList.remove('winner-cell');
    }
    turn='x';
    gameOver=false;
    title.innerHTML='<span>X O</span> Game';
    title.classList.remove('win-state', 'draw-state');
    let gb = document.getElementById('game-board');
    if(gb) gb.classList.remove('game-over');
}
function reset(){
    location.reload();
}
function updateScoreboard(){
    let xWinsEl = document.querySelector('.x-wins');
    let oWinsEl = document.querySelector('.o-wins');
    let xLossesEl = document.querySelector('.x-losses');
    let oLossesEl = document.querySelector('.o-losses');
    let xDrawsEl = document.querySelector('.x-draws');
    let oDrawsEl = document.querySelector('.o-draws');
    if(xWinsEl) xWinsEl.textContent = scores.xWins;
    if(oWinsEl) oWinsEl.textContent = scores.oWins;
    if(xLossesEl) xLossesEl.textContent = scores.oWins;
    if(oLossesEl) oLossesEl.textContent = scores.xWins;
    if(xDrawsEl) xDrawsEl.textContent = scores.draws;
    if(oDrawsEl) oDrawsEl.textContent = scores.draws;
}

function game(id){
    if(gameOver) return;
    let element = document.getElementById(id);

    if(turn === 'x' && element.innerHTML == ''){
        element.innerHTML='x';
        turn='o';
        title.innerHTML = 'o';
    }
    if(turn === 'o' && element.innerHTML ==''){
        element.innerHTML='o';
        turn='x'
        title.innerHTML='x'
    }
    winner();
    updateScoreboard();
}