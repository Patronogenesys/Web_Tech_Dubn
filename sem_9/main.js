const add_button = document.querySelector('.add_button')
let tasks_block = document.querySelector('.tasks_block')

tasks = [
    {
        "name":"do task 1",
        "isDone":false
    },
    {
        "name":"do task 2",
        "isDone":false
    },
    {
        "name":"do task 3",
        "isDone":false
    }
]

const showAllTasks = ()=>{
    str=''
    if(tasks.length==0){
        str+='<h2>Now no tasks</h2>'
    }
    else{
        str+='<h2>My to-do tasks</h2>'
        str+="<div class='list_tasks'>"
        tasks.map((item, index)=>{
            str+=showTask(item, index)
            console.log(item)
        })
        str+="</div>"
    }
    tasks_block.innerHTML = str;
}

const showTask = (task, index)=>{
    return`
    <div class='task'>
        <span>${task.name}</span>
        <button class="task_button" id=${index}>done</button>
        <button class="task_button" onclick="deleteTask(${index})">delete</button>
    </div>
    `
}

add_button.addEventListener('click', ()=>{
    let task_value = document.querySelector('#task_name')
    if(task_value.value.length==0){
        return;
    }

    tasks.push({"name": task_value.value,
                "isDone":false });
    showAllTasks();
    task_value.value=""

})

const deleteTask=(id)=>{
    tasks
}
const doneTask=(id)=>{
    task[id].isDone=True
}

showAllTasks();