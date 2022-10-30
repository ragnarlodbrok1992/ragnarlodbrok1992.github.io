import * as helper from "./canvas-console/helper-functions.js";
import * as canvasConsole from "./canvas-console/canvas-console.js";

// Global variables
const main_content_file = './content/main.txt';

// Sort of main of javascript file
(async () => {
    fetch(main_content_file)
        .then((response) => {
            return response.text();
        })
        .then((string) => {
            // Main
            var consoleCanvas = document.getElementById('console-canvas');
            var context2d = consoleCanvas.getContext('2d');
            
            // DEBUG - got string?
            console.log("I got string from file here: ", string);

            // Write string of site
            console.log("Before writing string");
            canvasConsole.write_string(context2d, string);
            console.log("After writing string");

            // Write prompt after
            console.log("Before setting prompt");
            canvasConsole.set_prompt("main");
            console.log("After setting prompt");
        });
})();