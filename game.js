const CHOICES = [
    {
        name:"rock",
        beats:"scissors"
    },
    {
        name:"scissors",
        beats:"paper"
    },
    {
        name:"paper",
        beats:"rock"
    }
]

const choiceButtons = document.querySelectorAll('.choice-btn')
const playDiv = document.querySelector('.play')
const resultDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results-result')

const winnerResult=document.querySelector('.winner-result')
const resultText=document.querySelector('.winner-text')

const playAgainBtn = document.querySelector('.play-again')


const scoreNumberComputer=document.querySelector('.score-number-computer')
const scoreNumberUser=document.querySelector('.score-number-user')

let scoreComputer = 0;
let scoreUser=0;
 
const nextButton = document.querySelector('.next-btn')
const winCup=document.querySelector('.cup')

const playAgainBtn2 = document.querySelector('.play-again-cup')
//logic 
scoreNumberComputer.innerText = parseInt(localStorage.getItem("value"))
scoreNumberUser.innerText = parseInt(localStorage.getItem("value"))

choiceButtons.forEach( button =>{
    button.addEventListener('click', ()=>{
        
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName )
        choose(choice)
    })
})

function choose(choice){
    
    const pcchoice = pcchoose() 
    displayResults([choice,pcchoice])
    displayWinner([choice,pcchoice])

}

function pcchoose(){
    const rand = Math.floor(Math.random()* CHOICES.length)
    return CHOICES[rand];
    
}

function displayResults(results){
    resultDivs.forEach((resultDiv , index)=>{
        setTimeout(()=>{
            resultDiv.innerHTML=`
            <div class="choice ${results[index].name}" >
            <img src='${results[index].name}.png' alt='${results[index].name}' />
            </div>
        `
        },index * 500)
    });
    playDiv.classList.toggle('hidden')
    resultDiv.classList.toggle('hidden')
}

function displayWinner(results){
    
    setTimeout(()=>{
        const userWins=isWinner(results)
        const pcWins=isWinner(results.reverse())
        if(userWins){
            resultText.innerHTML= "<h1>YOU WIN</h1><h4>against PC<h4> " 
            resultDivs[0].classList.toggle('winners');
            keepScoreUser(1)
            localStorage.setItem('value', scoreUser );
            scoreNumberUser.innerText = parseInt(localStorage.getItem("value"))
            
            nextButton.classList.toggle('display')
         
        }else if(pcWins){
            resultText.innerHTML= "<h1>YOU LOST</h1><h3>against PC<h3>"
            resultDivs[1].classList.toggle('winners');
            keepScoreComputer(1)
            localStorage.setItem('value', scoreComputer );
            scoreNumberComputer.innerText = parseInt(localStorage.getItem("value"))
        }else {
            resultText.innerHTML= "<h1>Tie Up</h1>"
        }
        winnerResult.classList.toggle('hidden')
        
        resultDiv.classList.toggle('show-winner')
        
    },1000);

        
}

function isWinner(results){
    return results[0].beats == results[1].name;
}
//play again
playAgainBtn.addEventListener('click', () =>{
    playDiv.classList.toggle('hidden')
    resultDiv.classList.toggle('hidden')

    resultDivs.forEach(resultDiv =>{
        resultDiv.innerHTML=""
        resultDiv.classList.remove('winner')
    })
    resultText.innerText="";
    winnerResult.classList.toggle('hidden')
    resultDiv.classList.remove('show-winner')
    
})

function keepScoreComputer(pointPC){
    return scoreComputer += pointPC
}
function keepScoreUser(pointUser){
    return scoreUser += pointUser
}

nextButton.addEventListener('click',() =>{ 

    resultDiv.classList.toggle('hidden')
    winCup.classList.toggle('hidden')
    document.querySelector('.header').style.display = "none"
    nextButton.classList.toggle('display')
})

playAgainBtn2.addEventListener('click', () =>{
    document.querySelector('.header').style.display ="flex"
    playDiv.classList.toggle('hidden')
    /*resultDiv.classList.toggle('hidden')

    //resultDivs.forEach(resultDiv =>{
        //resultDiv.innerHTML=""
        //resultDiv.classList.remove('winner')
    //})
    //resultText.innerText="";*/
    winnerResult.classList.toggle('hidden')
    resultDiv.classList.remove('show-winner')
    winCup.classList.toggle('hidden')
})

const btnRules = document.querySelector('.rules-btn')
const btnClose = document.querySelector('.close-btn')
const modalRules = document.querySelector('.modal')

btnRules.addEventListener('click',() =>{
    modalRules.classList.toggle('show-modal')
})
btnClose.addEventListener('click',() =>{
    modalRules.classList.toggle('show-modal')
})
