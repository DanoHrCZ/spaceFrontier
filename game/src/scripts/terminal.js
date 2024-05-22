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
        default:
            // Pokud příkaz není rozpoznán, zobrazit chybovou zprávu
            var error = document.createElement("p");
            error.textContent = "Neznámý příkaz.";
            error.classList.add("error");
            terminal.appendChild(error);
            break;
    }

    // Vymazání vstupu po vykonání příkazu
    document.getElementById("commandInput").value = "";
}

const setElectrolysisSpeed = (value) => {
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
    var message = document.createElement("p");
    message.textContent = "help - zobrazí veškeré příkazy | elektroliza 'hodnota' - nastaví rychlost elektrolýzy | generator 'hodnota' nastaví výkon generátoru | solarniPanely '+/-hodnota' nastaví natočení solárních panelů";
    terminal.appendChild(message);
}

const setHydrogenGeneratorPower = (value) => {
    if (value >= 0 && value <= maxSolarPanelPower) {
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
    if (value >= 0 && value <= maxSolarPanelPower) {
        solarPanelPower = value;
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
