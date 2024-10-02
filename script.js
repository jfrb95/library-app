(function() {

    const log = console.log;

    const libraryTable = document.querySelector("table");
    const newBookButton = document.querySelector(".new-book-button");
    const dialog = document.querySelector("dialog");
    const dialogCancelButton = document.querySelector(".cancel");
    const dialogAddBookButton = document.querySelector(".add-book");
    const form = document.querySelector(".new-book-form");

    newBookButton.addEventListener("click", () => {
        dialog.showModal();
    });
    dialogCancelButton.addEventListener("click", () => {
        dialog.close();
    });
    dialogAddBookButton.addEventListener("click", (event) => {
        event.preventDefault();
        const fd = new FormData(form);
        addBookToLibrary(
            fd.get("title"),
            fd.get("author"),
            fd.get("num-pages"),
            fd.get("have-read") === "yes" ? true : false
        );
        dialog.close();
    });

    const myLibrary = [];

    class Book {
        constructor(title, author, numPages, haveRead) {
            this.title = title;
            this.author = author;
            this.numPages = numPages;
            this.haveRead = haveRead;
        }
        
        info() {
            return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.haveRead ? "finished reading" : "not read yet"}`
        }

        changeRead() {
            this.haveRead ? this.haveRead = false : this.haveRead = true;
        }
    }

    function addBookToLibrary(title, author, numPages, haveRead) {
        const book = new Book(...arguments);
        book.libraryIndex = myLibrary.length;
        myLibrary.push(book);
        displayLibrary();
    }

    function displayLibrary() {
        const newTableBody = document.createElement("tbody");
        myLibrary.forEach((book, index) => {
            const row = newTableBody.insertRow(-1);

            row.dataset.libraryIndex = index;

            const title = row.insertCell()
            title.innerText = book.title;

            const author = row.insertCell()
            author.innerText = book.author;

            const numPages = row.insertCell()
            numPages.innerText = book.numPages;

            const haveRead = row.insertCell()
            haveRead.innerText = book.haveRead ? "finished reading" : "not yet read";
            const toggleRead = document.createElement("button");
            toggleRead.textContent = "Toggle Read";
            toggleRead.addEventListener("click", () => {
                const book = myLibrary[row.dataset.libraryIndex];
                log(book);
                book.haveRead ? book.haveRead = false : book.haveRead = true;
                displayLibrary();
            })
            haveRead.appendChild(toggleRead);

            const newCell = row.insertCell();
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Remove Book";
            deleteButton.addEventListener("click", () => {
                myLibrary.splice(row.dataset.libraryIndex, 1);
                displayLibrary();
            })
            newCell.appendChild(deleteButton);

            newTableBody.appendChild(row);
        });
        libraryTable.replaceChild(newTableBody, document.querySelector("tbody"));
    }
})();