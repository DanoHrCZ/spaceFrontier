var i = 0; //startovní pozice
var obrazky = [];//prázdný list
var cas = 3000;//rychlost přepínání obrázků

//obrázky 
obrazky[0] = "../media/img1.jpg";
obrazky[1] = "../media/img2.jpg";
obrazky[2] = "../media/img3.jpg";

//Prechod na dalsi obrazek
function zmenaObrazku(){
    document.slide.src = obrazky[i];

    if(i < obrazky.length -1){
        i++;
    } else {
        i = 0
    }
    setTimeout("zmenaObrazku()", cas)
}

window.onload = zmenaObrazku;