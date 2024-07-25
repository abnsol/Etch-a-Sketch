let gridContainer = document.querySelector("#gridContainer");
let footer = document.querySelector("#footer");
let btnId = document.querySelector('#changeOpacity');
let curSize = 16;
const color = ["rgb(175, 7, 7)","rgb(7, 176, 176)",'rgb(7, 176, 50)','rgb(7, 134, 176)']

// create grid
function createGrid(size){
    const cellDimension = (500 - (size * 2)) / size;
    curSize = size;

    // make row
    // add cell to row
    // add row to grid
    for (let i = 0;i < size;i++){
        const row = document.createElement("span");
        row.setAttribute("style","display:flex; flex:1 1 0;")
        for(let j = 0;j < size;j++){
            const cell = document.createElement("div");
            cell.setAttribute("style",`width:${cellDimension}px; height:${cellDimension}px; flex:1 1 0; opacity:0.7;`);
            cell.setAttribute("class",'grids');
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

// remove grid container
function removeContainer(){
    document.body.removeChild(gridContainer)
    gridContainer = document.createElement("div");
    gridContainer.setAttribute("id","gridContainer");
    document.body.insertBefore(gridContainer,footer);
}

//handle event listeners
function addGlobalEventListeners(type,selector,callback){
    document.addEventListener(type,e => {
        if (e.target.matches(selector)) callback(e);
    })
}

//handlers
function changeColor(event){
    if (Draw){
        const random = Math.floor(Math.random() * color.length); 
        event.target.style.backgroundColor = color[random];        
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

function erase(){
    removeContainer();
    createGrid(curSize);
}

function changeBtn(){
    if (btnId.textContent === 'Darken cell onclick'){
        btnId.textContent = 'Lighten cell onclick';
    }else{
       btnId.textContent = 'Darken cell onclick';
    }        
}

function changeOpacity(event){
    let e = event.target
    let styles = e.getAttribute("style").split(';');
    console.log(styles)
    opacity = parseFloat(getStyleValue(styles,'opacity'));

    if (btnId.textContent === 'Darken cell onclick'){
        opacity += 0.1
        console.log(opacity);
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

function getStyleValue(styles,value){
    for (let s of styles){
        const [key,val] = s.split(':').map(kv => kv.trim());
        if (key === value) return val;
    }
}

let Draw = false;
createGrid(curSize);
addGlobalEventListeners("mousedown",".grids",(event) =>{
    Draw = true;
    changeColor(event);
})
addGlobalEventListeners("mouseover",".grids",changeColor);
addGlobalEventListeners('mouseup',".grids",(event)=>{
    Draw = false;
})
addGlobalEventListeners("click","#newGrid",newGrid);
addGlobalEventListeners("click","#erase",erase);
addGlobalEventListeners("click","#changeOpacity",changeBtn);
addGlobalEventListeners("click",".grids",changeOpacity);
