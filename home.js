/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop();
}

let mainElm = document.querySelector("main");
mainElm.className = "homeBg";

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            currentOffset = currentOffset + 50;
            if (currentOffset < 1304) {
                fetchPokemon(currentOffset);
            }else{
            console.log("No more pokemons")
            
        }
    }
    })

})

// const imgObserver = new IntersectionObserver(function(entries) {
//     entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//             entry.target.src = entry.target.dataset.imagesrc;
//             imgObserver.unobserve(entry.target);
//         }
//     })
// }
// )

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


let currentOffset = 0;

function fetchPokemon(offset) {

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`)
    .then(function(response) {
        return response.json();
    }).then(
        function(data) {
            console.log();
            
        sectionElm.innerHTML += data.results.map(pokemon => `
            <a href="details.html?pokemon=${pokemon.name}" class="card__pokemon--link">
                <article class="card__pokemon">
                    <p>#${getIdFromPokemon(pokemon.url).padStart(4, "0")}</p>
                    <figure class="card__pokemon--img">
                    <img loading="lazy" class="pokemon__img" src="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" alt="${pokemon.name}">
                    </figure>
                    <div class="card__pokemon--backdrop">
                    <h2>${pokemon.name}</h2>
                    </div>
                </article>
            </a>
        `).join("");

        let observedPokemon = sectionElm.querySelector("a:nth-last-child(5)");
        observer.observe(observedPokemon);

    //     let ObservedImgs = sectionElm.querySelectorAll("img");
    //     ObservedImgs.forEach(img => {
    //         imgObserver.observe(img);
    //     })
    });

document.querySelector("main").append(sectionElm);

}

fetchPokemon(currentOffset);
