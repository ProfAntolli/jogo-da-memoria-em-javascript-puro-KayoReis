const cards= document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false
let btn = document.querySelector('#button')
let win = document.querySelector('.bottom')
let points = 0
function flipcard(){
    
    this.classList.add('flip');
    if (lockBoard) return
    if(this=== firstCard) return
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch()
}

function checkForMatch(){

    if(firstCard.dataset.framework === secondCard.dataset.framework){
        disableCard();
        points++
        console.log(points)
        if(points==6){
            win.style.display = 'block'
        }
        return
    }

    unflipCards()
}

function disableCard(){
    firstCard.removeEventListener('click',flipcard)
    secondCard.removeEventListener('click',flipcard)
    resetBoard()
}

function unflipCards(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 550)
}

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false]
    [firstCard,secondCard] = [null,null]

}

(function shuffle(){
    cards.forEach(card => {
        let ramdomPos= Math.floor(Math.random()*12)
        card.style.order = ramdomPos
    })
})()

function reset(){
    win.style.display = 'none'
    points = 0

    cards.forEach(card => {
        let ramdomPos= Math.floor(Math.random()*12)
        card.style.order = ramdomPos
        card.classList.remove('flip')
        resetBoard()
        card.addEventListener('click',flipcard)
       

    })
    
   
}

cards.forEach(card => card.addEventListener('click',flipcard));

