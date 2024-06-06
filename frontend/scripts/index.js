// Funkce pro získání aktuálního data
function zobrazDatum() {
    // Vytvoření nového objektu Date pro aktuální datum a čas
    var dnes = new Date();

    // Získání jednotlivých částí data
    var den = dnes.getDate(); // Den 
    var mesic = dnes.getMonth() + 1; // Měsíc
    var rok = dnes.getFullYear(); // Rok 

    //Datum
    var formatovaneDatum = den + "." + mesic + "." + rok;

    // Výpis data do elementu s id "datum"
    document.getElementById("datum").innerText = formatovaneDatum;
    console.log(formatovaneDatum)
}

// Zavolání funkce pro okamžité zobrazení data
zobrazDatum();
