const content = document.querySelector(".content");

function loadPage() {
    const aboutContent = document.createElement("div");
    aboutContent.setAttribute("class", "aboutContent");
    content.appendChild(aboutContent);

    const about = document.createElement("div");
    about.textContent = "Restorant's info";
    aboutContent.appendChild(about);
}

export { loadPage };