// document element - console-canvas
export var consoleMem = new Array();
export var times_clicked = 0;
export var consoleFocused = false;
export function setConsoleFocused(value) {
    consoleFocused = value;
}


// Event listeners
function onClick() {
    // Focus on clicked canvas
    consoleFocused = true;
}

(() => {
    var consoleCanvas = document.getElementById('console-canvas');

    // Render loop for console

    // Adding on click event listener
    consoleCanvas.addEventListener('click', onClick, false);
})();
