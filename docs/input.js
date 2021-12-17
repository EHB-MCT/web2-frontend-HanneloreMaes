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

eval("let cityId;\r\n\r\nwindow.onload = function () {\r\n    console.log('loaded');\r\n    getInput();\r\n\r\n\r\n    // Prep event listeners for submit\r\n    document.getElementById('editForm').addEventListener(\"submit\", submitChange);\r\n    // Prep event listeners for clicks on icons\r\n    document.getElementById('savedContainer').addEventListener('click', (e) => {\r\n        console.log('click');\r\n\r\n        cityId = e.target.closest('.savedPlaceContainer').id;\r\n        console.log(\"Test if loaded/clicked\", cityId)\r\n\r\n        // Voor edit\r\n        if (cityId && e.target.className.indexOf('edit') !== -1) {\r\n            console.log('Edit')\r\n            document.getElementById('editForm').style.display = \"block\";\r\n        } \r\n\r\n        // Voor delete\r\n        if (cityId && e.target.className.indexOf('trash') !== -1) {\r\n            console.log('trash')\r\n            deleteFun()\r\n        }\r\n\r\n    });\r\n}\r\n\r\nasync function getInput() {\r\n    const response = await fetch(`https://sterrenkijker.herokuapp.com/inputPlace`);\r\n    const dataGet = await response.json();\r\n\r\n    // @TODO Clear the current list\r\n    \r\n    console.log(\"Succes Get\", dataGet)\r\n    const containerSaved = document.getElementById('savedContainer');\r\n    containerSaved.innerHTML = \"\";\r\n    dataGet.forEach(saved => {\r\n        console.log(saved._id)\r\n        const savedString = `\r\n            <div id=\"${saved._id}\" class=\"savedPlaceContainer\">\r\n                <h2 id=\"savedInput\">${saved.input}</h2>\r\n                <div id=\"editDelete\">\r\n                    <button id=\"edit\" class=\"containerEdit\" value =\"${saved._id}\"><i class=\"fas fa-edit\"></i></button>\r\n                    <button id = \"delete\" class=\"containerDelete\" value =\"${saved._id}\"><i class=\"fas fa-trash-alt\"></i></button>\r\n                </div>\r\n            </div>`;\r\n        containerSaved.insertAdjacentHTML('beforeend', savedString);\r\n    });\r\n\r\n}\r\n\r\nfunction submitChange(e) {\r\n    e.preventDefault();\r\n    console.log('edit the city');\r\n    console.log(\"Test meegeven id\", cityId);\r\n    let newCity = document.getElementById('editCity').value\r\n    console.log(newCity);\r\n\r\n    fetch(`https://sterrenkijker.herokuapp.com/updateInput/${cityId}/${newCity}`, {\r\n        method: 'PUT',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n        },\r\n    })\r\n    .then(response => response.json())\r\n    .then(dataPut => {\r\n        console.log('New update is made', dataPut);\r\n        document.getElementById('editForm').style.display = \"none\";\r\n        getInput();\r\n    });\r\n\r\n}\r\n\r\nfunction deleteFun(){\r\n    fetch(`https://sterrenkijker.herokuapp.com/deleteInput/${cityId}`, {\r\n        method: 'DELETE'\r\n    })\r\n    .then(response => response.json())\r\n    .then(dataDel => {\r\n        console.log('deleted id', dataDel);\r\n        getInput();\r\n    });\r\n}\n\n//# sourceURL=webpack://web2-frontend-hanneloremaes/./src/savedInput.js?");

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