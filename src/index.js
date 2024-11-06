import "./styles.css";
import * as homePage from "./homePage.js";
import * as menuPage from "./menu.js";
import * as aboutPage from "./about.js";

const content = document.querySelector(".content");
const homeButton = document.querySelector(".homeButton");
const menuButton = document.querySelector(".menuButton");
const aboutButton = document.querySelector(".aboutButton");

homeButton.addEventListener("click", loadHomePage);
menuButton.addEventListener("click", loadMenuPage);
aboutButton.addEventListener("click", loadAboutPage);


function loadHomePage() {
    clearContent();
    homePage.loadPage();
}

function loadMenuPage() {
    clearContent();
    menuPage.loadPage();
}

function loadAboutPage() {
    clearContent();
    aboutPage.loadPage();
}

function clearContent() {
    content.replaceChildren();
}

loadMenuPage();

