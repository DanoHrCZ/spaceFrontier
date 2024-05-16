document.addEventListener("DOMContentLoaded", function () {
    // Najdeme tlačítko "START"
    var startButton = document.querySelector(".start");
    // Najdeme prvky s třídou "menuScene" a "mainScene"
    var menuScene = document.querySelector(".menuScene");
    var mainScene = document.querySelector(".mainScene");

    // Přidáme posluchač události pro kliknutí na tlačítko "START"
    startButton.addEventListener("click", function () {
        // Odebereme třídu "current" z prvku s třídou "menuScene"
        menuScene.classList.remove("current");
        // Přidáme třídu "current" k prvku s třídou "mainScene"
        mainScene.classList.add("current");
    });
});

const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        executeCommand();
    }
}
