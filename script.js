let tasksContainer = document.querySelector("#tasks-container")
let addTaskButton = document.querySelector("#add-task")

let taskCounter = 0


const deleteTask = e => {
    document.getElementById(e.target.id).parentElement.parentElement.parentElement.style.display = "none"

}

let createTask = () => {

    taskCounter = taskCounter + 1

    taskHTML = `
<div id="task-${taskCounter}" class="task-container">
    <div class="task-details-row">
        <input type="text" placeholder="Enter task" id="task-${taskCounter}-task" class="task-name-input task-content">
    </div>
    <div class="task-content-row task-details-row">
        <input type="date" id="task-${taskCounter}-date" class="task-details task-day task-details-bottom">
        <select name="category-dropdown" id="task-${taskCounter}-category-dropdown"
            class="task-details task-details-bottom task-category">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
        </select>
        <div class="delete-icons"><span class="material-symbols-outlined" id="delete-${taskCounter}-icon">delete</span>
        </div>
    </div>
</div>`

    currentInnerHTML = tasksContainer.innerHTML
    tasksContainer.innerHTML = currentInnerHTML + taskHTML
    deleteIcons = document.querySelectorAll(".delete-icons")
    for (deleteIcon of deleteIcons) {
        deleteIcon.addEventListener("click", deleteTask)
    }
}

addTaskButton.addEventListener("click", createTask)


