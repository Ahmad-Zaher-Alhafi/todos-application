const content = document.querySelector(".content");
const mealsNum = 10;

function loadPage() {
    const menuContent = document.createElement("div");
    menuContent.setAttribute("class", "menuContent");
    content.appendChild(menuContent);

    function createMeal(imgSrc) {
        const mealDiv = document.createElement("div");
        mealDiv.setAttribute("class", "meal");
        menuContent.appendChild(mealDiv);

        const img = document.createElement("img");
        img.setAttribute("class", "mealImg");
        img.src = imgSrc;
        mealDiv.appendChild(img);

        const name = document.createElement("div");
        name.textContent = "Meal name";
        mealDiv.appendChild(name);

        const desc = document.createElement("div");
        desc.textContent = "Meal desc";
        mealDiv.appendChild(desc);
    }

    for (let index = 0; index < mealsNum; index++) {
        createMeal("https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg");
    }

    content.appendChild(menuContent);
}

export { loadPage };