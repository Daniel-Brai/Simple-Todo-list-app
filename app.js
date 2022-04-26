const clear = document.querySelector('.clear')
const dateEl = document.getElementById('datetime')
const list = document.getElementById('list')
const input = document.getElementById('input')



const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const STRIKETHROUGH = "lineThrough"

const today= new Date()
const options = { weekday: 'long', month: 'short', day: 'numeric'}

dateEl.innerHTML = today.toLocaleDateString("en-US", options)

let LIST = []
let id = 0

let taskdata = localStorage.getItem('TODO')

if (taskdata) {
    LIST = JSON.parse(taskdata)
    id = LIST.length
    loadToDo(LIST)
}
else {
    LIST = []
    id = 0
}

function loadToDo(array) {
    array.forEach((item) => {
        addTodo(item.name, item.id, item.completed, item.deleted)
    })
}

clear.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})


function addTodo(toDo, id, completed, deleted ) {

    if (deleted) return;

    const DONE = completed ? CHECK : UNCHECK
    const LINE = completed ? STRIKETHROUGH : ""

    const text = `<li class="item">
                    <i class="fa ${DONE} complete" id="${id}" job="complete"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o delete" id="${id}" job="delete"></i>
                </li>`

    const position = "beforeend"

    list.insertAdjacentHTML(position, text)
}

document.addEventListener('keyup', (e) => {
    if ( 'Enter' === e.key ) {
        const toDo = input.value

        if (toDo) {
            addTodo(toDo, id, false, false)
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    completed: false,
                    deleted: false
                }
            )
            localStorage.setItem('TODO', JSON.stringify(LIST))

            id++
        }
        input.value = ""
    }
})



function completeTodo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(STRIKETHROUGH)
    LIST[element.id].done = LIST[element.id].done ? false : true
}

function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].deleted = true
}

list.addEventListener('click', (e) => {
    let element = e.target
    const elementJob = e.target.attributes.job.value

    if (elementJob == "complete") {
        completeTodo(element)
    }
    else if (elementJob == "delete") {
        removeTodo(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})

