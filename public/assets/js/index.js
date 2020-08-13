// Your JS code goes here

const loadChapters = (sectionId) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open(
    "GET",
    `http://localhost:3000/api/book/maths/section/${sectionId}`,
    false
  );
  xhttp.send();

  const chapters = JSON.parse(xhttp.responseText);

  

  document.getElementById(sectionId).innerHTML = "";

  if (chapters.response[sectionId] === undefined) {
    const x = `
    
        <p class="chapter">
          <p class="error">No Data Available</p>
        </p>
    
    `;

    document.getElementById(sectionId).innerHTML = x;
  } else {
    for (let chapter of chapters.response[sectionId]) {
      const x = `
    
        <p class="chapter">
        <span class="title">${chapter.title}</span>
        <span class=${chapter.status}>${chapter.status}</span>
        </p>
    
    `;

      document.getElementById(sectionId).innerHTML =
        document.getElementById(sectionId).innerHTML + x;
    }
  }
};

const loadBooks = () => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "http://localhost:3000/api/book/maths", false);
  xhttp.send();

  const books = JSON.parse(xhttp.responseText);

  

  if (books.response.message === "Book not found in DB") {
    const x = `
    
        <p class="chapter">
          <p style="text-align: center; color: blue">Book Not Found in DB</p>
        </p>
    
    `;

    document.getElementById("books").innerHTML = x;
  } else {

  for (let book of books.response) {
    const x = `
        
        <details>
        <summary onclick="loadChapters(${book.id})" class="list">
        <span class="chaptername">${book.title}</span>
        <span class="chapterprogress"><progress  value=${book.completeCount} max=${book.childrenCount} title=${(book.completeCount*100)/book.childrenCount}% > </progress></span>
        </summary>
        <div id=${book.id} class="chapters"></div>
        </details>
        
        
    `;
    document.getElementById("books").innerHTML =
      document.getElementById("books").innerHTML + x;
  } 
}
};

loadBooks();
