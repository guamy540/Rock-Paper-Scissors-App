/*TODO: implement hover feature, so icons glow white when hovered over
        make it so user can't click on a hand icon once 'let's play' begins? then player can't change their mind
            currently treating reselection during countdown as a feature, not a bug >.>*/

const gameText = document.querySelector(".gameText");
const choices = document.querySelectorAll(".choice");
const pinkButton = document.querySelector(".pinkButton")
const scoreText = document.querySelector('.score')
let playerChoice = '';
let computerChoice;
let winsNum = 0;
let totalGames = 0;

scoreText.innerText = `You've won ${winsNum} out of ${totalGames} games`

gameText.innerText = `Let's play rock, paper, scissors!`;
pinkButton.innerText = `Let's go!`;


/******These functions are for selecting your choice by clicking the hand icon ******/

//event listener for the hands(choices)
choices.forEach(pickChoice => {
    pickChoice.addEventListener("click", getUserChoice)
})

//function for having the user pick rock, paper, or scissors and then fill that color
function getUserChoice(){
    choices.forEach((choice, index, arr) => {
        resetColors();
     choice.addEventListener('click', (element) => {
        playerChoice = arr[index].id;
        gameText.innerText = `You picked ${playerChoice}.`;
        element.target.style.color = '#FE00B7';
        })   
    })
}

function resetColors(){
    document.getElementById("scissorsIcon").style.color = "#fbfcff9d"
    document.getElementById("rockIcon").style.color = "#fbfcff9d"
    document.getElementById("paperIcon").style.color = "#fbfcff9d"
    document.getElementById("scissorsIcon").classList.remove("linearGradientIcon")
    document.getElementById("rockIcon").classList.remove("linearGradientIcon")
    document.getElementById("paperIcon").classList.remove("linearGradientIcon")
}


/****These functions handle the pink button/game play once a user has made a choice *****/
pinkButton.addEventListener("click", pressPinkButton);

//these are the functions that are called when the .pinkButton is pressed//
function pressPinkButton(){
    resetColors();
    checkIfRandomPlayerChoice();
    document.getElementById(playerChoice + 'Icon').style.color = "#FE00B7";
    pinkButton.disabled = true;
    function enableButton(){
        pinkButton.innerText = 'Play again'
        pinkButton.disabled = false;
        totalGames++;
        scoreText.innerText = `${winsNum} out of ${totalGames}`
    }
    function winnerMessage(){
        whoWins(playerChoice, computerChoice)
    }
    displayRockPaperScissorsMessage(); //has a 1000 and 2000 setTimout function
    setTimeout(getComputerChoice, 3000);
    setTimeout(winnerMessage, 3000);
    setTimeout(enableButton, 3000);
}


//function to randomly choose for the computer
function getComputerChoice(){
    let cpu_choice = Math.floor(Math.random() * 3);
    if (Number(cpu_choice) === 0){
        computerChoice = 'rock'
        if(playerChoice == computerChoice){
            console.log('test a tie')
            document.getElementById("rockIcon").classList.add("linearGradientIcon")
        }else{
        document.getElementById("rockIcon").style.color = "#D2FFAF";
        }
    } else if(Number(cpu_choice) === 1) {
        computerChoice = 'paper'
        if(playerChoice == computerChoice){
            console.log('test a tie')
            document.getElementById("paperIcon").classList.add("linearGradientIcon")
        }else{
            document.getElementById("paperIcon").style.color = "#D2FFAF";
        }
    } else {
        computerChoice = 'scissors'
        if(playerChoice == computerChoice){
            console.log('test a tie')
            document.getElementById("scissorsIcon").classList.add("linearGradientIcon")
        }else{
            document.getElementById("scissorsIcon").style.color = "#D2FFAF";
        }
    }
}

//this function selects a choice for the player if no choice has previously been selected
function checkIfRandomPlayerChoice(){
    if (playerChoice == ''){
        let random_choice = Math.floor(Math.random() * 3);
        if (Number(random_choice) === 0){
            document.getElementById("rockIcon").style.color = "#FE00B7";
            playerChoice = 'rock'
        } else if(Number(random_choice) === 1) {
            document.getElementById("paperIcon").style.color = "#FE00B7";
            playerChoice = 'paper'
        } else {
            document.getElementById("scissorsIcon").style.color = "#FE00B7";
            playerChoice = 'scissors'
        }
    }
}




function displayRockPaperScissorsMessage(){
    function secondText(){
        gameText.innerText = 'Rock... Paper...'
    }
    function thirdText(){
        gameText.innerText = 'Rock... Paper... Scissors!'
    }
    gameText.innerText = 'Rock...'
    setTimeout(secondText, 1000)
    setTimeout(thirdText, 2000)
}


//function to determine winner
function whoWins(userInput, computerChoice){
    if (userInput === computerChoice){ //tiegame
        gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. It's a draw!`
    }

    if (userInput === 'rock'){
        if(computerChoice ==='scissors'){
            gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. You win!`
            winsNum++;
        }
        if (computerChoice === 'paper'){
            gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. You lose!`
        }
    }
 
    if (userInput === 'scissors'){
        if(computerChoice ==='paper'){
            gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. You win!`
            winsNum++;
        }
        if (computerChoice === 'rock'){
            gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. You lose!`
        }
    }

    
    if (userInput === 'paper'){
        if(computerChoice ==='rock'){
            gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. You win!`
            winsNum++;
        }
        if (computerChoice === 'scissors'){
            gameText.innerText = `You chose ${userInput}. The computer chose ${computerChoice}. You lose!`
        }
    }
}
