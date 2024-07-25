let gridContainer = document.querySelector("#gridContainer");
let footer = document.querySelector("#footer");
let changeOpac = document.querySelector('#changeOpacity');
let container = document.querySelector('#container');
let rainbowMode = document.querySelector("#random"); 

let curSize = 16;
const color = [
    "rgb(175, 7, 7)",
    "rgb(7, 176, 176)",
    "rgb(7, 176, 50)",
    "rgb(7, 134, 176)",
    "rgb(255, 87, 34)",
    "rgb(255, 193, 7)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(33, 150, 243)",
    "rgb(240, 240, 240)",
    "rgb(128, 128, 128)",
    "rgb(0, 0, 0)"
];


// create grid
function createGrid(size){
    // no border
    const cellDimension = (500) / size;
    curSize = size;

    // make row
    // add cell to row
    // add row to grid
    for (let i = 0;i < size;i++){
        const row = document.createElement("span");
        row.setAttribute("style","display:flex;  border:none;")
        for(let j = 0;j < size;j++){
            const cell = document.createElement("div");
            cell.setAttribute("style",`width:${cellDimension}px; height:${cellDimension}px; flex:1 1 0; opacity:0.7; border:none`);
            cell.setAttribute("class",'grids');
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

// remove grid container
function removeContainer(){
    container.removeChild(gridContainer)
    gridContainer = document.createElement("div");
    gridContainer.setAttribute("id","gridContainer");
    container.appendChild(gridContainer,footer);
}

//handle event listeners
function addGlobalEventListeners(type,selector,callback){
    document.addEventListener(type,e => {
        if (e.target.matches(selector)) callback(e);
    })
}

//handlers
function changeColor(event){
    // erase or draw?
    let erase = document.querySelector("#erase");
    let e = event.target;
    if (Draw){
        if (erase.textContent === 'Eraser'){
            if (rainbowMode.textContent === 'Rainbow mode'){
                e.style.backgroundColor = "rgb(175, 7, 7)";}
            else{
                const random = Math.floor(Math.random() * color.length); 
                e.style.backgroundColor = color[random];
            }
        }
        else{
            e.style.backgroundColor = "rgb(218, 213, 213)";
        }           
    }
}

function newGrid(){
    removeContainer();
    let size = parseInt(prompt("Enter Number of cells per row(must be less than 100)"));
    while (size > 100){
        size = parseInt(prompt("Enter Number of cells per row(must be less than 100)"));   
    }
    createGrid(size);
}

function clear(){
    removeContainer();
    createGrid(curSize);
}

function changeBtn(){
    if (changeOpac.textContent === 'Darken cell onclick'){
        changeOpac.textContent = 'Lighten cell onclick';
    }else{
       changeOpac.textContent = 'Darken cell onclick';
    }        
}

function changeOpacity(event){
    let e = event.target
    let styles = e.getAttribute("style").split(';');
    console.log(styles)
    opacity = parseFloat(getStyleValue(styles,'opacity'));

    if (changeOpac.textContent === 'Darken cell onclick'){
        opacity += 0.1
        if (opacity < 1){
            e.style.opacity = opacity;
        }
    }else{
        opacity -= 0.1
        if (opacity > 0){
            e.style.opacity = opacity;
        }
    }    
}

// helper for changeOpacity
function getStyleValue(styles,value){
    for (let s of styles){
        const [key,val] = s.split(':').map(kv => kv.trim());
        if (key === value) return val;
    }
}

function changeEraserDraw(event){
    let e = event.target
    if (e.textContent === 'Eraser'){
        e.textContent = 'Draw';
    }else{
        e.textContent = 'Eraser';
    }
}

function changeRainbowMode(){
    if (rainbowMode.textContent === 'Rainbow mode'){
        rainbowMode.textContent = 'Dark Red';
    }else{
        rainbowMode.textContent = 'Rainbow mode';
    }

}

let Draw = false;
createGrid(curSize);
addGlobalEventListeners("mousedown",".grids",(event) =>{
    Draw = true;
    changeColor(event);
})

addGlobalEventListeners("mousemove",".grids",(e) => changeColor(e));

addGlobalEventListeners('mouseup',".grids",()=>{
    Draw = false;
})

addGlobalEventListeners("click","#newGrid",newGrid);
addGlobalEventListeners("click","#clear",clear);
addGlobalEventListeners("click","#changeOpacity",changeBtn);
addGlobalEventListeners("click",".grids",changeOpacity);
addGlobalEventListeners("click","#erase",changeEraserDraw);
addGlobalEventListeners("click","#random",changeRainbowMode);