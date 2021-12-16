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

        // On EDIT
        if (cityId && e.target.className.indexOf('edit') !== -1) {
            console.log('Edit')
            document.getElementById('editForm').style.display = "block";
            //@TODO add current city name to inputfield   

        } else if (cityId && e.target.className.indexOf('trash') !== -1) {
            console.log('trash')
        }

    });
}

async function getInput() {
    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);
    const dataGet = await response.json();

    // @TODO Clear the current list

    console.log("Succes Get", dataGet)
    const containerSaved = document.getElementById('savedContainer');
    dataGet.forEach(saved => {
        const savedString = `
            <div id="${saved._id}" class="savedPlaceContainer">
                <h2 id="savedInput">${saved.input}</h2>
                <div id="editDelete">
                    <button class="containerEdit"><i class="fas fa-edit"></i></button>
                    <button class="containerDelete"><i class="fas fa-trash-alt"></i></button>
                </div>

                

            </div>`;
        containerSaved.insertAdjacentHTML('beforeend', savedString);
    });

}

function submitChange(event) {
    event.preventDefault();
    console.log('edit the city');

    // event.preventDefault();
    //                 let newCityName = document.getElementById('editCity').value;

    //                 let header = new Headers();
    //                 header.append("Content-Type", "application/json");

    //                 fetch(`https://sterrenkijker.herokuapp.com/updateInput/:id`, {
    //                     method: 'PUT',
    //                     headers: header,
    //                     body: JSON.stringify({
    //                         input: newCityName
    //                     })
    //                 })
    //                 .then(response => response.json())
    //                 .then(dataPut =>{
    //                     console.log("Succes Update", dataPut);
    //                     setTimeout(document.getElementById('editFrom').style.display = "none", 2000)
    //                     setTimeout(getInput, 1000)
    //                 })

}
