import * as C from './credentials.js'
const test1 = C.openweather;
const test2= C.mapApi;
const test3 = C.rapid;

window.onload = positionStarMap();

getStarted();
function getStarted(){
    let submitForm = document.getElementById('searchform');
    submitForm.addEventListener("submit", e => {
        e.preventDefault();
        let inputPlaces = document.getElementById("inputPlace").value;
        getData(inputPlaces)
        postInput(inputPlaces);
    });

}


function postInput(inputPlaces){
    console.log('Plaats', inputPlaces);
    
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
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${test2}&location=${inputPlaces}`)
    .then(response => response.json())
    .then(data2 => {
        getIdWiki(inputPlaces)
        //testApi(data2, inputPlaces);
        positionStarMap(data2);
        getWeather(data2, inputPlaces);                               // doorgeven van data naar getWeather functie
                                                                      // Beter niet boven in window.onload function -> anders wordt het 2x uitgevoerd

    })
}

/* <!--begin https://virtualsky.lco.global/ --> */
let planetarium;
function positionStarMap(data2){
    if(data2 != null){
        let latitude = data2.results[0].locations[0].displayLatLng.lat;
        let longitude =data2.results[0].locations[0].displayLatLng.lng;
        console.log('Lat, Long', latitude, longitude);
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
    } else if (data2 == null) {
        S(document).ready(function() {
            planetarium = S.virtualsky({
                'id': 'starmapper',
                'clock': false,
                'projection': 'stereo',
                'latitude': 50.85045,
                'longitude': 4.34878,
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
    }   
}
/* <!--eind https://virtualsky.lco.global/ --> */

function getIdWiki(inputPlaces){
    fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=${inputPlaces}&format=json`)
    .then(response => response.json())
    .then(dataWiki => {
        console.log('Wiki Id Nummer',dataWiki);

        /*https://www.youtube.com/watch?v=RPz75gcHj18 begin*/
        console.log('Get entitie',Object.keys(dataWiki.entities));
        let idInput = Object.keys(dataWiki.entities)[0]
        /*https://www.youtube.com/watch?v=RPz75gcHj18 eind*/

        getNearbyCities(idInput)
    })
}
function getNearbyCities(idInput){
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${idInput}/nearbyCities?radius=100&languageCode=en&types=CITY`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": test3
        }
    })
    .then(response => response.json())
    .then(nearbyPlaces => {
        console.log('Data nearby place', nearbyPlaces.data);
        let nearest = nearbyPlaces.data
        nearest.forEach(weatherPlaces => {
            console.log(weatherPlaces);
            let latWiki=weatherPlaces.latitude;
            let lonWiki=weatherPlaces.longitude;
            console.log('testen', latWiki, lonWiki);
            // const coordinateLat = test.map(obj => obj.latitude);
            // const coordinateLon = test.map(obj => obj.latitude);

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latWiki}&lon=${lonWiki}&appid=${test1}&units=metric`)
            .then(response => response.json())
            .then(dataPlaces => {
                console.log('Weather data', dataPlaces);

                /* begin https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/
                let unix_timestamp = dataPlaces.current.dt;
                let date = new Date(unix_timestamp * 1000);
                let hours = date.getHours();
                let minutes = "00";
                let formattedTime = hours + ':' + minutes;
                /* Eind https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/

                if (dataPlaces.current.weather[0].description == "clear"){
                    let containerNearestPlace = document.getElementById('placeToSeeStars').innerHTML = `
                        <div id="weatherNearestPlace">
                            <h1 id="nearestPlace">Nearest place to see stars:</h1>
                            <div id="ContainerAllInfoNearest">
                                <div id="locatieTimeNearest">
                                    <h2 id="locationNearbyCity">${inputPlaces}</h2>
                                    <p id="clockNearest">${formattedTime}</p>
                                </div>
                                <div id="columnTextNearest">
                                    <p id="temperature">${dataPlaces.current.temp}°C</pv>
                                    <div id="conditionWeatherNearest">
                                        <img class="iconWeatherNearest" src="http://openweathermap.org/img/wn/${dataPlaces.current.weather[0].icon}.png" alt="icon-weather-condition">
                                        <p id="weatherConditionNameNearest">${dataPlaces.current.weather[0].description}</p>
                                    </div>
                                    <div class="arrow"></div>
                                </div>
                            </div>
                        </div>`;
                } else if(dataPlaces.current.weather[0].description != "clear"){
                    let containerNearestPlace = document.getElementById('placeToSeeStars').innerHTML = `
                        <div id="weatherNoNearestPlace">
                            <h2 id="noNearestPlace">There is no nearest place with clear sky at this moment</h1>`;
                }
            });
        });
    });    
}

function getWeather(data2, inputPlaces){

    let lat = data2.results[0].locations[0].displayLatLng.lat;       //ophalen data voor de latitude
    let lon = data2.results[0].locations[0].displayLatLng.lng;       // ophalen data voor de longitude
    
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
                        let minutes2 = time.getMinutes();
                        
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
            let date = new Date(unix_timestamp * 1000);
            let hours2 = date.getHours()+1;
            let minutes = "0" + date.getMinutes();
            let formattedTime2 = hours2 + ':' + minutes.substr(-2);
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