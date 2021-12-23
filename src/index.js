import * as C from './credentials.js'
const test1 = C.openweather;
const test2= C.mapApi;
const test3 = C.rapid;

window.onload = function() {
    positionStarMap()
    getStarted();
};

//start of the site
function getStarted(){
    let submitForm = document.getElementById('searchform');
    submitForm.addEventListener("submit", e => {
        e.preventDefault();
        let inputPlace = document.getElementById("inputPlace").value;
        
        /*https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript begin*/
        let inputPlaces = inputPlace.charAt(0).toUpperCase() + inputPlace.slice(1);
        /*https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript eind*/

        getData(inputPlaces);
        postInput(inputPlaces);
    });

    let scrollMap = document.getElementById('scrollMap');
    scrollMap.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('mainMap').style.display = "none"; 
        document.getElementById('showIndex').style.display = "block";
    })

    let showBack = document.getElementById('showIndex');
    showBack.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('mainMap').style.display = "block"; 
        document.getElementById('showIndex').style.display = "none";
    })

}

// call to the starmap
/* <!--begin https://virtualsky.lco.global/ --> */
let planetarium;
function positionStarMap(dataGet){
    if(dataGet != null){
        let latitude = dataGet.results[0].locations[0].displayLatLng.lat;
        let longitude =dataGet.results[0].locations[0].displayLatLng.lng;
        S(document).ready(function() {
            planetarium = S.virtualsky({
                'id': 'starmapper',
                'clock': false,
                'projection': 'stereo',
                'latitude': latitude,
                'longitude': longitude,
                'ground': true,
                'gradient': true,
                'constellations': true,
                'constellationlabels': true,
                'showplanets': true,
                'showplanetslabels': true,
                'showstars': true,
                'showstarlabels': true,
                'gridlines_az': true,
                'live': true,
                'showposition': false,
                'showdate': false
            });
        });
    } else if (dataGet == null) {
        S(document).ready(function() {
            planetarium = S.virtualsky({
                id: 'starmapper',
                projection: 'stereo',
                clock: false,
                latitude: 50.85045,
                longitude: 4.34878,
                ground: true,
                gradient: true,
                constellations: true,
                constellationlabels: true,
                showplanets: true,
                showplanetslabels: true,
                showstars: true,
                showstarlabels: true,
                gridlines_az: true,
                live: true,
                showposition: false,
                showdate: false
            });
        });
    }   
}
/* <!--eind https://virtualsky.lco.global/ --> */

// post of new function
function postInput(inputPlaces){    
    let header = new Headers();
    header.append("Content-Type", "application/json");

    fetch("https://sterrenkijker.herokuapp.com/saveInputPlace", {
        method: 'POST',
        headers: header,                        // laat weten welke taal hij moet hebben en in welke taal hij communiceert
        body: JSON.stringify({
            input: inputPlaces
        }),
    }) 
    .then(response => response.json())
    .then(dataPost=> {
        console.log("Succes Post", dataPost)
        getInput(inputPlaces)
    })
}

//ophalen van data voor lat en long van inputPlaces
function getData(inputPlaces){
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${test2}&location=${inputPlaces}`)
    .then(response => response.json())
    .then(dataGet => {
        getIdWiki(inputPlaces)
        positionStarMap(dataGet);
        getWeather(dataGet, inputPlaces);                               // doorgeven van data naar getWeather functie
                                                                      // Beter niet boven in window.onload function -> anders wordt het 2x uitgevoerd

    })
}

// ophalen van id voor api gebruik om nabijgelegen cities te zoeken
function getIdWiki(inputPlaces){

    fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=${inputPlaces}&format=json&origin=*`)
    .then(response => response.json())
    .then(dataWiki => {

        /*https://www.youtube.com/watch?v=RPz75gcHj18 begin*/
        console.log('Get entitie',Object.keys(dataWiki.entities));
        let idInput = Object.keys(dataWiki.entities)[0]
        /*https://www.youtube.com/watch?v=RPz75gcHj18 eind*/

        getNearbyCities(idInput, inputPlaces)
    })
}

// functie voor ophalen nabijgelegen cities
function getNearbyCities(idInput, inputPlaces){
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${idInput}/nearbyCities?radius=100&types=CITY`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": `${test3}`
        }
    })
    .then(response => response.json())
    .then(nearbyPlaces => {
        let nearest = nearbyPlaces.data
        nearest.forEach(weatherPlaces => {
            console.log(weatherPlaces);
            let latWiki=weatherPlaces.latitude;
            let lonWiki=weatherPlaces.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latWiki}&lon=${lonWiki}&appid=${test1}&units=metric`)
            .then(response => response.json())
            .then(dataPlaces => {
                console.log('Weather data Nearby', dataPlaces);
                    /* begin https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/
                    let unix_timestamp = dataPlaces.current.dt;
                    let date = new Date(unix_timestamp * 1000);
                    let hours = date.getHours();
                    let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
                    let formattedTime = hours + ':' + minutes;
                    /* Eind https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/
    
                    if (dataPlaces.current.weather[0].main == "Clear"){
                        let containerNearestPlace = document.getElementById('placeToSeeStars').innerHTML = `
                            <div id="weatherNearestPlace">
                                <h1 id="nearestPlace">Nearest place to see stars:</h1>
                                <div id="ContainerAllInfoNearest">
                                    <div id="locatieTimeNearest">
                                        <h2 id="locationNearbyCity">${weatherPlaces.name}</h2>
                                        <p id="clockNearest">${formattedTime}</p>
                                    </div>
                                    <div id="columnTextNearest">
                                        <p id="temperature">${dataPlaces.current.temp}°C</pv>
                                        <div id="conditionWeatherNearest">
                                            <img class="iconWeatherNearest" src="http://openweathermap.org/img/wn/${dataPlaces.current.weather[0].icon}.png" alt="icon-weather-condition">
                                            <p id="weatherConditionNameNearest">${dataPlaces.current.weather[0].description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    } else if(dataPlaces.current.weather[0].main != "Clear"){
                        let containerNearestPlace = document.getElementById('placeToSeeStars').innerHTML = `
                            <div id="weatherNoNearestPlace">
                                <h2 id="noNearestPlace">There is no nearest place with clear sky at this moment</h1>`;
                    }
                });
            });
    });    
}

// ophalen van het weer voor ingegeven plaats
function getWeather(dataGet, inputPlaces){

    let lat = dataGet.results[0].locations[0].displayLatLng.lat;       //ophalen data voor de latitude
    let lon = dataGet.results[0].locations[0].displayLatLng.lng;       // ophalen data voor de longitude
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${test1}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log('Weather data', data);
        let weatherHourly = data.hourly;           

        let containerWeatherLeft = document.getElementById('weatherLeftMenu').innerHTML = `
                <div id="weatherLeftMenuBlock">
                    <div id="containerInfoLeft">
                    ${/* begin https://www.youtube.com/watch?v=6trGQWzg2AI*/
                    setInterval(() => {
                        let time = new Date();
                        let hour = time.getHours();
                        let minutes2 = (time.getMinutes()<10?'0':'') + time.getMinutes();
                        
                        let container = document.getElementById('current-time');
                        container.innerHTML = hour + ':' + minutes2
                    }, 1000)
                    /* eind https://www.youtube.com/watch?v=6trGQWzg2AI*/}
                        <p id="current-time"></p>
                        &nbsp; 
                        <h1 id="current-inputplace">${inputPlaces}</h1>
                    </div>
                    <div id="columnText">
                        <div id="conditionWeatherLeft">
                            <p id="temperatureLeft">${data.current.temp}°C</pv>
                            &nbsp; &nbsp; &nbsp; 
                            <div id="containerWeatherConditionLeft">
                                <img class="iconWeatherLeft" src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="icon-weather-condition">
                                <p id="weatherConditionNameLeft">${data.current.weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        document.getElementById('weatherRightMenu').innerHTML = "";
        weatherHourly.forEach(weather => {

            /* begin https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/
            let unix_timestamp = weather.dt;
            let date2 = new Date(unix_timestamp * 1000);
            let hours2 = date2.getHours()+1;
            let minutes = (date2.getMinutes()<10?'0':'') + date2.getMinutes();
            let formattedTime2 = hours2 + ':' + minutes;
            /* Eind https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/
            
            let containerMenuRight = document.getElementById('weatherRightMenu');
            let htmlStringRight= `
                <div id="weatherRightMenuBlock">
                    <img class="iconWeather" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="icon-weather-condition">
                    <div id="columnText">
                        <p id="clock">${formattedTime2}</p>
                        <div id="conditionWeather">
                            <p id="temperature">${weather.temp}°C</pv>
                            &nbsp; &nbsp;
                            <p id="weatherConditionName">${weather.weather[0].description}</p>
                        </div>
                    </div>
                </div>`;
            containerMenuRight.insertAdjacentHTML('beforeend', htmlStringRight)
        })
    });        
}