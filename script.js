const output = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const terminalElement = document.getElementById('terminal');

let isLocked = true;
const welcomeMessage = "Welcome to my personal site";
let i = 0;

function typeWriter() {
    if (i < welcomeMessage.length) {
        output.innerHTML += welcomeMessage.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    } else {
        isLocked = false;
    }
}

function eraseOutput() {
    isLocked = true;
    const text = output.innerHTML;
    if (text.length > 0) {
        output.innerHTML = text.slice(0, -1);
        setTimeout(eraseOutput, 10);
    } else {
        isLocked = false;
    }
}

function processCommand(command) {
    output.innerHTML += `\n> ${command}\n`;
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
        case 'help':
            output.innerHTML += 'Available commands: help, clear, date, echo, whoami';
            break;
        case 'clear':
            eraseOutput();
            return;
        case 'date':
            output.innerHTML += new Date().toString();
            break;
        case 'echo':
            output.innerHTML += args.join(' ');
            break;
        case 'whoami':
            output.innerHTML += 'guest';
            break;
        default:
            output.innerHTML += `Command not found: ${command}`;
            break;
    }
    output.innerHTML += '\n';
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isLocked) {
        const command = commandInput.value;
        commandInput.value = '';
        processCommand(command);
        terminalElement.scrollTop = terminalElement.scrollHeight;
    }
});

terminalElement.addEventListener('click', () => {
    commandInput.focus();
});

typeWriter();