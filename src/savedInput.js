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
        } 

        // Voor delete
        if (cityId && e.target.className.indexOf('trash') !== -1) {
            console.log('trash')
            deleteFun()
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

function submitChange(e) {
    e.preventDefault();
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
    .then(dataPut => {
        console.log('New update is made', dataPut);
        document.getElementById('editForm').style.display = "none";
        getInput();
    });

}

function deleteFun(){
    fetch(`https://sterrenkijker.herokuapp.com/deleteInput/${cityId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(dataDel => {
        console.log('deleted id', dataDel);
        getInput();
    });
}