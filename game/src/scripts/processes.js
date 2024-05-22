// Proměnné pro simulaci
let energy = 1000;
let maxEnergy = 1000;
let water = 1000;
let maxWater = 1000;
let hydrogen = 1000;
let maxHydrogen = 1000;
let oxygen = 1000;
let maxOxygen = 1000;
let electrolysisSpeed = 10;
let maxElectrolysisSpeed = 10;
let solarPaneleEfficiency = 10;
let maxSolarPanelPower = 100;
let hydrogenGeneratorPower = 0;
let maxHydrogenGeneratorPower = 50;
let lifeSupportConsumption = 5; // Spotřeba vody, kyslíku a energie systémem podpory života

// Simulace jednotlivých procesů na lodi v každém časovém kroku
const simulateProcesses = () => {
    // Zavolejme funkci pro inicializaci bary na začátku
    updateBars();

    // Získání energie ze solárních panelů
    energy += solarPanelPower;
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
        water -= hydrogenProduction + oxygenProduction;
        energy -= (hydrogenProduction + oxygenProduction) * 3; // Snížíme množství energie spotřebované elektrolýzou
        if (hydrogen > maxHydrogen) {
            hydrogen = maxHydrogen;
        }
        if (oxygen > maxOxygen) {
            oxygen = maxOxygen;
        }
    }

    // Pohon lodi
    hydrogen -= hydrogenEngineConsumption;

    // Simulace vodíkového generátoru
    let hydrogenGeneration = hydrogenGeneratorPower;
    if (hydrogen + hydrogenGeneration <= maxHydrogen) {
        hydrogen += hydrogenGeneration;
        energy += hydrogenGeneration; // Snížíme množství energie spotřebované vodíkovým generátorem
    }

    // Simulace systému podpory života
    oxygen -= lifeSupportConsumption;
    energy -= lifeSupportConsumption * 10;

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

    // Výpis aktuálního stavu zásob do konzole
    console.log("Aktuální stav zásob:");
    console.log("Energie:", energy);
    console.log("Voda:", water);
    console.log("Vodík:", hydrogen);
    console.log("Kyslík:", oxygen);
}

// Funkce pro aktualizaci šířky výplně bary podle hodnot proměnných
const updateBars = () => {
    document.getElementById("energyFill").style.width = (energy / maxEnergy) * 100 + "%";
    document.getElementById("waterFill").style.width = (water / maxWater) * 100 + "%";
    document.getElementById("hydrogenFill").style.width = (hydrogen / maxHydrogen) * 100 + "%";
    document.getElementById("oxygenFill").style.width = (oxygen / maxOxygen) * 100 + "%";
}

// Funkce pro spuštění simulace po kliknutí na tlačítko "Začít"
const startSimulation = () => {
    setInterval(simulateProcesses, 1000); // Každá sekunda
}