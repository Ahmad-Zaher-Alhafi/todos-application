const content = document.querySelector(".content");

function loadPage() {
    const homeContent = document.createElement("div");
    homeContent.setAttribute("class", "homeContent");

    const img = document.createElement("img");
    img.setAttribute("class", "restaurantImg");
    img.src = "https://mudavim.net/wp-content/uploads/2023/04/serica-restaurant-scaled-e1699125342295.jpeg";
    homeContent.appendChild(img);

    const heading = document.createElement("h1");
    heading.textContent = "Welcome to Alhafi's restaurant";
    homeContent.appendChild(heading);

    const desc = document.createElement("p");
    desc.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consequatur laborum, quos in neque consectetur quod voluptas corrupti ipsam enim eligendi quibusdam, quis labore, expedita quas. Atque aspernatur ex dolorum.";
    homeContent.appendChild(desc);

    content.appendChild(homeContent);
}

export { loadPage };