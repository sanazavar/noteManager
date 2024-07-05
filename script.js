const $ = document

const addBox = $.querySelector('.add-box'),
    popUpbBox = $.querySelector('.popup-box'),
    popUpTitle = $.querySelector('header p'),
    popUpClose = $.querySelector('header i'),
    popUpInput = $.querySelector('input'),
    popUpTextarea = $.querySelector('textarea'),
    popUpBotton = $.querySelector('button'),
    wrapperElem = $.querySelector('.wrapper')


let notes = []

let isUpdate = false

addBox.addEventListener('click', () => {

    if (isUpdate) {
        popUpTitle.innerHTML = 'نوت رو ویرایش کن  '
        popUpBotton.innerHTML = ' ذخیره ویرایش'
    } else {
        popUpTitle.innerHTML = 'نوت جدید اضافه کن'
        popUpBotton.innerHTML = 'نوت رو ذخیره کن'
    }
    popUpInput.focus()
    popUpbBox.classList.add('show')

})


popUpBotton.addEventListener('click', () => {

    let newNote = {
        title: popUpInput.value,
        descrption: popUpTextarea.value,
        date: getNowDate(),
    }

    notes.push(newNote)

    setNotesInLocalSrorage(notes)
    closeModal()

    generateNots(notes)

    clearInputs()

    console.log(notes);
})


function clearInputs() {
    popUpInput.value = ''
    popUpTextarea.value = ''
}

function generateNots(notes) {

    //باعث میشه نوت های قبلی همه پاک شوند و دوباره همه ی نوت ها بدون تکرار به دام اضافه شوند

    $.querySelectorAll('.note').forEach(note => note.remove())

    notes.forEach((note, index )=> {
        wrapperElem.insertAdjacentHTML('beforeend', `
            <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.descrption}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showSetting(this)"></i>
            <ul class="menu">
              <li>
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="removeNote(${index})">
                <i class="uil uil-trash" ></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
            `)

    });
}


function removeNote(noteIndex) {

    const deleted=confirm('are you sure to delete?')

    if(deleted){
        let newNote = getLocalStorageNotes()

        newNote.splice(noteIndex, 1)
    
        setNotesInLocalSrorage(newNote)
        generateNots(newNote)

    }

  
}

function showSetting(el) {
    el.parentElement.classList.add('show')
}

function getLocalStorageNotes() {
    let localStorageNotes = localStorage.getItem('notes')


    if (localStorageNotes) {

        notes = JSON.parse(localStorageNotes)


    } else {
        notes = []
    }

    return notes
}

function setNotesInLocalSrorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))

}

window.addEventListener('load', () => {
    let notes = getLocalStorageNotes()

    generateNots(notes)

})

function closeModal() {
    popUpbBox.classList.remove('show')
}
popUpClose.addEventListener('click', closeModal)

window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        closeModal()
    }
})



function getNowDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["sun", "mon", "tues", "wed", "thurs", "friday", "sat"];

    let now = new Date()


    let nowDay = now.getDay()
    let nowMonth = now.getMonth()
    let nowYear = now.getFullYear()
    let dayOfMonth = now.getDate()


    return `${months[nowMonth]} ${dayOfMonth} ,${nowYear} (${days[nowDay]})`  //APRIL 12,2022 (TUESDAY)

}


