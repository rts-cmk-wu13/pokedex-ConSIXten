/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

// her begynder selve komponentet
let sectionElm = document.createElement("section")
sectionElm.className = "pokelist"

fetch("/data/pokemon.json")
    .then(function(response) {
        return response.json()
    }).then(
        function(data) {
            sectionElm.innerHTML =  data.map(pokemon => `
                <article>
                    <h2>${pokemon.name}</h2>
                    <img src="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" alt="${pokemon.name}">
                </article>
            `).join("")

        }
    )

document.querySelector("main").append(sectionElm)