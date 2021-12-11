"use strict";

window.onload = getInput()

async function getInput(){
    await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`)
    .then(response => response.json())
    .then(dataGet =>{
        console.log("Succes Get", dataGet)
        dataGet.forEach(saved => {
            const containerSaved = document.getElementById('savedContainer');
            const savedString =  `
                <div id="savedPlaceContainer">
                    <h2 id="savedInput">${saved.input}</h2>
                    <div id="editDelete">
                        <span id="background"><i class="fas fa-edit"></i></span>
                        <span id="background2"><i class="fas fa-trash-alt"></i></span>
                    </div>
                </div>    
            `;
            containerSaved.insertAdjacentHTML('beforeend', savedString);
        })
    })
}

function editInput(){
    let header = new Headers();
    header.append("Content-Type", "application/json");

    let inputPlace = {
        input: inputPlace
    }

    fetch(`https://sterrenkijker.herokuapp.com/updateInput/:input`, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(inputPlace)
    })
    .then(response => response.json())
    .then(dataGet =>{
        console.log("Succes Update", dataGet)
        dataGet.forEach(saved => {
            const containerSaved = document.getElementById('savedContainer');
            const savedString =  `
                <div id="savedPlaceContainer">
                    <h2 id="savedInput">${saved.input}</h2>
                    <div id="editDelete">
                        <button id="background" class="fas fa-edit"></button>
                        <button id="background2"><i class="fas fa-trash-alt"></i></span>
                    </div>
                </div>    
            `;
            containerSaved.insertAdjacentHTML('beforeend', savedString);
        })
    })
}