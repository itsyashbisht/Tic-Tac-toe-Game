let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let newbtn = document.querySelector(".newgame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true ;  //playerX, playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    for(box of boxes){
        box.innerText = ""
        enableBoxes();
        msgcontainer.classList.add("hide"); 
    }
};
resetbtn.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
     if(turnO) {  //playerO turn
        box.style.color = "white"
        box.innerText = "O" ;
        turnO = false ;
     } else {   // playerX turn
        box.innerText = "X" ;
        turnO = true ;
     }
     box.disabled = true ; // now button cannot changed after one change.
     
     checkwinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations,Winner is player ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkwinner = () =>{
    for(let pattern of winPatterns) {   
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    
    if(pos1Val !="" && pos2Val !="" && pos3Val !="" ) {
        if(pos1Val === pos2Val && pos2Val=== pos3Val) {
            console.log("Winner is player",pos1Val);
            showWinner(pos1Val);
            return;   // stops checking further for winners by return statement.
        }
      }
    }
    draw();
};

const draw =() => {
    let count = 0 ;
 boxes.forEach((box) =>{
    if(box.innerText!==""){
        count++;
    }
});
 if (count === 9) {
    console.log("Game was a DRAW!");
    msg.innerText = " Game was a DRAW! " ;
    msgcontainer.classList.remove("hide");
    disableBoxes();
 }
};
