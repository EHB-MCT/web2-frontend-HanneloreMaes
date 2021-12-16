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

/***/ "./src/savedInput.js":
/*!***************************!*\
  !*** ./src/savedInput.js ***!
  \***************************/
/***/ (() => {

eval("window.onload = getInput()\r\n\r\nasync function getInput(){\r\n    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);\r\n    const dataGet = await response.json();\r\n   \r\n        console.log(\"Succes Get\", dataGet)\r\n        dataGet.forEach(saved => {\r\n            const containerSaved = document.getElementById('savedContainer');\r\n            const savedString =  `\r\n            <div id=\"${saved._id}\" class=\"savedPlaceContainer\">\r\n                <h2 id=\"savedInput\">${saved.input}</h2>\r\n                <div id=\"editDelete\">\r\n                    <button class=\"containerEdit\"><i class=\"fas fa-edit\"></i></button>\r\n                    <button class=\"containerDelete\"><i class=\"fas fa-trash-alt\"></i></button>\r\n                </div>\r\n\r\n                <form id=\"editFrom\" style=\"display: none\">\r\n                    <h2>Change the city name</h2>\r\n                    <input id=\"editCity\" type=\"text\" name=\"name\" placeholder=\"Name of city\" />\r\n                    <button id=\"submitCity\" type=\"submit\">Send</button>\r\n                </form>\r\n\r\n            </div>`;\r\n            containerSaved.insertAdjacentHTML('beforeend', savedString);\r\n        });\r\n        editInput(dataGet);\r\n}\r\n\r\nfunction editInput(dataGet){\r\n\r\n    // Hier ligt het probleem waar ik op het laatste van de les nog even over had gesproken.\r\n    // Het probleem waar ik tegen aan loop is:\r\n    // Ik kan de form aanspreken en kan iets ingeven als verandering van de gemeente/stad, maar als ik op send druk\r\n    // dan voert hij gelijk de getInput() uit en wordt er geen wijzeging doorgevoerd.\r\n    // Als ik dan ga kijken bij postman krijg ik mijn error te zien (file script.js(backend) op lijn 136).\r\n    // Zelf heb ik al wat proberen zoeken, maar ik kan niets vinden.\r\n    // Super bedankt dat je ernaar wilt kijken \r\n    // Groetjes\r\n\r\n    document.getElementById('savedContainer').addEventListener('click', (e) => {\r\n        \r\n        const cityId = e.target.closest('.savedPlaceContainer').id;\r\n        \r\n        document.getElementById('editFrom').style.display = \"block\";\r\n        if(cityId){\r\n            if(e.target.className.indexOf('edit') !== -1){\r\n                document.getElementById('submitCity').addEventListener(\"submit\", e => {\r\n                    e.preventDefault();\r\n                    let newCityName = document.getElementById('editCity').value;\r\n                    \r\n                    let header = new Headers();\r\n                    header.append(\"Content-Type\", \"application/json\");\r\n\r\n                    fetch(`https://sterrenkijker.herokuapp.com/updateInput/:id`, {\r\n                        method: 'PUT',\r\n                        headers: header,\r\n                        body: JSON.stringify({\r\n                            input: newCityName\r\n                        })\r\n                    })\r\n                    .then(response => response.json())\r\n                    .then(dataPut =>{\r\n                        console.log(\"Succes Update\", dataPut);\r\n                        setTimeout(document.getElementById('editFrom').style.display = \"none\", 2000)\r\n                        setTimeout(getInput, 1000)\r\n                    })\r\n                })\r\n                console.log('Edit')                \r\n            }\r\n            \r\n            if(e.target.className.indexOf('trash') !== -1){\r\n                console.log('trash')\r\n            }\r\n    \r\n        }\r\n    });        \r\n}\n\n//# sourceURL=webpack://web2-frontend-hanneloremaes/./src/savedInput.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/savedInput.js"]();
/******/ 	
/******/ })()
;