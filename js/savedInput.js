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
                <h2 id="savedInput">${saved.input}</h2>
                <div id="editDelete">
                    <span class="fas fa-edit"></span>
                    <span class="fas fa-trash-alt"></span>
                </div>
            `;
            containerSaved.insertAdjacentHTML('beforeend', savedString);
        })
    })
}