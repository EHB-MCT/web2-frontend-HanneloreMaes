window.onload = getInput()

async function getInput(){
    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);
    const dataGet = await response.json();
   
        console.log("Succes Get", dataGet)
        dataGet.forEach(saved => {
            const containerSaved = document.getElementById('savedContainer');
            const savedString =  `
            <div id="${saved._id}" class="savedPlaceContainer">
                <h2 id="savedInput">${saved.input}</h2>
                <div id="editDelete">
                    <button class="containerEdit"><i class="fas fa-edit"></i></button>
                    <button class="containerDelete"><i class="fas fa-trash-alt"></i></button>
                </div>

                <form id="editFrom" style="display: none">
                    <h2>Change the city name</h2>
                    <input id="editCity" type="text" name="name" placeholder="Name of city" />
                    <button id="submitCity" type="submit">Send</button>
                </form>

            </div>`;
            containerSaved.insertAdjacentHTML('beforeend', savedString);
        });
        editInput(dataGet);
}

function editInput(dataGet){

    // Hier ligt het probleem waar ik op het laatste van de les nog even over had gesproken.
    // Het probleem waar ik tegen aan loop is:
    // Ik kan de form aanspreken en kan iets ingeven als verandering van de gemeente/stad, maar als ik op send druk
    // dan voert hij gelijk de getInput() uit en wordt er geen wijzeging doorgevoerd.
    // Als ik dan ga kijken bij postman krijg ik mijn error te zien (file script.js(backend) op lijn 136).
    // Zelf heb ik al wat proberen zoeken, maar ik kan niets vinden.
    // Super bedankt dat je ernaar wilt kijken 
    // Groetjes

    document.getElementById('savedContainer').addEventListener('click', (e) => {
        
        const cityId = e.target.closest('.savedPlaceContainer').id;
        
        document.getElementById('editFrom').style.display = "block";
        if(cityId){
            if(e.target.className.indexOf('edit') !== -1){
                document.getElementById('submitCity').addEventListener("submit", e => {
                    e.preventDefault();
                    let newCityName = document.getElementById('editCity').value;
                    
                    let header = new Headers();
                    header.append("Content-Type", "application/json");

                    fetch(`https://sterrenkijker.herokuapp.com/updateInput/:id`, {
                        method: 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            input: newCityName
                        })
                    })
                    .then(response => response.json())
                    .then(dataPut =>{
                        console.log("Succes Update", dataPut);
                        setTimeout(document.getElementById('editFrom').style.display = "none", 2000)
                        setTimeout(getInput, 1000)
                    })
                })
                console.log('Edit')                
            }
            
            if(e.target.className.indexOf('trash') !== -1){
                console.log('trash')
            }
    
        }
    });        
}