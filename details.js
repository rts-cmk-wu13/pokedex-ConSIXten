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
                <article class="card__details">
                    <figure>
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                    </figure>       
                    ${pokemon.stats.map(stat => `
                <div class="full-width">
                     <label for="${stat.stat.name}">${stat.stat.name}</label>
                     <span>${stat.base_stat}</span>
                     <meter id="${stat.stat.name}" value="${stat.base_stat}" min="0" max="255"></meter>
                 </div>
                    `).join("")}
                </article>
        `
    });

document.querySelector("main").append(sectionElm);
