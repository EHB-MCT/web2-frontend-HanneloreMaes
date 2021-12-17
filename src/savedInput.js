let cityId;

window.onload = function () {
    console.log('loaded');
    getInput();


    // Prep event listeners for submit
    document.getElementById('editForm').addEventListener("submit", submitChange);
    // Prep event listeners for clicks on icons
    document.getElementById('savedContainer').addEventListener('click', (e) => {
        console.log('click');

        cityId = e.target.closest('.savedPlaceContainer').id;
        console.log("Test if loaded/clicked", cityId)

        // Voor edit
        if (cityId && e.target.className.indexOf('edit') !== -1) {
            console.log('Edit')
            document.getElementById('editForm').style.display = "block";
            
            //TODO add current city name to inputfield   

        } 

        // Voor delete
        if (cityId && e.target.className.indexOf('trash') !== -1) {
            console.log('trash')
            console.log('deleted id', cityId);
        }

    });
}

async function getInput() {
    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);
    const dataGet = await response.json();

    // @TODO Clear the current list
    
    console.log("Succes Get", dataGet)
    const containerSaved = document.getElementById('savedContainer');
    containerSaved.innerHTML = "";
    dataGet.forEach(saved => {
        console.log(saved._id)
        const savedString = `
            <div id="${saved._id}" class="savedPlaceContainer">
                <h2 id="savedInput">${saved.input}</h2>
                <div id="editDelete">
                    <button id="edit" class="containerEdit" value ="${saved._id}"><i class="fas fa-edit"></i></button>
                    <button id = "delete" class="containerDelete" value ="${saved._id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`;
        containerSaved.insertAdjacentHTML('beforeend', savedString);
    });

}

function submitChange(event) {
    event.preventDefault();
    console.log('edit the city');
    console.log("Test meegeven id", cityId);
    let newCity = document.getElementById('editCity').value
    console.log(newCity);

    fetch(`https://sterrenkijker.herokuapp.com/updateInput/${cityId}/${newCity}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('New update is made', data);
        document.getElementById('editForm').style.display = "none";
        getInput();
    });

}
