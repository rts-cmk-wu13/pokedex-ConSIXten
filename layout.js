

let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
        <span class="brand">Pokédex</span>
    </header>
    <main></main>
    <footer>Created 2025</footer> 
`

document.querySelector("body").append(divElm)  // her indsættes divElm i body