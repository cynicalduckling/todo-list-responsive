let tasksContainer = document.querySelector("#tasks-container")
let addTaskButton = document.querySelector("#add-task")
let deleteTaskButton = document.querySelector("#delete-task")

let taskCounter = 0

createTask = () => {

    taskCounter = taskCounter + 1

    taskHTML = `<div id="task-${taskCounter}" class="task-container">
        <div class="task-details-row">
            <input type="checkbox" id="task-${taskCounter}-checkbox" class="task-checkbox task-content" />
            <input type="text" placeholder="Enter task" id="task-${taskCounter}-task"
                class="task-name-input task-content">
        </div>
        <div class="task-content-row task-details-row">
            <input type="date" id="task-${taskCounter}-date" class="task-details task-day task-details-bottom">
            <input type="time" id="task-${taskCounter}-time" class="task-details task-time task-details-bottom">
            <select name="category-dropdown" id="task-${taskCounter}-category-dropdown"
                class="task-details task-details-bottom task-category">
                <option value="personal">Personal</option>
                <option value="work">Work</option>
            </select>
        </div>
    </div>`

    currentInnerHTML = tasksContainer.innerHTML
    tasksContainer.innerHTML = currentInnerHTML + taskHTML

}

addTaskButton.addEventListener("click", createTask)
