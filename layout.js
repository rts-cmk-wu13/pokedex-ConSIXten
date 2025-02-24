

let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header></header>
    <main></main>
    <footer>Created 2025</footer> 
`

document.querySelector("body").append(divElm)  // her indsættes divElm i body