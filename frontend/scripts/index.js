// Funkce pro získání aktuálního data a jeho formátování
function zobrazDatum() {
    // Vytvoření nového objektu Date pro aktuální datum a čas
    var dnes = new Date();

    // Získání jednotlivých částí data
    var den = dnes.getDate(); // Den v měsíci (1-31)
    var mesic = dnes.getMonth() + 1; // Měsíc (0-11), proto přičítáme 1
    var rok = dnes.getFullYear(); // Rok (čtyřciferný)

    // Formátování data do požadovaného formátu (den.měsíc.rok)
    var formatovaneDatum = den + "." + mesic + "." + rok;

    // Výpis data do elementu s id "datum"
    document.getElementById("datum").innerText = formatovaneDatum;
    console.log(formatovaneDatum)
}

// Zavolání funkce pro okamžité zobrazení data
zobrazDatum();
