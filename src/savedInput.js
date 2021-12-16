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

// function eventEdit(id){

//     document.getElementById('editForm').addEventListener('submit', function (e) {
//         e.preventDefault();
//         let newCity = document.getElementById('editCity').value
//         console.log(newCity);

//         fetch(`https://sterrenkijker.herokuapp.com/updateInput/:${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     input: `${newCity}`
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('New update is made', data);
//                 setTimeout(document.getElementById('editForm').style.display = "none", 2000)
//                 setTimeout(getInput, 1000)
//             });
//     });
// }

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
    // let verander = document.getElementsByClassName('containerEdit');
    // for (let i = 0; i < verander.length; i++) {
    //     verander[i].addEventListener('click', e => {
    //         e.preventDefault();
    //         let id = document.getElementById('edit').value;
    //         document.getElementById('editForm').style.display = "block"
    //         eventEdit(id);
    //     })
    // }

}

function submitChange(event) {
    event.preventDefault();
    console.log('edit the city');
    console.log("Test meegeven id", cityId);

    event.preventDefault();
    let newCity = document.getElementById('editCity').value
    console.log(newCity);

    fetch(`https://sterrenkijker.herokuapp.com/updateInput/:${cityId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: `${newCity}`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('New update is made', data);
        setTimeout(document.getElementById('editForm').style.display = "none", 2000);
        // setTimeout(getInput, 1000)
        getInput();
    });

}
