"use strict";

// canvas element 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// Player is 1 and computer is 2 
var gamebord = [
    [0, 1, 1, 1, 0],
    [2, 0, 0, 0, 0], // firstRow 
    [2, 0, 0, 0, 0], // secondRow 
    [2, 0, 0, 0, 0],  // thirdRow - 
    [0, 0, 0, 0, 0]
  ];

 
// define array value of the computer [1][z], [2][x]...
var z = 0; 
var x = 0;
var v = 0; 

// define cordinates of x and y to draw upp the playera 
var cordinates = [50, 150, 250, 350, 450];

// define array valur of the player [i][1], [j][2] ..
var i = 0;
var j = 0; 
var k = 0; 

// define the current score of each row 
var firstRowScore = 1; 
var secondRowScore = 1; 
var thirdRowScore = 1; 

// Computer starts the game, first move of the computer 
// always the same move 
gamebord[2][1] = 2;
gamebord[2][0] = 0;
x = 1;


// to print out the gamebord in the begining 
console.log(gamebord);

// calculate how much points computers got and makes decison to 
//move from the score 
function calculateMoveAi() { 
    // Score is 1 if there are two player in front of the computer
    // then the computer can't make move in that row 
    if (gamebord[1][z+1] === 1 &&  gamebord[1][z+2] === 1){
        firstRowScore = 1;
    }
    if (gamebord[2][x+1] === 1 && gamebord[2][x+2] === 1){
        secondRowScore = 1; 
    }
    if (gamebord[3][v+1] === 1 && gamebord[3][v+2] === 1 ){
        thirdRowScore = 1; 
    } 
    // if there is no player in front the score is 2 
    if (gamebord[1][z+1] === 0) { firstRowScore = 2;  }

    if (gamebord[2][x+1] === 0) {  secondRowScore = 2;  }

    if (gamebord[3][v+1] === 0) {  thirdRowScore = 2; } 

    // if there is only one player in front then the computer can make a jump
    // and then she gets 3 scores 
    if (gamebord[1][z+1] === 1 &&  gamebord[1][z+2] === 0){
        firstRowScore = 3;
    }

    if (gamebord[2][x+1] === 1 && gamebord[2][x+2] === 0){
        secondRowScore = 3; 
    }
    if (gamebord[3][v+1] === 1 && gamebord[3][v+2] === 0 ){
        thirdRowScore = 3; 
    } 
    
    moveAi();
}

// move Computer acording to the score 
function moveAi(){
        
    if (firstRowScore >= secondRowScore && firstRowScore >= thirdRowScore 
        && !(gamebord[1][4] === 2 )) {   
        if (firstRowScore === 3) {
            //computer jumps over the player in first row
            gamebord[1][z] = 0; 
            z+=2; 
            gamebord[1][z] = 2;
        }
        else {
            //computer makes one move forward in first row
            gamebord[1][z] = 0; 
            z+=1; 
            gamebord[1][z] = 2;
        }
    
    }
   
    else  if ( secondRowScore >= firstRowScore && secondRowScore >= thirdRowScore 
        && !(gamebord[2][4] === 2) ) {
        console.log("kemst ég hingað ?");
        if (secondRowScore === 3 ) {
          // computer jumps over the player in second row
            gamebord[2][x] = 0; 
            x+=2; 
            gamebord[2][x] = 2;
        }
        else {
            // computer makes one move forward in second row
            gamebord[2][x] = 0; 
            x+=1; 
            gamebord[2][x] = 2;
        }  
    
    }
  
    else if (thirdRowScore >= firstRowScore && thirdRowScore >= secondRowScore 
        && !(gamebord[3][4] === 2) ){
        if (thirdRowScore === 3) {
            // computer jumps over the player in third row
            gamebord[3][v] = 0; 
            v+=2; 
            gamebord[3][v] = 2;
        }
        else {
            // computer makes one move forward in third row
            gamebord[3][v] = 0; 
            v+=1; 
            gamebord[3][v] = 2;
        } 

    }
    
    // computer makes one move forward in first row
    else if (firstRowScore === 2  && !(gamebord[1][4] === 2 ) ){
        gamebord[1][z] = 0; 
        z+=1; 
        gamebord[1][z] = 2;
    } 
      // computer makes one move forward in second row
    else if (secondRowScore === 2 && !(gamebord[2][4] === 2 ) ){
        gamebord[2][x] = 0; 
        x+=1; 
        gamebord[2][x] = 2;
    } 
    // computer makes one move forward in third row
    else if (thirdRowScore === 2 && !(gamebord[3][4] === 2 )){
        gamebord[3][v] = 0; 
        v+=1; 
        gamebord[3][v] = 2;
    } 
    console.log("eftir að ai klárar", gamebord);
    computerWon(ctx);
    playerWon();
}

// see if player has won 
function playerWon() {
    if (gamebord[4][1] === 1 && gamebord[4][2] === 1 && gamebord[4][3] === 1){
    console.log("player won!")
    }
}

// see if Ai won 
function computerWon(ctx, x,y) {
    if (gamebord[1][4] === 2 && gamebord[2][4] === 2 && gamebord[3][4] === 2){
        
        ctx.font = "50px Comic Sans MS";
        
        ctx.textAlign = "center";
        ctx.fillText("Computer Won", 300, 200);
        console.log("Computer won!")
    }
}
 
// array to hold over all the keys
var g_keys = [];
// player input handler 
function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
    
    // Maybe do stuff here based on the new state of g_keys
    
    if (g_keys['1'.charCodeAt(0)] ) { 
        if (gamebord[i+1][1] === 2 && gamebord[i+2][1] === 2 ){  
            console.log("gett ekki hreyft kall")
        }
        else if (gamebord[i+1][1] === 2){
            gamebord[i][1] = 0; 
            i += 2; 
            gamebord [i][1] = 1;
        }
        else {
            gamebord[i][1] = 0; 
            i += 1; 
            gamebord [i][1] = 1;
        }  
        console.log("Eftir að player gerir", gamebord);
        
        calculateMoveAi();
    }

    if (g_keys['2'.charCodeAt(0)]) { 

        if (gamebord[j+1][2] === 2 && gamebord[j+2][2] === 2){  
            console.log("gett ekki hreyft kall")
        }
        else if (gamebord[j+1][2] === 2){
            gamebord[j][2] = 0; 
            j += 2; 
            gamebord [j][2] = 1;
        }
        else {
            gamebord[j][2] = 0; 
            j += 1; 
            gamebord [j][2] = 1;
        }
        
        console.log("Eftir að player gerir", gamebord);
        
        calculateMoveAi();
    }

    if (g_keys['3'.charCodeAt(0)]) { 

        if (gamebord[k+1][3] === 2 && gamebord[k+2][3] === 2){  
            console.log("gett ekki hreyft kall")
        }
        else if (gamebord[k+1][3] === 2){
            gamebord[k][3] = 0; 
            k += 2; 
            gamebord [k][3] = 1;
        }
        else {
            gamebord[k][3] = 0; 
            k += 1; 
            gamebord [k][3] = 1;
        }
        
        console.log("Eftir að player gerir", gamebord);
        
        calculateMoveAi();
    }
    
    redraw();  
}

// draw player and computer up 
function render() {
    for (var i = 0; i < gamebord.length; i++ ) {
        for(var j = 0; j < gamebord.length; j++) {
            if (gamebord[i][j] === 1){
               // ctx.fillStyle = "red";
                draw(cordinates[j],cordinates[i], "red", ctx);
            }
            if (gamebord[i][j] === 2){
                //ctx.fillStyle = "blue";
                draw(cordinates[j],cordinates[i], "blue", ctx);
            }
         
        }

    }
}
// clear the canvas 
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// draw the cirles 
function draw(x, y, colour, ctx){
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x,y,45,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    
}

// helper funciton to render and draw
function redraw() {
  	clear(); 
    render();
}

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
}

function initKeyboardHandlers() {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
}

// to draw the gameBoard in the begining of the game 
redraw();
initKeyboardHandlers();