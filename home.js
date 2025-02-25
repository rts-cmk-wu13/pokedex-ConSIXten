/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

let navElm = document.createElement("nav");
navElm.className = "navigation";
navElm.innerHTML = `
    <div>
   <a href=""><img class="navigation__icon" src="pokeball.svg" alt=""></a>
        <h1>Pokédex</h1>
    </div>
    <div>
        <input class="navigation__input" type="search" name="" id="" placeholder="Search . . .">
        <button class="navigation__btn">Search</button>
    </div>
`;
document.querySelector("header").append(navElm);


// Create the section element
let sectionElm = document.createElement("section");
sectionElm.className = "pokelist";

fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
        sectionElm.innerHTML = data.results.map(pokemon => `
            <a href="details.html?pokemon=${pokemon.name}" class="card__pokemon--link">
                <article class="card__pokemon">
                    <p>#${getIdFromPokemon(pokemon.url).padStart(4, "0")}</p>
                    <figure class="card__pokemon--img">
                    <img src="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" alt="${pokemon.name}">
                    </figure>
                    <div class="card__pokemon--backdrop">
                    <h2>${pokemon.name}</h2>
                    </div>
                </article>
            </a>
        `).join("");
    });

document.querySelector("main").append(sectionElm);
