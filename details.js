let search = window.location.search;
let params = new URLSearchParams(search);
let pokeName = params.get("pokemon");

let sectionElm = document.createElement("section");
sectionElm.className = "pokelist__details";


fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName)
    .then(response => response.json())
    .then(pokemon => {
        console.log(pokemon);

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
            .then(response => response.json())
            .then(species => {
                // Find the first English flavor text
                let flavorTextEntry = species.flavor_text_entries.find(entry => entry.language.name === "en");
                let flavorText = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.";


                sectionElm.innerHTML = `
                <div class="details__card no-columns" >
                <div>
                    <h1>${pokemon.name}</h1>
                    <p>#${pokemon.id.toString().padStart(4, "0")}</p>
                </div>
                <article class="details">
                    <div class="details__img--flexbox">
                        <figure>
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                        </figure> 
                    </div>
                    <div>
                        <span>${pokemon.types.map(type => type.type.name).join(", ")}</span>
                    </div>
                    <div class="details__info">
                        <div>
                            <img src="" alt="">
                            <p>${pokemon.weight}kg</p>
                            <span class="details__info--gray"><p>Weight</p></span>
                        </div>
                        <div>
                            <p>${pokemon.height}m</p>
                            <span class="details__info--gray"><p>Height</p></span>
                        </div>
                        <div>
                            <p>${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
                            <span class="details__info--gray"><p>Moves</p></span>
                        </div>
                    </div>
                    <div>
                        <p class="details__flavor-text">${flavorText}</p>
                    </div>
                    <h2 class="details__stats--headline">Base Stats</h2>
                    ${pokemon.stats.map(stat => `
                        <div class="full-width no-columns">
                            <label for="${stat.stat.name}">${stat.stat.name}</label>
                            <span>${stat.base_stat}</span>
                            <meter class="details__stats" id="${stat.stat.name}" value="${stat.base_stat}" min="0" max="255"></meter>
                        </div>
                    `).join("")}
                </article>
                </div>
                `;
            });
    });

document.querySelector("main").append(sectionElm);
