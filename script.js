let gameSeq = [];
let userSeq = [];

let btns= ["yellow", "red", "green", "purple" ]       // these are class names given to 4 divs

let started = false;
let level = 0;

let h2= document.querySelector("h2");

document.addEventListener("keypress", function(){       //"document" here means the whole screen, "keypress"> any key
    if(started == false){
        console.log("game started");
        started= true;

        levelUp();
    }
});


function btnFlash(btn){
    btn.classList.add("flash");            //used from css it makes bgcolor white
    setTimeout(function(){
        btn.classList.remove("flash");     //removes flash after some time
    }, 200);                               //1000= 1sec, after 1 sec original colour will come back 
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText= `Level ${level}`;

    let randIdx= Math.floor(Math.random() *3);     //choose random color/index from 0 to 3
    let randColor= btns[randIdx];                  //random index i.e random class name from 4 divs
    let randBtn= document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);                        // random color added in array

    btnFlash(randBtn);
}

function btnPress(){
    let btn= this;
    btnFlash(btn);

    userColor= btn.getAttribute("id");              //erery div has an id so asses through it
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML = `Game over! Your Score was <b>${level}</b> <br> Press any key to  Start! `
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq = [];
    level = 0;
}