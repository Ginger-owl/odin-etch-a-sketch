// Root element to manipulate the page
const baseStyle = getComputedStyle(document.body)
let defaultAreaPaint = baseStyle.getPropertyValue('--num-block')
// to detect randomness
let isRandomColor = false;
let isColorChosen = false;
let chosenColor = ""

// collect needed DOM Elements
// Buttons
const resizeBtn = document.querySelector('#resize-btn');
const cleanBtn = document.querySelector('#clean-btn');
const randomBtn = document.querySelector('#random-btn');
const pickColorBtn = document.querySelector('#pickColor-btn')

// Input
const areaSizeInput = document.querySelector('#paint-area');
const pickedColor = document.querySelector('#pickedColor')

// info menu
const infoMenu = document.querySelector('.dropdown-content')

// Painting area
const mainArea = document.querySelector('#main-area');

// base for the paint element
const createElem = (row, col) => document.createElement('div')

// function to create a paint Area
const fillArea = (num) => { 
    document.documentElement.style.setProperty('--num-block', num);

    // remove previously added elems
    mainArea.innerHTML = ""; 
    
    // create blocks
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let elem = document.createElement('div');
            elem.setAttribute('class', 'block');
            elem.setAttribute('id', `block_${i}_${j}`);

            mainArea.appendChild(elem);
        }
    }
}
// Event listeners to the input and buttons
resizeBtn.addEventListener('click', () => {
    areaSize = areaSizeInput.value;
    if (areaSize > 100) {
        areaSize = 100;
        areaSizeInput.value = 100
    }
    fillArea(areaSize)
});

cleanBtn.addEventListener('click', () => {
    const divs = mainArea.querySelectorAll('.block')
    const divsArr = Array.from(divs)
    divsArr.forEach((item) => {item.style['background-color'] = 'white'}) 
});

randomBtn.addEventListener('click', () => {
    if (isRandomColor) {isRandomColor = false;}
    else {isRandomColor = true;}
    randomBtn.style['border-color'] = 'black';
})

pickColorBtn.addEventListener('click', () => {
    if (isColorChosen) {
        isColorChosen = false;
        pickColorBtn.textContent = 'Pick Color'
    } else {
        isColorChosen = true;
        chosenColor = pickedColor.value;
        pickedColor.style['background-color'] = chosenColor;
        pickColorBtn.textContent = 'Back to black'
    }


})

// Painting function
mainArea.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('block')) {
        if (e.shiftKey) {
            e.target.style['background-color'] = 'white'
        } else if (e.ctrlKey) {
            e.target.style['background-color'] = 'pink';
        } else if (e.altKey) {
            //pass
        } else {
            if (isRandomColor) {
                let color = randomColor({'luminosity': 'light', 'format': 'rgba'});
                e.target.style['background-color'] = color;
                randomBtn.style['border-color'] = color;
            } else if  (isColorChosen) {
                e.target.style['background-color'] = chosenColor;
            } else {
                e.target.style['background-color'] = 'black';
            }   
        }
    }
})


window.onload = (e) => {
    console.log("page loaded!")
    fillArea(defaultAreaPaint);
    infoMenu.style.visibility = 'visible'; 
    setTimeout(() => {infoMenu.style.removeProperty('visibility'); }, 3000)};

