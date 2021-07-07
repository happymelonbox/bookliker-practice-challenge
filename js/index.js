document.addEventListener("DOMContentLoaded", loaded())

function loaded(){
    fetchBooks()
}

function fetchBooks(){
    const ul = document.getElementById('list')
    const showPanel = document.getElementById('show-panel')
    const panel = showPanel.appendChild(document.createElement('ul'))
    panel.setAttribute('id', 'panel')
    fetch('http://localhost:3000/books/')
    .then(resp=>resp.json())
    .then(data=>{
        const panel = document.getElementById('panel')
        data.forEach(item=>{
            let titleLi = ul.appendChild(document.createElement('li'))
            titleLi.innerHTML = item.title
            titleLi.style.cursor = 'pointer'
            titleLi.addEventListener('click', ()=>{
                displayInfo(item, panel)
                console.log(item)
            })})})
        }


function displayInfo(info, location){
    location.innerHTML = `
    <img src='${info.img_url}'>
    <h3>${info.title}</h3>
    <h4>${info.subtitle}</h4>
    <p>${info.description}</p>
    <button id='likeButton'>Like</button>
    `
}