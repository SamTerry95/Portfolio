function Ranking(id, name, initialMoney, priceWon, totalMoney) {
    this.id = id;
    this.name = name;
    this.initialMoney = initialMoney;
    this.priceWon = priceWon;
    this.totalMoney = totalMoney;
}

// Data initialization

let rankings = [
    new Ranking(1, "John", 1245, 1000, 2245),
    new Ranking(2, "Peter", 1245, 1500, 2745),
    new Ranking(3, "Mary", 3789, 800, 4589),
    new Ranking(4, "Joseph", 8632, 2200, 10832),
    new Ranking(5, "Dani", 1245, 1000, 2245),
    new Ranking(6, "Jane", 1245, 1500, 2745),
    new Ranking(7, "Gloria", 3789, 800, 4589),
    new Ranking(8, "Amanda", 8632, 2200, 10832),
    new Ranking(9, "Simon", 1245, 1000, 2245),
    new Ranking(10, "Chris", 1245, 1500, 2745),
];


//Selectors
const rankingTbody = document.getElementById("ranking-body");
const nameInput = document.getElementById("nameInput");
const initialMoneyInput = document.getElementById("initialMoneyInput");
const priceWonInput = document.getElementById("priceWonInput");
const totalMoneyInput = document.getElementById("totalMoneyInput");
const addPlayerButton = document.getElementById("addPlayerButton");

function updateTable() {
    // Vaciamos el tbody por completo
    rankingTbody.innerHTML = "";

    // Generamos de nuevo todas las filas
    rankings.forEach(ranking => {
        rankingTbody.innerHTML += `
        <tr>
            <td>${ranking.id}</td>
            <td>${ranking.name}</td>
            <td>${ranking.initialMoney}</td>
            <td>${ranking.priceWon}</td>
            <td>${ranking.totalMoney}</td>
            <td><button class="btn btn-danger" id="${ranking.id}">Remove</button></td>
        </td>`;

        rankingTbody.onclick = e => {
            if(e.target.tagName === "BUTTON") {
                rankings = rankings.filter(ranking => ranking.id != e.target.id);
                updateTable();
            }
        };
    });
}

updateTable();

// Process form and add a new Player

addPlayerButton.addEventListener("click", e => {
    e.preventDefault();

    const newID = rankings[rankings.length - 1].id + 1;

    rankings.push(new Ranking(newID, nameInput.value, initialMoneyInput.value, priceWonInput.value, totalMoneyInput.value));

    updateTable();    
    addPlayerButton.parentNode.reset();

});