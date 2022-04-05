// Ejercicio 5 - Realizar una tabla filtrable. Tendremos un input de búsqueda y una tabla de libros rellena por JavaScript.
// Cada vez que cambie el input, se actualizará la tabla para que aparezcan sólo los libros cuyos títulos contengan 
// lo que estamos introduciendo en el input. Partiremos del ejercicio 4 en lo que nos haga falta.
// Añadiremos un botón para ordenar la tabla por el precio de forma creciente / decreciente. (Efecto toggle)
// Añadiremos una última fila en el tfoot, separada del resto, que nos sume los precios de los libros que están presentes
// en la tabla en ese momento.






// Book Constructor

class Book {
    constructor(id, title, author, sales, price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.sales = sales;
        this.price = price;
    }
}

// Data initialization

let books = [
    new Book(1, "The Selfish Gene", "Richard Dawkins", 740120, 12),
    new Book(2, "The God Delusion", "Richard Dawkins", 610120, 15),
    new Book(3, "La nueva mente del emperador", "Roger Penrose", 120000, 17),
    new Book(4, "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 910120, 18),
    new Book(5, "The Selfish Gene", "Richard Dawkins", 740120, 12),
    new Book(6, "The God Delusion", "Richard Dawkins", 610120, 15),
    new Book(7, "La nueva mente del emperador", "Roger Penrose", 120000, 17),
    new Book(8, "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 910120, 18),
    new Book(9, "The Selfish Gene", "Richard Dawkins", 740120, 12),
    new Book(10, "The God Delusion", "Richard Dawkins", 610120, 15),
];

let displayedBooks = [...books]; // Parte del ejercicio 5
// let displayedBooks = Array.from(books);


//Selectors
const booksTbody = document.getElementById("books-body");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const salesInput = document.getElementById("salesInput");
const priceInput = document.getElementById("priceInput");
const addBookButton = document.getElementById("addBookButton");

const tfoot = document.querySelector("tfoot");

function updateTable() {
    // Vaciamos el tbody por completo
    booksTbody.innerHTML = "";

    // Generamos de nuevo todas las filas
    displayedBooks.forEach(book => {
        booksTbody.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.sales}</td>
            <td>${book.price}</td>
            <td><button class="btn btn-danger" id="${book.id}">Remove</button></td>
        </td>`;
    });

    const totalPrice = displayedBooks.reduce((priceSum, book) => priceSum + book.price, 0);
    tfoot.textContent = `Precio total ${totalPrice}`;
}

booksTbody.onclick = e => {
            if(e.target.tagName === "BUTTON") {
                books = books.filter(book => book.id != e.target.id);
                displayedBooks = displayedBooks.filter(book => book.id != e.target.id); // Parte del ejercicio 5
                updateTable();
            }
        };


updateTable();

// Process form and add a new book

addBookButton.addEventListener("click", e => {
    e.preventDefault(); // Evita que se recargue la página ya que los botones de formularios tienen esa funcionalidad por defecto

    const newID = books[books.length - 1].id + 1;
    const newBook = new Book(newID, titleInput.value, authorInput.value, Number(salesInput.value), Number(priceInput.value));

    books.push(newBook);
    displayedBooks.push(newBook);

    updateTable();    

    addBookButton.parentNode.reset();

});


// Aqui empiezan los cambios del ejercicio 4 al 5

const filterInput = document.querySelector("#filterInput");
const priceHeader = document.querySelector("#priceHeader");

let ascendingOrder = true;

// Apartado 1
filterInput.addEventListener("input", e => {
    // Version 1 - Teniendo en cuenta las mayúsculas (case sensitive)
    displayedBooks = books.filter(book => book.title.includes(e.target.value));
    // Para tener en cuenta otro campo, incluimos en la condición lo siguiente: || book.author.includes(e.target.value));

    //versión 2 - Sin tener en cuenta las mayúsculas
    displayedBooks = books.filter(book => {
        const upperTitle = book.title.toUpperCase();
        const upperInputValue = e.target.value.toUpperCase();
        return upperTitle.includes(upperInputValue);
        // return book.title.toUpperCase().includes(e.target.value.toUpperCase()); // Igual a las 3 lineas superiores
    });
    updateTable();
});

// Apartado 2
priceHeader.style.cursor = "pointer";
priceHeader.addEventListener("click", e => {
    ascendingOrder = !ascendingOrder;

    document.querySelector("span").innerHTML = ascendingOrder ? "&uarr;" : "&darr;"

    displayedBooks.sort((book1, book2) => {
        return ascendingOrder ? book1.price - book2.price : book2.price - book1.price;
    });

    updateTable();    
});

// Apartado 3
