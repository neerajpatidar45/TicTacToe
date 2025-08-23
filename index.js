const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

let currentplayer;
let gamegrid;

const winningpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let create a function to initialise the game
function initgame(){
    currentplayer = "X";
    gamegrid = ["","","","","","","","",""];
    //ui pr empty bhi krna pdega boxez ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing , initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newgamebtn.classList.remove("active");
    gameinfo.innerText = `Current Player -${currentplayer}`;  
}

initgame();

function swapturn(){
    if(currentplayer == "X"){
        currentplayer = "O";
    }
    else{
        currentplayer = "X";
    }
    //ui update
    gameinfo.innerText = `Current Player -${currentplayer}`;
}

function checkgameover(){
    let answer = "";
    winningpositions.forEach((position) => {
        if( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "" ) && (gamegrid[position[0]] === gamegrid[position[1]] ) && (gamegrid[position[1]] === gamegrid[position[2]])){

            //check if winner is X
            if(gamegrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we kwnow X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer !== ""){
        gameinfo.innerText = `Winner Player - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }
    // we know no winner found lets check whether there is Tie 
    let fillcount = 0;
    gamegrid.forEach((box) => {
        if(box !== ""){
            fillcount++;
        }
    });
    //board is filled, game is TIE
    if(fillcount == 9){
        gameinfo.innerText = "Game Tied!";
        newgamebtn.classList.add("active");
    }
}

function handleclick(index){
    if(gamegrid[index] === ""){
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        //swpe karo turn kro
        swapturn();
        //check koi jeet toh nhi gya
        checkgameover();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleclick(index);
    })
});

newgamebtn.addEventListener("click",initgame);