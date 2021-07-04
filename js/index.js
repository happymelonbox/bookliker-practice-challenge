document.addEventListener("DOMContentLoaded", loaded())
function loaded(){
    fetchBooks()
}
function fetchBooks(){
    const URL = 'http://localhost:3000/books/'
    

    fetch(URL)
    .then(resp=>resp.json())
    .then(data=>{
        const books = Object.values(data)
        console.log(books)
        for(i=0;i<books.length;i++){
            let eachBook = books[i]
            createBook(eachBook)
        }
    })
}
function createBook(element){
    const bookList = document.getElementById('list')
    let newLi = bookList.appendChild(document.createElement('li'))
    let titleH4 = newLi.appendChild(document.createElement('h4'))
    let bookImg = newLi.appendChild(document.createElement('img'))
    let subTitleH5 = newLi.appendChild(document.createElement('h5'))
    let descriptionP = newLi.appendChild(document.createElement('p'))
    let likedByTitle = newLi.appendChild(document.createElement('h5'))
    likedByTitle.innerHTML = 'Liked by: '
    let likedByUl = newLi.appendChild(document.createElement('ul'))
    let users = element.users
    for (let i=0;i<users.length;i++){
        let eachUser  = users[i]
        let likedByLi = likedByUl.appendChild(document.createElement('li'))
        likedByLi.innerHTML = eachUser.username
    }
    titleH4.innerHTML = element.title
    bookImg.setAttribute('src', element.img_url)
    subTitleH5.innerHTML = element.subtitle
    descriptionP.innerHTML = 'Description: '+element.description
}
