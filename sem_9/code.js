let tasks_blocks = {
    "Waiting": document.querySelector('.Waiting'),
    "In Progress": document.querySelector('.InProgress'),
    "Postponed": document.querySelector('.Postponed')
}

let isSorted = false

const defaultFilter = (task) => true
const isAsciveFilter = (task) => !task.isDone
const filters = [defaultFilter, isAsciveFilter]
let taskFilter = defaultFilter

let draggedIndex = 0

const tasksFiltered = () => tasks.filter(taskFilter)

// tasks = [
//     {
//         "text": "do task 1",
//         "isDone": false,
//         "column": "Waiting"
//     },
//     {
//         "text": "do task 2",
//         "isDone": false,
//         "column": "InProgress"
//     },
//     {
//         "text": "do task 3",
//         "isDone": false,
//         "column": "Postponed"
//     }
// ]
tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'))

const update_local_storage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const showTasks = () => {
    // TODO: нормально сделай
    update_local_storage()

    var temp = isSorted ? tasksFiltered().toSorted((a, b) => a.isDone - b.isDone) : tasksFiltered()


    for (key in tasks_blocks) {
        tasks_blocks[key].removeEventListener("dragover", onDragOver)
        tasks_blocks[key].removeEventListener("drop", onDrop)
        str = ''
        if (temp.length == 0) {
            str += '<h2>Now no tasks</h2>'
        }
        else {
            str += `<h2>${key}</h2>`
            str += `<div class='list_tasks'">`

            tasks_blocks[key].addEventListener("dragover", onDragOver)
            tasks_blocks[key].addEventListener("drop", onDrop)
            
            temp.filter((task) => task.column == key)
                .map((item, index) => {
                    str += showTask(item, tasks.findIndex((element) => element == item))
                    //console.log(item)
                })
            str += "</div>"
        }
        tasks_blocks[key].innerHTML = str
    }
}

const showTask = (task, index) => {
    return `
    <div class='task' draggable="true" ondragstart="onTaskDragStart(${index})"">
        <div class="task_text_block">
            <span class="task_text ${task.isDone ? 'done' : 'not_done'}">${task.text}</span>
        </div>
        <div class="task_button_block">
            <button class="task_button" onclick="toggleTaskStatus(${index})">Toggle</button>
            <button class="task_button" onclick="showEditTaskDialog(${index})">Edit</button>
            <button class="task_button" onclick="deleteTask(${index})">Delete</button>
        </div>
    </div>
    `
}



const deleteTask = (id) => {
    tasks.splice(id, 1)
    showTasks()
}

const toggleTaskStatus = (id) => {
    tasks[id].isDone = !tasks[id].isDone
    showTasks()
}

const showEditTaskDialog = (id) => {
    let box_update = document.querySelector('.edit_dialog')
    box_update.classList.remove("hidden")

    box_update.innerHTML = `
    <p>Input new text</p>
    <input type="text" id="new_value" value="${tasks[id].text}">
    <select id="edit_column_select">
        <option ${tasks[id].column == "Waiting" ? "selected" : ""} value="Waiting">Waiting</option>
        <option ${tasks[id].column == "Postponed" ? "selected" : ""} value="Postponed">Postponed</option>
        <option ${tasks[id].column == "In Progress" ? "selected" : ""} value="In Progress">In Progress</option>
    </select>
    <div>
        <button onclick="hideEditDialog()">Cancel</button>
        <button onclick="applyTaskChanges(${id})">Edit</button>
    </div>  
    `
}

const hideEditDialog = () => {
    let box_update = document.querySelector('.edit_dialog')
    box_update.classList.add("hidden")
}

const applyTaskChanges = (id) => {
    let box_update = document.querySelector('.edit_dialog')
    let new_value = document.querySelector('#new_value').value
    let new_column = document.querySelector('#edit_column_select').value

    tasks[id].text = new_value
    tasks[id].column = new_column

    box_update.classList.add("hidden")
    showTasks()
}


const toggleFilter = () => {
    let currIndex = filters.findIndex((filter) => taskFilter == filter)
    taskFilter = filters[(currIndex + 1) % filters.length]
    toggle_filter_btn.classList.remove("disabled_btn")
    toggle_filter_btn.classList.remove("enabled_btn")
    toggle_filter_btn.classList.add(taskFilter != defaultFilter ? "enabled_btn" : "disabled_btn")
    showTasks()
}

const toggleSort = () => {
    isSorted = !isSorted
    toggle_sort_btn.classList.remove("disabled_btn")
    toggle_sort_btn.classList.remove("enabled_btn")
    toggle_sort_btn.classList.add(isSorted ? "enabled_btn" : "disabled_btn")
    showTasks()
}


const add_button = document.querySelector('#add_btn')
const add_column_select = document.querySelector('#add_column_select')

add_button.addEventListener('click', () => {
    let task_value = document.querySelector('#task_name')
    if (task_value.value.length == 0) {
        return
    }

    tasks.push({
        "text": task_value.value,
        "isDone": false,
        "column": add_column_select.value
    })
    showTasks()
    task_value.value = ""
})
const toggle_sort_btn = document.querySelector('#toggle_sort_btn')
toggle_sort_btn.addEventListener('click', toggleSort)

const toggle_filter_btn = document.querySelector('#toggle_filter_btn')
toggle_filter_btn.addEventListener('click', toggleFilter)


const onTaskDragStart = (index) => {
    draggedIndex = index
    console.log(`draggedTask = ${index}`)
}

const onDragOver = (event) => event.preventDefault()

const onDrop = (event) => {
    event.preventDefault()
    const newColumn = event.target
    console.log(newColumn.classList)
    // newColumn.classList.add("marked")

    
    for (key in tasks_blocks) {
        const predicate = (el) => el.classList.contains(key.replace(" ", ""))
        if (matchSellfAndAllParents(newColumn, predicate)) {
            tasks[draggedIndex].column = key
            break
        }
    }
    showTasks();
}

const matchSellfAndAllParents = (el, predicate) => {
    if (el == null || el.nodeType != Node.ELEMENT_NODE) {
        return false
    }
    if (predicate(el)){
        return true
    }
    return matchSellfAndAllParents(el.parentNode, predicate)
}

showTasks()