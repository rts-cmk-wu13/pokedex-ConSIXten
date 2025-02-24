let search = window.location.search;
let params = new URLSearchParams(search);
let pokeName = params.get("pokemon");


let sectionElm = document.createElement("section");
sectionElm.className = "pokelist";

fetch("https://pokeapi.co/api/v2/pokemon/"+pokeName)
    .then(response => response.json())
    .then(pokemon => {
        sectionElm.innerHTML = `
        <div>
            <h1> ${pokemon.name} </h1>
            <p>#${pokemon.id.toString().padStart(4, "0")}</p>
        </div>
                <article class="card__pokemon">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                    ${pokemon.stats.map(stat => `
                        <p>${stat.stat.name}: ${stat.base_stat}</p>
                    `).join("")}
                </article>
            </a>
        `
    });

document.querySelector("main").append(sectionElm);
