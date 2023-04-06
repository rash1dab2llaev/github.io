let form1 = document.querySelector('.form1')
let form2 = document.querySelector('#form2')
let cardBlock = document.querySelector('.card_block')

let person = [
    /* {
        id: 1,
        imgSrc: './img/Снимок.PNG',
        name: 'Rashid',
        sourName: 'Abdullaev'
    },
    {
        id: 2,
        imgSrc: './img/Снимок.PNG',
        name: 'Parvona',
        sourName: 'Sangova'
    } */
]

form1.onsubmit = (event) => {
    event.preventDefault()

    let newObj = {}

    newObj.id = new Date().getTime()
    newObj.imgSrc = event.target['img'].value
    newObj.name = event.target['name'].value
    newObj.sourName = event.target['sourName'].value

    person.push(newObj)

    event.target['img'].value=''
    event.target['name'].value=''
    event.target['sourName'].value=''
    
    getUser()
}

//delete function
function deleteFunc(id) {
    person = person.filter(elem => {
        return elem.id != id
    })
    getUser()
}

let idx
function editFunc(id) {
    idx = id
    person.find(elem => {
        if (elem.id == id) {
            form2.img.value = elem.imgSrc
            form2.name.value = elem.name
            form2.sourName.value = elem.sourName
        }
    })
    form2.style.display = 'block'
}
form2.onsubmit = (event => {
    event.preventDefault()
    person = person.map(elem => {
        if (elem.id == idx) {
            elem.imgSrc = event.target['img'].value
            elem.name = event.target['name'].value
            elem.sourName = event.target['sourName'].value
        }
        return elem
    })
    form2.style.display = 'none'
    getUser()
})

function getUser() {
    cardBlock.innerHTML = ''
    person.forEach(elem => {

        let card = document.createElement('div')
        let cardImg = document.createElement('img')
        let cardTitle1 = document.createElement('h1')
        let cardTitle2 = document.createElement('h1')

        cardImg.src = elem.imgSrc
        cardImg.alt = 'person img'
        cardImg.classList.add('img_card')
        card.classList.add('card')

        cardTitle1.innerHTML = elem.name
        cardTitle2.innerHTML = elem.sourName

        //delete
        let deleteBtn = document.createElement('span')
        deleteBtn.innerHTML = '&times'
        deleteBtn.classList.add('delete_btn')
        deleteBtn.onclick = () => {

            //delet modal
            let delteModal = document.createElement('div')
            delteModal.classList.add('delte_modal')

            let delteModalContent = document.createElement('div')
            delteModalContent.classList.add('delte_modal_content')

            let yesBtn = document.createElement('p')
            yesBtn.innerHTML = 'yes'
            yesBtn.classList.add('yes_btn')
            yesBtn.onclick = () => {
                deleteFunc(elem.id)
            }

            let canelBtn = document.createElement('p')
            canelBtn.innerHTML = 'canel'
            canelBtn.classList.add('yes_btn')
            canelBtn.onclick = () => {
                delteModal.style.display = 'none'
            }

            card.appendChild(delteModal)
            delteModal.appendChild(delteModalContent)
            delteModalContent.appendChild(yesBtn)
            delteModalContent.appendChild(canelBtn)

        }

        //edit 

        let editBtn = document.createElement('button')
        editBtn.innerHTML = 'edit'
        editBtn.classList.add('edit_btn')
        editBtn.onclick = () => {
            editFunc(elem.id)
        }

        cardBlock.appendChild(card)
        card.appendChild(cardImg)
        card.appendChild(cardTitle1)
        card.appendChild(cardTitle2)
        card.appendChild(deleteBtn)
        card.appendChild(editBtn)

    })
}
getUser()