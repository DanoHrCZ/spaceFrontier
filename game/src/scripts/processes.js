// Proměnné pro simulaci
let energy = 1000;
let maxEnergy = 1000;
let water = 1000;
let maxWater = 1000;
let hydrogen = 1000;
let maxHydrogen = 1000;
let oxygen = 1000;
let maxOxygen = 1000;

let sun = getRandomInt(360);
let sunMax = 360;

let electrolysisSpeed = 0;
let maxElectrolysisSpeed = 10;

let solarPanelAngle = 180; // Úhel solárního panelu
let solarPanelEfficiency = 0.0;
let solarPanelPower = 50;

let hydrogenGeneratorPower = 0;
let maxHydrogenGeneratorPower = 20;

let lifeSupportConsumption = 2; // Spotřeba vody, kyslíku a energie systémem podpory života

let hydrogenEngineConsumption = 0;
let maxHydrogenEngineConsumption = 20;

let progress = 0;
let progressEnd = 1000;

// Definice funkce getRandomInt
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Funkce pro výpočet efektivity solárních panelů
function calculateSolarPanelEfficiency(sun, panelAngle) {
    let angleDifference = Math.abs(sun - panelAngle);
    if (angleDifference > 180) {
        angleDifference = 360 - angleDifference;
    }
    if (angleDifference <= 10) {
        return 1.0; // Maximální efektivita
    } else if (angleDifference <= 30) {
        return 0.8; // Vysoká efektivita
    } else if (angleDifference <= 60) {
        return 0.5; // Střední efektivita
    } else {
        return 0.2; // Nízká efektivita
    }
}

// Simulace jednotlivých procesů na lodi v každém časovém kroku
const simulateProcesses = () => {
    // Zavolejme funkci pro inicializaci bary na začátku
    updateBars();

    // Slunce
    if (sun >= sunMax) {
        sun = 0;
    } else {
        sun += 1;
    }

    // Výpočet efektivity solárních panelů
    solarPanelEfficiency = calculateSolarPanelEfficiency(sun, solarPanelAngle);

    // Pohon lodi - pokud je dostatek vodíku
    if (hydrogen >= hydrogenEngineConsumption) {
        hydrogen -= hydrogenEngineConsumption * hydrogenEngineConsumption / 10;
        progress += hydrogenEngineConsumption;
    } else {
        // Zastavení pohonu lodi, pokud není dostatek vodíku
        progress -= hydrogenEngineConsumption; // Odpocitavamem preskakování
        progress -= 2
    }
    // Progress
    if (progress > progressEnd) {
        progress = progressEnd;
    }
    if (progressEnd == progress) {
        getEvent();
        progress = 0;
    }

    // Získání energie ze solárních panelů
    energy += solarPanelPower * solarPanelEfficiency; // energy
    if (energy > maxEnergy) {
        energy = maxEnergy;
    }

    // Elektrolýza vody na vodík a kyslík - pouze pokud máme dostatek energie
    let hydrogenProduction = 0;
    let oxygenProduction = 0;
    if (water > 0 && energy > 0) {
        hydrogenProduction = Math.min(electrolysisSpeed * 2, water);
        oxygenProduction = Math.min(electrolysisSpeed, water);
        hydrogen += hydrogenProduction;
        oxygen += oxygenProduction;
        water -= (hydrogenProduction + oxygenProduction);
        energy -= (hydrogenProduction + oxygenProduction) * (hydrogenProduction + oxygenProduction) / 10; // Snížíme množství energie spotřebované elektrolýzou
        if (hydrogen > maxHydrogen) {
            hydrogen = maxHydrogen;
        }
        if (oxygen > maxOxygen) {
            oxygen = maxOxygen;
        }
    }

    // Simulace vodíkového generátoru
    if (energy + hydrogenGeneratorPower <= maxEnergy) {
        hydrogen -= hydrogenGeneratorPower * hydrogenGeneratorPower / 10;
        energy += hydrogenGeneratorPower;
    }

    // Simulace systému podpory života
    oxygen -= lifeSupportConsumption;
    energy -= lifeSupportConsumption * 2;
    water -= lifeSupportConsumption;

    // Aktualizace stavu zásob v případě, že jsou mimo rozsah
    if (hydrogen < 0) {
        hydrogen = 0;
    }
    if (water < 0) {
        water = 0;
    }
    if (oxygen < 0) {
        oxygen = 0;
    }
    if (energy < 0) {
        energy = 0;
    }

    //konec hry
    if (energy == 0 || water == 0 || oxygen == 0) {
        gameOver();
    }

    // Výpis aktuálního stavu zásob do konzole
    console.log("Aktuální stav zásob:");
    console.log("Energie:", energy);
    console.log("Voda:", water);
    console.log("Vodík:", hydrogen);
    console.log("Kyslík:", oxygen);
    console.log("Rychlost elektrolýzy:", electrolysisSpeed);
    console.log("Výkon generátoru:", hydrogenGeneratorPower);
    console.log("Výkon pohonu:", hydrogenEngineConsumption);
    console.log("Výkon solárních panelů:", solarPanelPower);
    console.log("Efektivita solárních panelů:", solarPanelEfficiency);

    // Aktualizace hodnot v HTML
    updateText();
}

// Funkce pro aktualizaci šířky výplně bary podle hodnot proměnných
const updateBars = () => {
    document.getElementById("progressFill").style.height = (progress / progressEnd) * 100 + "%";

    document.getElementById("energyFill").style.width = (energy / maxEnergy) * 100 + "%";
    document.getElementById("waterFill").style.width = (water / maxWater) * 100 + "%";
    document.getElementById("hydrogenFill").style.width = (hydrogen / maxHydrogen) * 100 + "%";
    document.getElementById("oxygenFill").style.width = (oxygen / maxOxygen) * 100 + "%";
    document.getElementById("electrolysisSpeedFill").style.width = (electrolysisSpeed / maxElectrolysisSpeed) * 100 + "%";
    document.getElementById("generatorPowerFill").style.width = (hydrogenGeneratorPower / maxHydrogenGeneratorPower) * 100 + "%";
    document.getElementById("enginePowerFill").style.width = (hydrogenEngineConsumption / maxHydrogenEngineConsumption) * 100 + "%";
    document.getElementById("solarPanelEfficiencyFill").style.width = (solarPanelEfficiency * 100) + "%";
}

// Funkce pro aktualizaci textových hodnot
const updateText = () => {
    document.getElementById("energyText").textContent = `${(energy / maxEnergy * 100).toFixed(2)}%`;
    document.getElementById("waterText").textContent = `${(water / maxWater * 100).toFixed(2)}%`;
    document.getElementById("hydrogenText").textContent = `${(hydrogen / maxHydrogen * 100).toFixed(2)}%`;
    document.getElementById("oxygenText").textContent = `${(oxygen / maxOxygen * 100).toFixed(2)}%`;
    document.getElementById("electrolysisSpeedText").textContent = `${electrolysisSpeed}`;
    document.getElementById("generatorPowerText").textContent = `${hydrogenGeneratorPower}`;
    document.getElementById("enginePowerText").textContent = `${hydrogenEngineConsumption}`;
    document.getElementById("solarPanelEfficiencyText").textContent = `${(solarPanelEfficiency * 100).toFixed(2)}%`;
}

const events = [
    { id: "1", name: "Procháel jsi loď a nelzl jsi záložní nádrže z vodou.", effect: 300, type: "positive" },
    { id: "2", name: "Procháel jsi loď a nelzl jsi záložní nádrže z vodou.", effect: 405, type: "positive" },
    { id: "3", name: "Procháel jsi loď a nelzl jsi záložní nádrže z vodou.", effect: 150, type: "positive" },
    { id: "4", name: "Procháel jsi loď a nelzl jsi záložní nádrže z vodou.", effect: 95, type: "positive" },
    { id: "5", name: "Byly poškozeny baterie. Snížena kapacita energie..", effect: 100, type: "negative" },
    { id: "6", name: "Byly poškozeny nádrže vodíku. Snížena kapacita energie..", effect: 100, type: "negative" }
];

const applyPositiveEvent = (event) => {
    let message = `Pozitivní událost: ${event.name} (+${event.effect})`;
    switch (event.id) {
        case "1":
        case "2":
        case "3":
        case "4":
            water = Math.min(water + event.effect, maxWater);
            break;
        default:
            console.log("Neznámá pozitivní událost.");
            message = "Neznámá pozitivní událost.";
    }
    showAlert(message, "green");
}

const applyNegativeEvent = (event) => {
    let message = `Negativní událost: ${event.name} (${event.effect})`;
    switch (event.id) {
        case "5":
            maxEnergy = Math.max(maxEnergy + event.effect, 0);
            if (energy > maxEnergy) {
                energy = maxEnergy;
            }
            break;
        case "6":
            maxHydrogen = Math.max(maxHydrogen + event.effect, 0);
            if (hydrogen > maxHydrogen) {
                hydrogen = maxHydrogen;
            }
            break;
        default:
            console.log("Neznámá negativní událost.");
            message = "Neznámá negativní událost.";
    }
    showAlert(message, "red");
}

const getEvent = () => {
    const event = events[getRandomInt(events.length)];
    if (event.type === "positive") {
        applyPositiveEvent(event);
    } else {
        applyNegativeEvent(event);
    }
}

// Funkce pro zobrazení alertu
const showAlert = (message, color) => {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.style.backgroundColor = color;
    alertDiv.textContent = message;

    const alertsContainer = document.getElementById("alerts");
    alertsContainer.appendChild(alertDiv);

    // Odstraníme alert po 5 sekundách
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}


const gameOver = () => {
    clearInterval(clock);
    document.querySelector(".mainScene").classList.remove("current");
    document.querySelector(".gameOverScene").classList.add("current");
}

// Funkce pro spuštění simulace po kliknutí na tlačítko "Začít"
const startSimulation = () => {
    clock = setInterval(simulateProcesses, 1000); // Každá sekunda
}
