"use strict";

class Book {

    constructor(title, author, total, read, stars) {
        this.title = title;
        this.author = author;
        this.total = total;
        this.read = read;
        this.stars = stars;
    }

    sendBookValuesToInput() {
      document.getElementsByName('title')[0].value = this.title;
      document.getElementsByName('author')[0].value = this.author;
      document.getElementsByName('total')[0].value = this.total;
      document.getElementsByName('read')[0].value = this.read;
      changeRatingStarsColor(5, this.stars);

    }

    printBook(bookRowIndex) {

      const bookContainer = document.getElementsByClassName('book-container')[0];

      const bookRow = document.createElement('div');
      bookRow.className = "book-row";
      bookContainer.appendChild(bookRow);

      for (let i = 0; i < 4; i++) {

        const element = document.createElement('div');
        element.className = "book-info";
        bookRow.appendChild(element);

        switch (i) {
          case 0:
              element.innerText = this.title;
          break;
          case 1:
              element.innerText = this.author;
          break;
          case 2:
              element.innerText = this.total - this.read;
          break;
          default:

              let starContainer = document.createElement('div');
              starContainer.className = "star-container";
              element.appendChild(starContainer);

              for (let i = 0; i < 5; i++) {
                  const elementI = document.createElement('i');
                  elementI.className = "fa fa-star";
                  starContainer.appendChild(elementI);

                  bookRatingStarsPrint(elementI, i, this.stars);
              }

              const edit = document.createElement('i');
              edit.className = "fa fa-edit edit-icon";
              element.appendChild(edit);

              const remove = document.createElement('i');
              remove.className = "fa fa-trash delete-icon";
              element.appendChild(remove);
        }
      }
    }

    changeValues(bookRowNumber) {

          const newTitle = document.getElementsByName('title')[0].value;
          const newAuthor = document.getElementsByName('author')[0].value;
          const newTotal = document.getElementsByName('total')[0].value;
          const newRead = document.getElementsByName('read')[0].value;
          this.title = newTitle;
          this.author = newAuthor;
          this.total = newTotal;
          this.read = newRead;

          const bookInfo = document.getElementsByClassName('book-info');
          bookInfo[bookRowNumber * 4].innerText = this.title;
          bookInfo[bookRowNumber * 4 + 1].innerText = this.author;
          bookInfo[bookRowNumber * 4 + 2].innerText = this.total - this.read;

          changeRatingStarsColor((bookRowNumber + 5), this.stars);
    }
}


function changeRatingStarsColor(starIndex, greenStars) {

    const stars = document.getElementsByTagName('i');

      for (let i = starIndex - 5; i < starIndex; i++) {
          bookRatingStarsPrint( stars[i], i, greenStars);
      }
}

function bookRatingStarsPrint(element, i, greenStars) {

  if (greenStars == -1) {
    element.style.color = "#bfbfbf";
  }else if (i <= greenStars){
    element.style.color = "#00b359";
  }else {
    element.style.color = "#bfbfbf";
  }
}

function createListHeader(books) {

    const headerRowCheck = document.getElementsByClassName('header-row');

    if (books.length == 1) {

      const bookContainer = document.getElementsByClassName('book-container')[0];

      const bookRow = document.createElement('div');
      bookRow.className = "header-row";
      bookContainer.appendChild(bookRow);

      for (let i = 0; i < 4; i++) {

        const tableHeader = document.createElement('div');
        tableHeader.className = "book-info-header";
        bookRow.appendChild(tableHeader);

        switch(i) {
          case 0:
            tableHeader.innerText = "Title";
          break;
          case 1:
            tableHeader.innerText = "Author";
          break;
          case 2:
            tableHeader.innerText = "Pages left";
          break;
          default:
            tableHeader.innerText = "Rating";
        }
      }
    }
  }

function wrongInfoMessage() {

  const h3 = document.getElementsByTagName('h3');

  if (h3.length == 0){
      const wrongInfoContainer = document.getElementsByClassName('book-container')[0];

      const wrongInfo = document.createElement('h3');
      wrongInfo.innerText = "Please check book information.";
      wrongInfoContainer.insertBefore(wrongInfo, wrongInfoContainer.firstChild);
  }
}


function objectCreate(books, numberOfStars) {

  const title = document.getElementsByName('title')[0].value;
  const author = document.getElementsByName('author')[0].value;
  const total = document.getElementsByName('total')[0].value;
  const read = document.getElementsByName('read')[0].value;

  if ((title == "") || (author == "") || (total == "") || (read == "") || (total < 1) || (read < 0)) {

      wrongInfoMessage();

  }else {

      const h3 = document.getElementsByTagName('h3');

      if (h3.length > 0) {
          h3[0].remove();
      }

      books[books.length]= new Book(title, author, total, read, numberOfStars);
      createListHeader(books);
      books[books.length - 1].printBook(books.length - 1);
  }
}

function editDeleteEventListeners(books) {

  const edit = document.getElementsByClassName('edit-icon');
  const remove = document.getElementsByClassName('delete-icon');
  const rows = document.getElementsByClassName('book-row');


  for (let i = 0; i < rows.length; i++) {


    edit[i].addEventListener("click", function() {

      books[i].sendBookValuesToInput();

      document.getElementsByClassName('submit')[0].type = "hidden";
      document.getElementsByClassName('edit-book')[0].type = "button";

      document.getElementsByClassName('edit-book')[0].addEventListener("click", function(){

      books[i].changeValues(i);

      document.getElementsByClassName('submit')[0].type = "button";
      document.getElementsByClassName('edit-book')[0].type = "hidden";
      });
    });

    remove[i].addEventListener("click", function() {
      books.splice(i, 1);
    });
  }
}


// Submit


const stars = document.getElementsByTagName('i');

let numberOfStars = -1;

  for (let i = 0; i < 5; i++){
      stars[i].addEventListener("click", function(){
      numberOfStars = i;
      changeRatingStarsColor(5, i);
      });

      stars[i].addEventListener("dblclick", function(){
      numberOfStars = -1;
      changeRatingStarsColor(5, -1);
      });
  }

const submit = document.getElementsByClassName('submit')[0];

let books = [];

submit.addEventListener("click", function(){
  objectCreate(books, numberOfStars);
  editDeleteEventListeners(books);
  console.log(books);
});


// edit book button

function editEventListener(books, i) {
const editButton = document.getElementsByClassName('edit-book')[0];

    document.getElementsByClassName('edit-book')[0].addEventListener("click", function(){

    books[i].changeValues(i);

    document.getElementsByClassName('submit')[0].type = "button";
    document.getElementsByClassName('edit-book')[0].type = "hidden";
    });
}
