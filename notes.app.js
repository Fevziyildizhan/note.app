const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach((note) =>{
       newNote(note)
    })
}

addBtn.addEventListener('click',()=>{
            newNote()
})

function newNote(text = ""){
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = 
    `<div class="notes">
     <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>
  </div>
  
  `

  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')

  const main  = note.querySelector('.main')
  const textarea = note.querySelector('textarea')

 textarea.value = text;
 main.innerHTML = marked(text)

 editBtn.addEventListener('click',()=>{
     main.classList.toggle('hidden')
     textarea.classList.toggle('hidden')
 })

 deleteBtn.addEventListener('click',()=>{

      note.remove()
      addLS()
 })

textarea.addEventListener('input',(e)=>{
    const {value} = e.target

    main.innerHTML = marked(value)

    addLS()
})

document.body.appendChild(note)
 
}

function addLS(){
    const notesText = document.querySelectorAll('textarea')

    const notes = []
    notesText.forEach((note) =>{
         notes.push(note.value)
    })

    localStorage.setItem('notes',JSON.stringify(notes))

}