let tasks = []
localStorage.getItem('task') ? tasks = JSON.parse(localStorage.getItem("task")) : tasks = []
if (tasks.length !== 0) {
    for (let i = 0; i < tasks.length; i++) {
        let ul = document.querySelector('#todo-list__task-list')
        let temp = document.querySelector('#todo-list__task-item')
        let span = temp.content.querySelector('span')
        span.textContent = tasks[i]
        let li = temp.content.cloneNode(true)
        ul.append(li)
    }
} else {
    tasks = []
    localStorage.setItem('task', JSON.stringify(tasks))
}

function addTaskItem () {
    const newTask = document.querySelector('form input')
    if (!tasks.includes(newTask.value)) {
        let ul = document.querySelector('#todo-list__task-list')
        let temp = document.querySelector('#todo-list__task-item')
        let span = temp.content.querySelector('span')
        span.textContent = newTask.value
        let li = temp.content.cloneNode(true)
        ul.append(li)
        tasks.push(newTask.value)
        localStorage.setItem('task', JSON.stringify(tasks))
        document.querySelector('#textArea').value=''
    } else {
        alert('Task already exists')
    }
    return false

}

function removeTaskItem(taskItem) {
    let taskName = taskItem.parentNode.querySelector('span').textContent
    taskItem.parentNode.remove()
    let taskIndex = tasks.indexOf(taskName)
    tasks.splice(taskIndex, 1)
    localStorage.setItem('task', JSON.stringify(tasks))
}