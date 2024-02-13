const libraryDiv = document.getElementById('books')
const loftDiv = document.getElementById('personal-library')



fetch('http://localhost:3000/books')
.then(res => res.json())
.then(books => {

    handleDisplay(books[0])

    books.forEach((book) => {
        addedBooksToLibrary(book)
    })

})



function addedBooksToLibrary(book){
    const bookCoverImages = document.createElement('img')
    bookCoverImages.src = book.image 
    bookCoverImages.addEventListener('click', () => {
        handleDisplay(book)
    })
    libraryDiv.appendChild(bookCoverImages)



    const addToLoftButton = document.createElement('button')
    const removeButton = document.createElement('button')
    addToLoftButton.textContent = "ADD TO LOFT"
    removeButton.textContent = "REMOVE FROM LOFT"
    addToLoftButton.addEventListener('click', () => {
        loftDiv.appendChild(bookCoverImages)
        addToLoftButton.remove()
        loftDiv.appendChild(removeButton)
    })


    removeButton.addEventListener('click', () => {
        bookCoverImages.remove()
        removeButton.remove()
        libraryDiv.appendChild(bookCoverImages)
        libraryDiv.appendChild(addToLoftButton)

    })


    libraryDiv.appendChild(addToLoftButton)



    bookCoverImages.addEventListener('mouseover', (e) => {
        e.target.style.width = '16%'
        e.target.style.height = '16%'
        e.target.style.boxShadow = '15px 15px 15px maroon'
    })

    bookCoverImages.addEventListener('mouseout', (e) => {
        e.target.style.width = ''
        e.target.style.height = ''
        e.target.style.boxShadow = '15px 15px 15px black'
    })

}






const handleDisplay = (book) => {
    const bookTitle = document.getElementsByClassName('title')[0]
    bookTitle.textContent = book.title

    const authorName = document.getElementsByClassName('author')[0]
    authorName.textContent = `By ${book.author}`

    const bookCoverImage = document.getElementsByClassName('display-image')[0]
    bookCoverImage.src = book.image

    const bookGenre = document.getElementById('genre')
    bookGenre.textContent = book.genre

    const bookSynopsis = document.getElementById('synopsis')
    bookSynopsis.textContent = book.synopsis
}




const newBookForm = document.getElementById('new-book')
newBookForm.addEventListener('submit', (event) => {
    event.preventDefault() 

    const newCoverInput = document.getElementById('new-image')
    const newTitleInput = document.getElementById('new-title')
    const newAuthorInput = document.getElementById('new-author')
    const newGenreInput = document.getElementById('new-genre')
    const newSynopsisInput = document.getElementById('new-synopsis')

    const newBook = {
        image: newCoverInput.value,
        title: newTitleInput.value,
        author: newAuthorInput.value,
        genre: newGenreInput.value,
        synopsis: newSynopsisInput.value
    }


    fetch('http://localhost:3000/books', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newBook)
    })
    .then(response => {
        if(response.ok){
            response.json().then(newBookData => {
                addedBooksToLibrary(newBookData)
            })
        }
        else{
            alert("Error: New Book Not Added!")
        }
    })
     newBookForm.reset()

    })





    