const screen = document.querySelector('.screen');
const addBtn = document.querySelector('.add-a-figure');
const figure = screen.querySelector('.figure');
const addCls = document.querySelector('.add-a-class');
const refFigureCounter = document.querySelector('.current_shapes--number');
const cautedFigureNumber = document.querySelector('.catted_shapes--number');
const amountOfFiguresIndicator = document.querySelector('.amount');
const increaseSpeedofCreation = document.querySelector('.shapes_amount--increase');
const decreaseSpeedofCreation = document.querySelector('.shapes_amount--decrease');
const speedScreen = document.querySelector('.speed');
const increaseSpeedOfAnimation = document.querySelector('.gravity_value--increase');
const decreaseSpeedOfAnimation = document.querySelector('.gravity_value--decrease');



let figureCounter = 0;
 refFigureCounter.textContent = figureCounter;
let speedCreation = 1000;
let timerId = null;
let speedOfAnimation = 4000;
amountOfFiguresIndicator.textContent = speedCreation/1000;
speedScreen.textContent = speedOfAnimation/1000;
const speedOfClassChange = 50;
const shapeSize = { w: 100, h: 100 };
let figureCauted = 0;
cautedFigureNumber.textContent = figureCauted; 


function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
        .padStart(6, 0)}`};
   
function addAnActiveClass() {
    screen.firstElementChild.classList.add('active'),
    screen.firstElementChild.style.transition = `${speedOfAnimation}ms`;
    
    
}
 
function removeFigure() {
    screen.lastElementChild.remove()
}

function stopCreation() {
    clearInterval(timerId)
}
    

function startCreation() {
    clearInterval(timerId),
    timerId = setInterval(createFigure, speedCreation);
}





function createFigure() {
    const displayWidth = screen.offsetWidth
    const randomColor = getRandomHexColor();
    const randomNumber = getRandomNum(0, (displayWidth - 100));
     setTimeout(figureCounter += 1, speedCreation);
    refFigureCounter.textContent = figureCounter;
    

    const figureHtml =
    `<div class="figure" style="background-color: ${randomColor}; height: ${shapeSize.h}px;  width: ${shapeSize.w}px; left: ${randomNumber}px;"></div>`;
    //  `<div class="figure" style="background-color: ${randomColor}; height: ${shapeSize.h}px;  width: ${shapeSize.w}px; left: ${randomNumber}px;"></div>`;
    screen.insertAdjacentHTML('afterbegin', figureHtml);
    setTimeout(addAnActiveClass, 50);
    setTimeout(removeFigure, (speedCreation + speedOfAnimation));   
};
    


addBtn.addEventListener('click', startCreation);
addCls.addEventListener('click', stopCreation);



increaseSpeedofCreation.addEventListener('click', () => {
    if (speedCreation > 500) {
        stopCreation(),
            speedCreation -= 500,
            amountOfFiguresIndicator.textContent = speedCreation/1000;
            startCreation()
            
    }
});

decreaseSpeedofCreation.addEventListener('click', () => {
    if (speedCreation < 3000) {
    stopCreation(),
        speedCreation += 500,
        amountOfFiguresIndicator.textContent = speedCreation/1000;
    startCreation()
    }
}
   
)

increaseSpeedOfAnimation.addEventListener('click', () => {
    if (speedOfAnimation > 1000){
    stopCreation(),
        speedOfAnimation -= 500,
        speedScreen.textContent = speedOfAnimation/1000,
            startCreation()
    }
    
})

decreaseSpeedOfAnimation.addEventListener('click', () => {
    if (speedOfAnimation < 5000) {
    stopCreation(),
        speedOfAnimation += 500,
        speedScreen.textContent = speedOfAnimation/1000,
        startCreation()
    }
    
})

function createFigureFromClick(e) {

    console.log(e.target === e.currentTarget)

    if (e.target === e.currentTarget) {
        const displayWidth = screen.offsetWidth;
        const cordinates = { x: e.offsetX, y: e.offsetY };
        console.dir(e.target);
        const randomColor = getRandomHexColor();
        const randomNumber = getRandomNum(0, displayWidth - 50);

        setTimeout(figureCounter += 1, speedCreation);
        refFigureCounter.textContent = figureCounter;
    
        const figureHtml =
            `<div class="figure" style="background-color: ${randomColor}; height: ${shapeSize.h}px;  width: ${shapeSize.w}px; left: ${cordinates.x}px; top: ${cordinates.y}px;"></div>`;
        screen.insertAdjacentHTML('afterbegin', figureHtml);
        setTimeout(addAnActiveClass, speedOfClassChange);
        setTimeout(removeFigure, (speedCreation + speedOfAnimation));
    }

   else {
        
        e.target.classList.add("boom");
        figureCauted += 1;
        cautedFigureNumber.textContent = figureCauted;
    }
    }


screen.addEventListener('click', createFigureFromClick);





startCreation();