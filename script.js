var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
let player;
let choicesIndex;
let gameOver;
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
    [2, 4, 6],
	[0, 4, 8]
	
]

const cells = document.querySelectorAll('.cell');
// startGame();

function startGame() {
    // console.log($(' label.active input').val())
    choicesIndex=[0,1,2,3,4,5,6,7,8];
    gameOver=false;
    document.getElementById("table-container").style.display = "flex";
    document.getElementById("startPage").style.display = "none";
	document.getElementById("endPage").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].classList.remove("won")
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	// turn(square.target.id, huPlayer)
    turn(square.target.id)
}

// function turn(squareId, player) {
// 	origBoard[squareId] = player;
// 	document.getElementById(squareId).innerText = player;
    
// }

function turn(squareId) {
	
    // if (player===huPlayer){
    // player=aiPlayer;
    // choicesIndex=choicesIndex.filter(item => item !== parseInt(squareId));
    // origBoard[squareId] = player;
	// document.getElementById(squareId).innerText = player;
    // }
    // else{
    player=huPlayer;
    choicesIndex=choicesIndex.filter(item => item !== parseInt(squareId));
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    document.getElementById(squareId).removeEventListener("click",turnClick, false);
    checkBoard();
    if(!gameOver){
    computersTurn();
    }

}


function computersTurn(){
    if (choicesIndex.length>0){
    const choice = choicesIndex[Math.floor(Math.random() * choicesIndex.length)]; 
    origBoard[choice] = aiPlayer;
    document.getElementById(choice).innerText = aiPlayer;
    choicesIndex=choicesIndex.filter(item => item !== choice);
    document.getElementById(choice).removeEventListener("click",turnClick, false);
    }
    checkBoard();
    
     
}

function checkBoard(){
    for (var i=0;i<8;i++){
        let comboToCheck=winCombos[i];
        let presentCombo=[];

        for (var j=0;j<3;j++){
           presentCombo.push(origBoard[comboToCheck[j]]);
     
        }
        const allEqual = arr => arr.every( v => v === arr[0] )
        if (allEqual(presentCombo)) {
            comboToCheck.forEach(function(index) {
                document.getElementById(index).classList.add("won")
            })
            gameOver=true;
            // console.log(presentCombo[0]+" Wins")
            choicesIndex.forEach(function(index) {
                document.getElementById(index).removeEventListener("click",turnClick, false);
            })
            document.getElementById("endPage").style.display = "flex";
            document.getElementById("winMessage").innerHTML=presentCombo[0]+ " Wins"
            break;
        }
        if (choicesIndex.length===0 && !gameOver){
            gameOver=true;
            document.getElementById("endPage").style.display = "flex";
            document.getElementById("winMessage").innerHTML="DRAW"
        }
    }
}