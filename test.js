const spalte = 7;
const reihe = 6;
const feldGroesse = 100;
const board = Array(6).fill().map(() => Array(7).fill(0));                                //?
let zugFarbe = null;
let zug = 0;
let spalteDrop = null
let checkDiagonal1 = null
let winDia1 = false
let checkDiagonal2 = null
let winDia2 = false
let checkHorizontal = null
let winHor = false
let checkVertikal = null
let winVer = false
const GELB = 1
const ROT = 2
 
function mouseClicked() {  
  for (let j = 0; j < 601; j += 100) {
    if (mouseX > j && mouseX < j + 100) {
      spalteDrop = j / 100;
      zug += 1;
      for (let i = 5; i >= 0; i--) {
        if (board[i][spalteDrop] == 0) {
          if (zug % 2 == 0) {
            zugFarbe = 0;
            board[i][spalteDrop] = 1;
          }
          if (zug % 2 == 1) {
            zugFarbe = 255;
            board[i][spalteDrop] = 2;
          }
          break;         
        } 
      }
    }
  }
}

function checkWin() {
  //Check Diagonal1
  for (let j = 0; j < 4; j++) {
    for (let i = 3; i < 6; i++) {
      checkDiagonal1 = board[i][j];
      winDia1 = false;
      if (checkDiagonal1 != 0) {
        winDia1 = true;
        for (let k = 1; k < 4; k++) {
          if (board[i-k][j+k] != checkDiagonal1) {
            winDia1 = false; 
          }
        } 
        if (winDia1 == true) {
          return checkDiagonal1;
        }      
      }    
    }
  }

  //Check Diagonal2

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      checkDiagonal2 = board[i][j];
      winDia2 = false;
      if (checkDiagonal2 != 0) {
        winDia2 = true;
        for (let k = 1; k < 4; k++) {
          if (board[i+k][j+k] != checkDiagonal2) {
            winDia2 = false; 
          }
        } 
        if (winDia2 == true) {
          return checkDiagonal2;
        }      
      }    
    }
  }

  //Check Horizontal

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 6; i++) {
      checkHorizontal = board[i][j];
      winHor = false;
      if (checkHorizontal != 0) {
        winHor = true;
        for (let k = 1; k < 4; k++) {
          if (board[i][j+k] != checkHorizontal) {
            winHor = false; 
          }
        } 
        if (winHor == true) {
          return checkHorizontal;
        }      
      }    
    }
  }

  //Check Vertical

  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 3; i++) {
      checkVertikal = board[i][j];
      winVer = false;
      if (checkVertikal != 0) {
        winVer = true;
        for (let k = 1; k < 4; k++) {
          if (board[i+k][j] != checkVertikal) {
            winVer = false; 
          }
        } 
        if (winVer == true) {
          return checkVertikal;
        }      
      }    
    }
  }
  return 0;
}

function setup() {
  createCanvas(spalte * feldGroesse, feldGroesse + reihe * feldGroesse);
  frameRate(10)
}

function draw() {
  //Spielfeld
  background(0, 0, 255);
  
  for (let i = 100; i <= 600; i += 100) {
    line(i, 0, i, 700);
  }

  for (let j = 0; j < reihe; j++) {
    line(j, 0, j, 700);
    for (let i = 0; i < spalte; i++) {
      fill(255);
      if (board[j][i] == 1) {                                                    
        fill(255, 255, 0);
      } 
      else if (board[j][i] == 2) {
        fill(255, 0, 0);
      }
      ellipse(i*feldGroesse + 50, j*feldGroesse + 150, 80);
    }
  }

  //Spielstein Anzeige
  for (let i = 0; i < 601; i += 100) {

    if (mouseX > i && mouseX < i + 100) {
      fill(255, zugFarbe, 0);
      ellipse(i + 50, 50, 80);
    }
  }
  if (frameCount % 10 === 0){
    ret = checkWin()
    if (ret != 0) {
      if (ret == GELB) {
        alert("Stop! Gelb gewinnt!")
      }
      if (ret == ROT) {
        alert("Stop! Rot gewinnt!")
      }
    }
  }
}