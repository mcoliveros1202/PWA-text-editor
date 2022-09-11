/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/database.js":
/*!****************************!*\
  !*** ./src/js/database.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getDb\": () => (/* binding */ getDb),\n/* harmony export */   \"putDb\": () => (/* binding */ putDb)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'idb'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\nconst initdb = async () =>\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'idb'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('jate', 1, {\n    upgrade(db) {\n      if (db.objectStoreNames.contains('jate')) {\n        console.log('jate database already exists');\n        return;\n      }\n      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });\n      console.log('jate database created');\n    },\n  });\n\n// TODO: Add logic to a method that accepts some content and adds it to the database\nconst putDb = async (content) => console.error('putDb not implemented');\n\n// TODO: Add logic for a method that gets all the content from the database\nconst getDb = async () => console.error('getDb not implemented');\n\ninitdb();\n\n//# sourceURL=webpack://pwa-text-editor/./src/js/database.js?");

/***/ }),

/***/ "./src/js/editor.js":
/*!**************************!*\
  !*** ./src/js/editor.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ \"./src/js/database.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ \"./src/js/header.js\");\n// Import methods to save and get data from the indexedDB database in './database.js'\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {\n  constructor() {\n    const localData = localStorage.getItem('content');\n\n    // check if CodeMirror is loaded\n    if (typeof CodeMirror === 'undefined') {\n      throw new Error('CodeMirror is not loaded');\n    }\n\n    this.editor = CodeMirror(document.querySelector('#main'), {\n      value: '',\n      mode: 'javascript',\n      theme: 'monokai',\n      lineNumbers: true,\n      lineWrapping: true,\n      autofocus: true,\n      indentUnit: 2,\n      tabSize: 2,\n    });\n\n    // When the editor is ready, set the value to whatever is stored in indexeddb.\n    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.\n    (0,_database__WEBPACK_IMPORTED_MODULE_0__.getDb)().then((data) => {\n      console.info('Loaded data from IndexedDB, injecting into editor');\n      this.editor.setValue(data || localData || _header__WEBPACK_IMPORTED_MODULE_1__.header);\n    });\n\n    this.editor.on('change', () => {\n      localStorage.setItem('content', this.editor.getValue());\n    });\n\n    // Save the content of the editor when the editor itself is loses focus\n    this.editor.on('blur', () => {\n      console.log('The editor has lost focus');\n      (0,_database__WEBPACK_IMPORTED_MODULE_0__.putDb)(localStorage.getItem('content'));\n    });\n  }\n});\n\n//# sourceURL=webpack://pwa-text-editor/./src/js/editor.js?");

/***/ }),

/***/ "./src/js/header.js":
/*!**************************!*\
  !*** ./src/js/header.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"header\": () => (/* binding */ header)\n/* harmony export */ });\nconst header = `\n/*\n       _____  ____________\n      / /   |/_  __/ ____/\n __  / / /| | / / / __/   \n/ /_/ / ___ |/ / / /___   \n ____/_/  |_/_/ /_____/   \njust another text editor\n*/                          \n`;\n\n\n\n//# sourceURL=webpack://pwa-text-editor/./src/js/header.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'workbox-window'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ \"./src/js/editor.js\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database */ \"./src/js/database.js\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '../css/style.css'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\n\n\n\nconst main = document.querySelector('#main');\nmain.innerHTML = '';\n\nconst loadSpinner = () => {\n  const spinner = document.createElement('div');\n  spinner.classList.add('spinner');\n  spinner.innerHTML = `\n  <div class=\"loading-container\">\n  <div class=\"loading-spinner\" />\n  </div>\n  `;\n  main.appendChild(spinner);\n};\n\nconst editor = new _editor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\nif (typeof editor === 'undefined') {\n  loadSpinner();\n}\n\n// Check if service workers are supported\nif ('serviceWorker' in navigator) {\n  // register workbox service worker\n  const workboxSW = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'workbox-window'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('/src-sw.js');\n  workboxSW.register();\n} else {\n  console.error('Service workers are not supported in this browser.');\n}\n\n//# sourceURL=webpack://pwa-text-editor/./src/js/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;