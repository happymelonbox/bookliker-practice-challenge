const booksURL = 'http://localhost:3000/books'
document.addEventListener("DOMContentLoaded", loaded())

function loaded(){
    fetchBooks()
}

function fetchBooks(){
    const ul = document.getElementById('list')
    const showPanel = document.getElementById('show-panel')
    const panel = showPanel.appendChild(document.createElement('ul'))
    panel.setAttribute('id', 'panel')
    fetch(booksURL)
    .then(resp=>resp.json())
    .then(data=>{
        const panel = document.getElementById('panel')
        data.forEach(item=>{
            let titleLi = ul.appendChild(document.createElement('li'))
            titleLi.innerHTML = item.title
            titleLi.style.cursor = 'pointer'
            titleLi.addEventListener('click', ()=>{
                displayInfo(item, panel)
            })
        })
    })
}


function displayInfo(info, location){
    location.innerHTML = `
    <img src='${info.img_url}'>
    <h3>${info.title}</h3>
    <h4>${info.subtitle}</h4>
    <p>${info.description}</p>
    <button id='likeButton'>Like</button>
    `
    const likeButton = document.getElementById('likeButton')
    likeButtonDisplay(info, likeButton)
    likeButton.addEventListener('click', ()=>{likeButtonClick(info, likeButton)
    })
}
function likeButtonDisplay(info, likeButton){
    const found = info.users.find(u => {return u.id === 1})
    if (found){
        likeButton.innerHTML = 'Unlike'
    } else {
        likeButton.innerHTML = 'Like'
    }
}
function likeButtonClick(info, likeButton){
    let users
    if(likeButton.innerHTML === 'Like'){
        likeButton.innerHTML = 'Unlike'
        users = [...info.users, {id: 1, username: 'pouros'}]
    } else {
        likeButton.innerHTML = 'Like'
        users = info.users.filter(u=>{u.id != 1})
    }
    patchUsers(info, users)
}

function patchUsers(info, allUsers){
    console.log(allUsers)
    let config = {
        method: "PATCH",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({users: allUsers})
    }
    fetch(booksURL+`/${info.id}`, config)
    .then(resp=>resp.json())
    .then(data=>{console.log(data)})
}

