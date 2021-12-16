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

eval("let cityId;\r\nwindow.onload = function () {\r\n    console.log('loaded');\r\n    getInput();\r\n\r\n    // Prep event listeners for submit\r\n    document.getElementById('editForm').addEventListener(\"submit\", submitChange);\r\n    // Prep event listeners for clicks on icons\r\n    document.getElementById('savedContainer').addEventListener('click', (e) => {\r\n        console.log('click');\r\n\r\n        cityId = e.target.closest('.savedPlaceContainer').id;\r\n        console.log(\"Test if loaded/clicked\", cityId)\r\n\r\n        // On EDIT\r\n        if (cityId && e.target.className.indexOf('edit') !== -1) {\r\n            console.log('Edit')\r\n            document.getElementById('editForm').style.display = \"block\";\r\n            //@TODO add current city name to inputfield   \r\n\r\n        } else if (cityId && e.target.className.indexOf('trash') !== -1) {\r\n            console.log('trash')\r\n        }\r\n\r\n    });\r\n}\r\n\r\nasync function getInput() {\r\n    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);\r\n    const dataGet = await response.json();\r\n\r\n    // @TODO Clear the current list\r\n    \r\n    console.log(\"Succes Get\", dataGet)\r\n    const containerSaved = document.getElementById('savedContainer');\r\n    containerSaved.innerHTML = \"\";\r\n    dataGet.forEach(saved => {\r\n        console.log(saved._id)\r\n        const savedString = `\r\n            <div id=\"${saved._id}\" class=\"savedPlaceContainer\">\r\n                <h2 id=\"savedInput\">${saved.input}</h2>\r\n                <div id=\"editDelete\">\r\n                    <button class=\"containerEdit\"><i class=\"fas fa-edit\"></i></button>\r\n                    <button class=\"containerDelete\"><i class=\"fas fa-trash-alt\"></i></button>\r\n                </div>\r\n            </div>`;\r\n        containerSaved.insertAdjacentHTML('beforeend', savedString);\r\n    });\r\n}\r\n\r\nfunction submitChange(event) {\r\n    event.preventDefault();\r\n    console.log('edit the city');\r\n    console.log(\"Test meegeven id\", cityId);\r\n\r\n    event.preventDefault();\r\n    let newCityName = document.getElementById('editCity').value;\r\n    console.log(newCityName)\r\n\r\n    let header = new Headers();\r\n    header.append(\"Content-Type\", \"application/json\");\r\n\r\n    fetch(`https://sterrenkijker.herokuapp.com/updateInput/:${cityId}`, {\r\n        method: 'PUT',\r\n        headers: header,\r\n        body: JSON.stringify({\r\n            input: newCityName\r\n        })\r\n    })\r\n    .then(response => response.json())\r\n    .then(dataPut =>{\r\n        console.log(\"Succes Update\", dataPut);\r\n        getInput()\r\n    })\r\n\r\n}\r\n\n\n//# sourceURL=webpack://web2-frontend-hanneloremaes/./src/savedInput.js?");

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