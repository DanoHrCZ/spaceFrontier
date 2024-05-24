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
    energy -= lifeSupportConsumption * 8;
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
    { name: "Příliv energie", effect: 150, type: "positive" },
    { name: "Oprava solárních panelů", effect: 30, type: "positive" },
    { name: "Krize s vodou", effect: -80, type: "negative" },
    { name: "Únik vodíku", effect: -30, type: "negative" },
    { name: "Výbuch motoru", effect: -100, type: "negative" },
    { name: "Záření z hvězdy", effect: -50, type: "negative" },
    { name: "Elektromagnetická bouře", effect: -70, type: "negative" },
    { name: "Nalezení nové planety", effect: 80, type: "positive" },
    { name: "Výskyt meteorického roje", effect: -50, type: "negative" },
    { name: "Vylepšení elektrolýzy", effect: 20, type: "positive" },
    { name: "Zjištění poruchy solárních panelů", effect: -20, type: "negative" },
    { name: "Nárazník s meteoritem", effect: -80, type: "negative" },
    { name: "Záření gama", effect: -100, type: "negative" },
    { name: "Oprava generátoru", effect: 30, type: "positive" },
    { name: "Zlepšení výkonu pohonu", effect: 10, type: "positive" },
    { name: "Vyčerpání ložisek vody", effect: -50, type: "negative" },
    { name: "Náhodné zjištění výchozího kódu", effect: 100, type: "positive" },
    { name: "Snížení spotřeby kyslíku", effect: 10, type: "positive" },
    { name: "Ztráta spojení s mateřskou lodí", effect: -150, type: "negative" },
    { name: "Nalezení nové zásobárny vody", effect: 60, type: "positive" },
];

const applyPositiveEvent = (event) => {
    let message = `Pozitivní událost: ${event.name} (+${event.effect})`;
    switch (event.name) {
        case "Příliv energie":
            energy += event.effect;
            break;
        case "Oprava solárních panelů":
            solarPanelEfficiency = calculateSolarPanelEfficiency(sun, solarPanelAngle);
            break;
        case "Nalezení nové planety":
            progressEnd += event.effect;
            break;
        case "Vylepšení elektrolýzy":
            electrolysisSpeed += event.effect;
            break;
        case "Oprava generátoru":
            hydrogenGeneratorPower += event.effect;
            break;
        case "Zlepšení výkonu pohonu":
            hydrogenEngineConsumption += event.effect;
            break;
        case "Náhodné zjištění výchozího kódu":
            progress += event.effect;
            break;
        case "Snížení spotřeby kyslíku":
            lifeSupportConsumption -= event.effect;
            break;
        case "Nalezení nové zásobárny vody":
            water += event.effect;
            break;
        default:
            console.log("Neznámá pozitivní událost.");
            message = "Neznámá pozitivní událost.";
    }
    showAlert(message, "green");
}

const applyNegativeEvent = (event) => {
    let message = `Negativní událost: ${event.name} (${event.effect})`;
    switch (event.name) {
        case "Krize s vodou":
            water += event.effect;
            break;
        case "Únik vodíku":
            hydrogen -= event.effect;
            break;
        case "Výbuch motoru":
            progress -= event.effect;
            break;
        case "Záření z hvězdy":
        case "Elektromagnetická bouře":
        case "Záření gama":
            energy -= event.effect;
            break;
        case "Výskyt meteorického roje":
        case "Nárazník s meteoritem":
            progress -= event.effect;
            break;
        case "Zjištění poruchy solárních panelů":
            solarPanelEfficiency = 0.0;
            break;
        case "Vyčerpání ložisek vody":
            water -= event.effect;
            break;
        case "Ztráta spojení s mateřskou lodí":
            progress -= event.effect;
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
