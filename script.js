const mainGrid = document.querySelector('div.grid');
const slider = document.querySelector('input#sizer');
const sliderText = document.querySelector('p.slideVal');
const colorButton = document.getElementById('colorMode');
const eraserButton = document.getElementById('eraserMode');
const rainbowButton = document.getElementById('rainbowMode');
const clearButton = document.getElementById('clearButton');
const defaultButton = document.getElementById('defaultButton');
const colorPicker = document.getElementById('colorPicker');




let mode = 'default'; 
const rainbowList = makeColorGradient(.3,.3,.3,0,2,4, 180,75);
let rainbowPosition = 0;


function initializeGrid() {
    let gridSize = slider.value
    clearGrid();
    PopulateGrid(gridSize);
    resizeGridBlocks(gridSize);
    
}

function PopulateGrid(gridSize) {

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const gridBlock = document.createElement('div');
            gridBlock.classList.add('gridBlock')
            gridBlock.addEventListener('mouseover', Hover);
            mainGrid.appendChild(gridBlock);
        }
    }
}

function clearGrid() {
    mainGrid.innerHTML = '';
}

function updateP()
{
    sliderText.innerHTML = `${slider.value} x ${slider.value}`
}


function resizeGridBlocks(gridSize) {
    document.querySelectorAll('.gridBlock').forEach(element => {
        element.style.width = `${500 / gridSize}` + 'px';
        element.style.height = `${500 / gridSize}` + 'px';
    })
};

function resetGridBlocks()
{
    document.querySelectorAll('.gridBlock').forEach(element => {
        element.style.backgroundColor = '';
    })
}


function Hover(e) {
    if (mode=='default')
    e.target.style.backgroundColor = 'pink';
    if (mode=='eraser')
    e.target.style.backgroundColor = '';
    if (mode=='color')
    e.target.style.backgroundColor = colorPicker.value;
    if (mode=='rainbow')
    e.target.style.backgroundColor = rainbowList[rainbowPosition]
    if (rainbowPosition == rainbowList.length-1)
    rainbowPosition = 0;
    else rainbowPosition++;
    
}


 function RGB2Color(r,g,b)
{
  return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function makeColorGradient(frequency1, frequency2, frequency3,
    phase1, phase2, phase3,
    center, width, len) {
    let rainbowList = [];
    if (center == undefined) center = 128;
    if (width == undefined) width = 127;
    if (len == undefined) len = 50;

    for (var i = 0; i < len; ++i) {
        var red = Math.sin(frequency1 * i + phase1) * width + center;
        var grn = Math.sin(frequency2 * i + phase2) * width + center;
        var blu = Math.sin(frequency3 * i + phase3) * width + center;
        rainbowList.push(RGB2Color(red,grn,blu));
    }
    return rainbowList

}

clearButton.addEventListener('click', resetGridBlocks);
defaultButton.addEventListener('click', () => {mode='default'});
colorButton.addEventListener('click', () => {mode='color'});
rainbowButton.addEventListener('click', () => {mode='rainbow'});
eraserButton.addEventListener('click', () => {mode='eraser'});
slider.addEventListener('mouseup', initializeGrid);
colorPicker.addEventListener('change', () => {pickedColor = colorPicker.value});
slider.addEventListener('input', updateP)

initializeGrid();