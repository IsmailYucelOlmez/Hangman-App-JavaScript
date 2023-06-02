var point=$("#point")
var wordSection=$("#word-section")
var letterButtons=$(".letter-button")
var canvas=document.querySelector("#drawing-inner-section")

var wordLetters;
var word="";
let context;

const words=["APPLE","BAG","TABLE","BANANA","COMPUTER","TIGER","PENCIL","PARROT","STRAWBERRY","GIRAFFE"]


window.addEventListener("load",()=>{

    showWord();
    
})

const showWord=()=>{

    var randomNum=Math.floor(Math.random()*words.length)
    word=words[randomNum]

    for(i=0;i<word.length;i++){

        let wordLetterDiv=`<div class="guess-word-letter"><p class="guess-letter hide">${word[i]}</p></div>`
        wordSection.append(wordLetterDiv)

    }
    
    wordLetters=$(".guess-letter")

}

let falseCounter=0;
const showLetter=(element)=>{
    
    buttonText=element.textContent
    let guessState=false;
    
    for(letter of wordLetters){

        if(letter.textContent==buttonText){
         
            letter.classList.remove("hide");
            element.style.opacity="0.3"
            guessState=true;
     
        }
               
    }

    if(guessState==false){
        falseCounter++;
        drawMan(falseCounter);
        if(falseCounter==6){
            lose();
        }
    }

    win();
    

}

const win=()=>{

    let sayac=0;

    for(letter of wordLetters){

        if(!(letter.classList.contains("hide"))){

            sayac++;
        }
    }

    if(wordLetters.length==sayac){

        newGame()
        intpoint=Number(point.text())
        intpoint+=10;
        point.text(intpoint);
        showWord()

    }
}

const lose=()=>{
   
    newGame()
    intpoint=Number(point.text())
    intpoint-=10;
    point.text(intpoint);
    showWord()
 
}

const canvasCreator = () => {

    context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
  
    const drawLine = (fromX, fromY, toX, toY) => {

        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };
  
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };
  
    const body = () => {
        drawLine(70, 40, 70, 80);
    };
  
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };
  
    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };
  
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };
  
    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };
  
    return { head, body, leftArm, rightArm, leftLeg, rightLeg };
};



const drawMan=(count)=>{

    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
};

const newGame=()=>{

    $(".guess-word-letter").remove();
    for(element of letterButtons){
        element.style.opacity="1";
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    falseCounter=0;

}