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
            
            // TODO: for now we render debug context for multiline rendering
            // This stuff here is disabled
            // Write information about site inside console context
            // canvasConsole.write_string(context2d, string);

            // Write prompt after
            // canvasConsole.set_prompt("main");
        });
})();