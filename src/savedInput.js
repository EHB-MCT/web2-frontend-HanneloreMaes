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
            </div>    
            `;
            containerSaved.insertAdjacentHTML('beforeend', savedString);
        });
  

    editInput();
}

function editInput(){
    document.getElementById('savedContainer').addEventListener('click', (e) => {
        
        const cityId = e.target.closest('.savedPlaceContainer').id;
        
        if(cityId){
            if(e.target.className.indexOf('edit') !== -1){
                console.log('Edit')
                let newCityName = document.getElementById('editCity').value;
                let inputPlace = {
                    input: newCityName
                }

                let header = new Headers();
                header.append("Content-Type", "application/json");

                fetch(`https://sterrenkijker.herokuapp.com/updateInput/:input`, {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(inputPlace)
                })
                .then(response => response.json())
                .then(dataPut =>{
                    console.log("Succes Update", dataPut);
                    setTimeout(document.getElementById('editContainer').style.display = "none", 2000)
                    setTimeout(getInput(), 1000)
                })
            }
            
            if(e.target.className.indexOf('trash') !== -1){
                console.log('trash')
            }
    
        }
    });        
}