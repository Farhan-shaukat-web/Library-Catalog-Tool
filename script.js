// =======================================
// LIBRARY CATALOG TOOL
// =======================================

// Input Elements
const bookId = document.getElementById("bookId");
const bookTitle = document.getElementById("bookTitle");
const author = document.getElementById("author");
const category = document.getElementById("category");

// Buttons
const addBookBtn = document.getElementById("addBookBtn");
const clearBtn = document.getElementById("clearBtn");

// Search
const searchBook = document.getElementById("searchBook");

// Table
const bookTable = document.getElementById("bookTable");

// Counter
const bookCount = document.getElementById("bookCount");

// Array
let books = [];

// =======================================
// Update Counter
// =======================================

function updateCounter() {

    bookCount.textContent = books.length;

}

// =======================================
// Display Books
// =======================================

function displayBooks(data = books) {

    bookTable.innerHTML = "";

    if (data.length === 0) {

        bookTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    📚 No Books Added Yet
                </td>
            </tr>
        `;

        updateCounter();

        return;

    }

    data.forEach((book, index) => {

        bookTable.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${book.id}</td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>

                <button class="delete-btn"

                    onclick="deleteBook(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateCounter();

}

// =======================================
// Add Book
// =======================================

addBookBtn.addEventListener("click", () => {

    const id = bookId.value.trim();

    const title = bookTitle.value.trim();

    const writer = author.value.trim();

    const type = category.value.trim();

    if (id === "" || title === "" || writer === "" || type === "") {

        alert("Please fill all fields.");

        return;

    }

    const exists = books.some(book => book.id === id);

    if (exists) {

        alert("Book ID already exists.");

        return;

    }

    books.push({

        id: id,

        title: title,

        author: writer,

        category: type

    });

    clearForm();

    displayBooks();

});

// =======================================
// Delete Book
// =======================================

function deleteBook(index) {

    if (confirm("Delete this book?")) {

        books.splice(index, 1);

        displayBooks();

    }

}

// =======================================
// Search Books
// =======================================

searchBook.addEventListener("keyup", () => {

    const value = searchBook.value.toLowerCase();

    const filtered = books.filter(book =>

        book.title.toLowerCase().includes(value) ||

        book.author.toLowerCase().includes(value) ||

        book.category.toLowerCase().includes(value) ||

        book.id.toLowerCase().includes(value)

    );

    displayBooks(filtered);

});

// =======================================
// Clear Form
// =======================================

function clearForm() {

    bookId.value = "";

    bookTitle.value = "";

    author.value = "";

    category.value = "";

    bookId.focus();

}

clearBtn.addEventListener("click", clearForm);

// =======================================
// Initial Load
// =======================================

displayBooks();