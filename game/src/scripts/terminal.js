const executeCommand = () => {
    var input = document.getElementById("commandInput").value;
    var terminal = document.getElementById("terminal");
    var p = document.createElement("p");
    p.textContent = "> " + input;
    terminal.appendChild(p);

    // Rozdělení vstupu na příkaz a argument
    var parsedInput = input.split(" ");
    var command = parsedInput[0];
    var argument = parsedInput[1];

    // Rozlišení různých příkazů
    switch (command) {
        case "help":
            help();
            break;
        case "elektroliza":
            // Změna rychlosti elektrolýzy
            setElectrolysisSpeed(parseInt(argument));
            break;
        case "generator":
            // Změna výkonu vodíkového generátoru
            setHydrogenGeneratorPower(parseInt(argument));
            break;
        case "solarniPanely":
            // Změna natočení solárních panelů
            setSolarPanelAngle(parseInt(argument));
            break;
        case "pohon":
            // Změna výkonu vodíkového generátoru
            setEnginePower(parseInt(argument));
            break;
        default:
            // Pokud příkaz není rozpoznán, zobrazit chybovou zprávu
            var error = document.createElement("p");
            error.textContent = "Neznámý příkaz.";
            error.classList.add("error");
            terminal.appendChild(error);
            break;
    }
    energy -= 50;

    // Vymazání vstupu po vykonání příkazu
    document.getElementById("commandInput").value = "";
}

const setElectrolysisSpeed = (value) => {
    var terminal = document.getElementById("terminal");
    if (value >= 0 && value <= maxElectrolysisSpeed) {
        electrolysisSpeed = value;
        var message = document.createElement("p");
        message.textContent = "Rychlost elektrolýzy byla nastavena na: " + value;
        terminal.appendChild(message);
    } else {
        var error = document.createElement("p");
        error.textContent = "Zakázaná hodnota.";
        error.classList.add("error");
        terminal.appendChild(error);
    }
}

const help = () => {
    var terminal = document.getElementById("terminal");
    var message = document.createElement("p");
    message.textContent = "help - zobrazí veškeré příkazy | elektroliza 'hodnota' (0-10) - nastaví rychlost elektrolýzy | generator 'hodnota' (0-20) - nastaví výkon generátoru | solarniPanely 'hodnota' (0-360) - nastaví natočení solárních panelů | pohon 'hodnota' (0-20) - nastaví výkon pohon";
    terminal.appendChild(message);
}

const setHydrogenGeneratorPower = (value) => {
    var terminal = document.getElementById("terminal");
    if (value >= 0 && value <= maxHydrogenGeneratorPower) {
        hydrogenGeneratorPower = value;
        var message = document.createElement("p");
        message.textContent = "Výkon vodíkového generátoru byl nastaven na: " + value;
        terminal.appendChild(message);
    } else {
        var error = document.createElement("p");
        error.textContent = "Zakázaná hodnota.";
        error.classList.add("error");
        terminal.appendChild(error);
    }
}

const setSolarPanelAngle = (value) => {
    var terminal = document.getElementById("terminal");
    if (value >= 0 && value <= 360) {
        solarPanelAngle = value;
        var message = document.createElement("p");
        message.textContent = "Natočení solárních panelů bylo nastaveno na: " + value;
        terminal.appendChild(message);
    } else {
        var error = document.createElement("p");
        error.textContent = "Zakázaná hodnota.";
        error.classList.add("error");
        terminal.appendChild(error);
    }
    
}
const setEnginePower = (value) => {
    var terminal = document.getElementById("terminal");
    if (value >= 0 && value <= maxHydrogenEngineConsumption) {
        hydrogenEngineConsumption = value;
        var message = document.createElement("p");
        message.textContent = "Výkon vodíkového pohonu byl nastaven na: " + value;
        terminal.appendChild(message);
    } else {
        var error = document.createElement("p");
        error.textContent = "Zakázaná hodnota.";
        error.classList.add("error");
        terminal.appendChild(error);
    }
}