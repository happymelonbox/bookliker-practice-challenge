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
    <ul id="likedBy"></ul>
    <button id='likeButton'>Like</button>
    `
    likedBy(info.users)
    const likeButton = document.getElementById('likeButton')
    likeButtonDisplay(info, likeButton)
    likeButton.addEventListener('click', ()=>{likeButtonClick(info, likeButton)
    })
}
function likedBy(allUsers){
    const likedByUl = document.getElementById('likedBy')
    for(i=0; i<allUsers.length;i++){
       let likedByLi = likedByUl.appendChild(document.createElement('li'))
       let eachUser = Object.values(allUsers[i])
       likedByLi.innerHTML = eachUser[1]
    }

}
function likeButtonDisplay(info, likeButton){
    let infoUsers = info.users
    console.log(infoUsers)
    let object = Object.values(infoUsers)
    let found = object.find(u=>{return u.id===1})
    if (found){
        likeButton.innerHTML = 'Unlike'
    } else {
        likeButton.innerHTML = 'Like'
    }
}
function likeButtonClick(info, likeButton){
    let userObject = Object.values(info.users)
    let users
    if(likeButton.innerHTML === 'Like'){
        likeButton.innerHTML = 'Unlike'
        users = [...userObject, {id: 1, username: 'pouros'}]
    } else {
        likeButton.innerHTML = 'Like'
        users = userObject.filter(u=>{if(u.id !== 1){return u.id}})
    }
    patchUsers(info, users)
}

function patchUsers(info, usersy){
    let id = info.id
    let config = {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({users: usersy})
    }
    console.log(`${booksURL}/${id}`)
    fetch(`${booksURL}/${id}`, config)
    .then(resp=>resp.json())
    .then(data=>{console.log(data)})
}

