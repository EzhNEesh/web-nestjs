async function loadPhoto() {
    addPreloader()
    let randomID = Math.floor(Math.random() * 5000) + 1
    try {
        let res = await fetch('https://jsonplaceholder.typicode.com/photos/' + randomID)
        if (res.ok) {
            let resJSON = await res.json()
            addPhoto(resJSON['thumbnailUrl'])
        }
    } catch (error) {
        alert('⚠ Что-то пошло не так')
    }
    finally {
        removePreloader()
    }
}

function addPreloader () {
    let addButton = document.getElementsByClassName('content__add_button')
    addButton[0].style.display = 'none'

    let preload = document.getElementsByClassName('content__preloader')
    preload[0].style.display = 'block'
}

function removePreloader() {
    let preload = document.getElementsByClassName('content__preloader')
    preload[0].style.display = 'none'

    let addButton = document.getElementsByClassName('content__add_button')
    addButton[0].style.display = 'block'
}

function addPhoto(data) {
    let container = document.querySelector('#img-container')
    let temp = document.querySelector('#img-item')
    let img = temp.content.querySelector('img')
    img.src = data
    let cloneCont = temp.content.cloneNode(true)
    container.append(cloneCont)
    removePreloader()
}