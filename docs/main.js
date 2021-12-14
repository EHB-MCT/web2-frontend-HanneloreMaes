/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/credentials.js":
/*!****************************!*\
  !*** ./src/credentials.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"openweather\": () => (/* binding */ openweather),\n/* harmony export */   \"mapApi\": () => (/* binding */ mapApi),\n/* harmony export */   \"rapid\": () => (/* binding */ rapid)\n/* harmony export */ });\nlet openweather =\"8532eda8a091632f5428caff44d04e73\";\r\nlet mapApi = \"y9jdsRhSBmSiVS7TFBcWCAsH6r9Xg90c\"\r\nlet rapid = \"29e306b66bmsh45041b043cda44dp1ca8e9jsn1f25d8e9926c\"\r\n\r\n\n\n//# sourceURL=webpack://web2-frontend-hanneloremaes/./src/credentials.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _credentials_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./credentials.js */ \"./src/credentials.js\");\n\r\nconst test1 = _credentials_js__WEBPACK_IMPORTED_MODULE_0__.openweather;\r\nconst test2= _credentials_js__WEBPACK_IMPORTED_MODULE_0__.mapApi;\r\nconst test3 = _credentials_js__WEBPACK_IMPORTED_MODULE_0__.rapid;\r\n\r\nwindow.onload = positionStarMap();\r\n\r\ngetStarted();\r\nfunction getStarted(){\r\n    let submitForm = document.getElementById('searchform');\r\n    submitForm.addEventListener(\"submit\", e => {\r\n        e.preventDefault();\r\n        let inputPlaces = document.getElementById(\"inputPlace\").value;\r\n        getData(inputPlaces)\r\n        postInput(inputPlaces);\r\n    });\r\n\r\n}\r\n\r\n\r\nfunction postInput(inputPlaces){\r\n    console.log('Plaats', inputPlaces);\r\n    \r\n    let header = new Headers();\r\n    header.append(\"Content-Type\", \"application/json\");\r\n\r\n    fetch(\"https://sterrenkijker.herokuapp.com/saveInputPlace\", {\r\n        method: 'POST',\r\n        headers: header,                        // laat weten welke taal hij moet hebben en in welke taal hij communiceert\r\n        body: JSON.stringify({\r\n            input: inputPlaces\r\n        }),\r\n    }) \r\n    .then(response => response.json())\r\n    .then(dataPost=> {\r\n        console.log(\"Succes Post\", dataPost)\r\n        getInput(inputPlaces)\r\n    })\r\n}\r\n\r\n//ophalen van data voor lat en long van inputPlaces\r\nfunction getData(inputPlaces){\r\n    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${test2}&location=${inputPlaces}`)\r\n    .then(response => response.json())\r\n    .then(data2 => {\r\n        getIdWiki(inputPlaces)\r\n        //testApi(data2, inputPlaces);\r\n        positionStarMap(data2);\r\n        getWeather(data2, inputPlaces);                               // doorgeven van data naar getWeather functie\r\n                                                                      // Beter niet boven in window.onload function -> anders wordt het 2x uitgevoerd\r\n\r\n    })\r\n}\r\n\r\n/* <!--begin https://virtualsky.lco.global/ --> */\r\nlet planetarium;\r\nfunction positionStarMap(data2){\r\n    if(data2 != null){\r\n        let latitude = data2.results[0].locations[0].displayLatLng.lat;\r\n        let longitude =data2.results[0].locations[0].displayLatLng.lng;\r\n        console.log('Lat, Long', latitude, longitude);\r\n        S(document).ready(function() {\r\n            planetarium = S.virtualsky({\r\n                'id': 'starmapper',\r\n                'clock': false,\r\n                'projection': 'stereo',\r\n                'latitude': latitude,\r\n                'longitude': longitude,\r\n                'ground': true,\r\n                'gradient': true,\r\n                'constellations': true,\r\n                'constellationlabels': true,\r\n                'showplanets': true,\r\n                'showplanetslabels': true,\r\n                'showstars': true,\r\n                'showstarlabels': true,\r\n                'gridlines_az': true,\r\n                'live': true,\r\n                'showposition': false,\r\n                'showdate': false\r\n            });\r\n        });\r\n    } else if (data2 == null) {\r\n        S(document).ready(function() {\r\n            planetarium = S.virtualsky({\r\n                'id': 'starmapper',\r\n                'clock': false,\r\n                'projection': 'stereo',\r\n                'latitude': 50.85045,\r\n                'longitude': 4.34878,\r\n                'ground': true,\r\n                'gradient': true,\r\n                'constellations': true,\r\n                'constellationlabels': true,\r\n                'showplanets': true,\r\n                'showplanetslabels': true,\r\n                'showstars': true,\r\n                'showstarlabels': true,\r\n                'gridlines_az': true,\r\n                'live': true,\r\n                'showposition': false,\r\n                'showdate': false\r\n            });\r\n        });\r\n    }   \r\n}\r\n/* <!--eind https://virtualsky.lco.global/ --> */\r\n\r\nfunction getIdWiki(inputPlaces){\r\n    fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=${inputPlaces}&format=json`)\r\n    .then(response => response.json())\r\n    .then(dataWiki => {\r\n        console.log('Wiki Id Nummer',dataWiki);\r\n\r\n        /*https://www.youtube.com/watch?v=RPz75gcHj18 begin*/\r\n        console.log('Get entitie',Object.keys(dataWiki.entities));\r\n        let idInput = Object.keys(dataWiki.entities)[0]\r\n        /*https://www.youtube.com/watch?v=RPz75gcHj18 eind*/\r\n\r\n        getNearbyCities(idInput)\r\n    })\r\n}\r\nfunction getNearbyCities(idInput){\r\n    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${idInput}/nearbyCities?radius=100&types=CITY`, {\r\n        \"method\": \"GET\",\r\n        \"headers\": {\r\n            \"x-rapidapi-host\": \"wft-geo-db.p.rapidapi.com\",\r\n            \"x-rapidapi-key\": `${test3}`\r\n        }\r\n    })\r\n    .then(response => response.json())\r\n    .then(nearbyPlaces => {\r\n        console.log('Data nearby place', nearbyPlaces.data);\r\n        let nearest = nearbyPlaces.data\r\n        nearest.forEach(weatherPlaces => {\r\n            console.log(weatherPlaces);\r\n            let latWiki=weatherPlaces.latitude;\r\n            let lonWiki=weatherPlaces.longitude;\r\n            console.log('testen', latWiki, lonWiki);\r\n            // const coordinateLat = test.map(obj => obj.latitude);\r\n            // const coordinateLon = test.map(obj => obj.latitude);\r\n\r\n            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latWiki}&lon=${lonWiki}&appid=${test1}&units=metric`)\r\n            .then(response => response.json())\r\n            .then(dataPlaces => {\r\n                console.log('Weather data', dataPlaces);\r\n\r\n                /* begin https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/\r\n                let unix_timestamp = dataPlaces.current.dt;\r\n                let date = new Date(unix_timestamp * 1000);\r\n                let hours = date.getHours();\r\n                let minutes = \"00\";\r\n                let formattedTime = hours + ':' + '0' + minutes;\r\n                /* Eind https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/\r\n\r\n                if (dataPlaces.current.weather[0].main == \"Clear\"){\r\n                    let containerNearestPlace = document.getElementById('placeToSeeStars').innerHTML = `\r\n                        <div id=\"weatherNearestPlace\">\r\n                            <h1 id=\"nearestPlace\">Nearest place to see stars:</h1>\r\n                            <div id=\"ContainerAllInfoNearest\">\r\n                                <div id=\"locatieTimeNearest\">\r\n                                    <h2 id=\"locationNearbyCity\">${inputPlaces}</h2>\r\n                                    <p id=\"clockNearest\">${formattedTime}</p>\r\n                                </div>\r\n                                <div id=\"columnTextNearest\">\r\n                                    <p id=\"temperature\">${dataPlaces.current.temp}°C</pv>\r\n                                    <div id=\"conditionWeatherNearest\">\r\n                                        <img class=\"iconWeatherNearest\" src=\"http://openweathermap.org/img/wn/${dataPlaces.current.weather[0].icon}.png\" alt=\"icon-weather-condition\">\r\n                                        <p id=\"weatherConditionNameNearest\">${dataPlaces.current.weather[0].description}</p>\r\n                                    </div>\r\n                                    <div class=\"arrow\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>`;\r\n                } else if(dataPlaces.current.weather[0].main != \"Clear\"){\r\n                    let containerNearestPlace = document.getElementById('placeToSeeStars').innerHTML = `\r\n                        <div id=\"weatherNoNearestPlace\">\r\n                            <h2 id=\"noNearestPlace\">There is no nearest place with clear sky at this moment</h1>`;\r\n                }\r\n            });\r\n        });\r\n    });    \r\n}\r\n\r\nfunction getWeather(data2, inputPlaces){\r\n\r\n    let lat = data2.results[0].locations[0].displayLatLng.lat;       //ophalen data voor de latitude\r\n    let lon = data2.results[0].locations[0].displayLatLng.lng;       // ophalen data voor de longitude\r\n    \r\n    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${test1}&units=metric`)\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        console.log('Weather data', data);\r\n        let weatherHourly = data.hourly;           \r\n\r\n        let containerWeatherLeft = document.getElementById('weatherLeftMenu').innerHTML = `\r\n                <div id=\"weatherLeftMenuBlock\">\r\n                    <div id=\"containerInfoLeft\">\r\n                    ${/* begin https://www.youtube.com/watch?v=6trGQWzg2AI*/\r\n                    setInterval(() => {\r\n                        let time = new Date();\r\n                        let hour = time.getHours();\r\n                        let minutes2 = time.getMinutes();\r\n                        \r\n                        let container = document.getElementById('current-time');\r\n                        container.innerHTML = hour + ':' + minutes2\r\n                    }, 1000)\r\n                    /* eind https://www.youtube.com/watch?v=6trGQWzg2AI*/}\r\n                        <p id=\"current-time\"></p>\r\n                        &nbsp; \r\n                        <h1 id=\"current-inputplace\">${inputPlaces}</h1>\r\n                    </div>\r\n                    <div id=\"columnText\">\r\n                        <div id=\"conditionWeatherLeft\">\r\n                            <p id=\"temperatureLeft\">${data.current.temp}°C</pv>\r\n                            &nbsp; &nbsp; &nbsp; \r\n                            <div id=\"containerWeatherConditionLeft\">\r\n                                <img class=\"iconWeatherLeft\" src=\"http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png\" alt=\"icon-weather-condition\">\r\n                                <p id=\"weatherConditionNameLeft\">${data.current.weather[0].description}</p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>`;\r\n        document.getElementById('weatherRightMenu').innerHTML = \"\";\r\n        weatherHourly.forEach(weather => {\r\n\r\n            /* begin https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/\r\n            let unix_timestamp = weather.dt;\r\n            let date = new Date(unix_timestamp * 1000);\r\n            let hours2 = date.getHours()+1;\r\n            let minutes = \"0\" + date.getMinutes();\r\n            let formattedTime2 = hours2 + ':' + minutes.substr(-2);\r\n            /* Eind https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/847196#847196*/\r\n            \r\n            let containerMenuRight = document.getElementById('weatherRightMenu');\r\n            let htmlStringRight= `\r\n                <div id=\"weatherRightMenuBlock\">\r\n                    <img class=\"iconWeather\" src=\"http://openweathermap.org/img/wn/${weather.weather[0].icon}.png\" alt=\"icon-weather-condition\">\r\n                    <div id=\"columnText\">\r\n                        <p id=\"clock\">${formattedTime2}</p>\r\n                        <div id=\"conditionWeather\">\r\n                            <p id=\"temperature\">${weather.temp}°C</pv>\r\n                            &nbsp; &nbsp;\r\n                            <p id=\"weatherConditionName\">${weather.weather[0].description}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>`;\r\n            containerMenuRight.insertAdjacentHTML('beforeend', htmlStringRight)\r\n        })\r\n    });        \r\n}\n\n//# sourceURL=webpack://web2-frontend-hanneloremaes/./src/index.js?");

/***/ }),

/***/ "./src/savedInput.js":
/*!***************************!*\
  !*** ./src/savedInput.js ***!
  \***************************/
/***/ (() => {

eval("window.onload = getInput()\r\n\r\nasync function getInput(){\r\n    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);\r\n    const dataGet = await response.json();\r\n   \r\n        console.log(\"Succes Get\", dataGet)\r\n        dataGet.forEach(saved => {\r\n            const containerSaved = document.getElementById('savedContainer');\r\n            const savedString =  `\r\n            <div id=\"${saved._id}\" class=\"savedPlaceContainer\">\r\n                <h2 id=\"savedInput\">${saved.input}</h2>\r\n                <div id=\"editDelete\">\r\n                    <button class=\"containerEdit\"><i class=\"fas fa-edit\"></i></button>\r\n                    <button class=\"containerDelete\"><i class=\"fas fa-trash-alt\"></i></button>\r\n                </div>\r\n\r\n                <form id=\"editFrom\" style=\"display: none\">\r\n                    <h2>Change the city name</h2>\r\n                    <input id=\"editCity\" type=\"text\" name=\"name\" placeholder=\"Name of city\" />\r\n                    <button id=\"submitCity\" type=\"submit\">Send</button>\r\n                </form>\r\n\r\n            </div>`;\r\n            containerSaved.insertAdjacentHTML('beforeend', savedString);\r\n        });\r\n        editInput(dataGet);\r\n}\r\n\r\nfunction editInput(dataGet){\r\n    document.getElementById('savedContainer').addEventListener('click', (e) => {\r\n        \r\n        const cityId = e.target.closest('.savedPlaceContainer').id;\r\n        \r\n        document.getElementById('editFrom').style.display = \"block\";\r\n        if(cityId){\r\n            if(e.target.className.indexOf('edit') !== -1){\r\n                console.log('Edit')\r\n                document.getElementById('submitCity').addEventListener(\"submit\", e => {\r\n                    e.preventDefault();\r\n                    let newCityName = document.getElementById('editCity').value;\r\n                    \r\n                    let header = new Headers();\r\n                    header.append(\"Content-Type\", \"application/json\");\r\n\r\n                    fetch(`https://sterrenkijker.herokuapp.com/updateInput/:id`, {\r\n                        method: 'PUT',\r\n                        headers: header,\r\n                        body: JSON.stringify({\r\n                            input: newCityName\r\n                        })\r\n                    })\r\n                    .then(response => response.json())\r\n                    .then(dataPut =>{\r\n                        console.log(\"Succes Update\", dataPut);\r\n                        setTimeout(document.getElementById('editFrom').style.display = \"none\", 2000)\r\n                        setTimeout(getInput, 1000)\r\n                    })\r\n                })\r\n                \r\n            }\r\n            \r\n            if(e.target.className.indexOf('trash') !== -1){\r\n                console.log('trash')\r\n            }\r\n    \r\n        }\r\n    });        \r\n}\n\n//# sourceURL=webpack://web2-frontend-hanneloremaes/./src/savedInput.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/savedInput.js");
/******/ 	
/******/ })()
;