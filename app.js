const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const winningcombination = [
    [0,1,2],
    [3,4,5],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8],
    [0,3,6],
    [6,7,8]
]
const cellelements = document.querySelectorAll('[data-cell]')
const  board= document.getElementById("board")
const restartbutton = document.getElementById('restartButton')
const  winningmassageelement = document.getElementById('winning massage')
const winningmassagetextelement = document.querySelector("[data-winning-massage-text]")
let circleturn;


    startgame()

restartbutton.addEventListener('click', startgame)


function startgame(){
    circleturn = false
    cellelements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener("click",handleclick,{once:true})
    })    
    setboardhoverclass()
    winningmassageelement.classList.remove('show')
}

function handleclick(e){
    const cell = e.target
    const currentclass = circleturn ? X_CLASS : CIRCLE_CLASS
    placemark(cell,currentclass)
    if(checkwins(currentclass)){
        endgame(false)
    }
    else if(isDraw()){
        endgame(true)
    }
    else{
        swapturns()
        setboardhoverclass()        
    }
}

function endgame(draw){
    if(draw){
        winningmassagetextelement.innerHTML = 'Draw!'
    }
    else{
        winningmassagetextelement.innerHTML = `${circleturn ? "X,s":"O's"} Wins!`
    }
    winningmassageelement.classList.add('show')
}

function isDraw(){
    return [...cellelements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placemark(cell,currentclass){
    cell.classList.add(currentclass)
}

function swapturns(){
    circleturn = !circleturn
}

function setboardhoverclass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleturn){
        board.classList.add(X_CLASS)
    }
    else{
        board.classList.add(CIRCLE_CLASS)
    }
}

function checkwins(currentClass){
    return winningcombination.some(combination => {
        return combination.every(index =>{
           return cellelements[index].classList.contains(currentClass)
        })
    })
}
