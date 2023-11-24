let tasksContainer = document.querySelector("#tasks-container")
let addTaskButton = document.querySelector("#add-task")
let personal = document.querySelector("#personal")
let work = document.querySelector("#work")
let all = document.querySelector("#all")
let today = document.querySelector("#today")

taskHTML = `
<div class="task-container">
    <div class="task-details-row">
        <input type="text" placeholder="Enter task" i class="task-name-input task-content">
    </div>
    <div class="task-content-row task-details-row">
        <input type="date" class="task-details task-day task-details-bottom">
        <select name="category-dropdown" class="task-category">
            class="task-details task-details-bottom task-category">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
        </select>
        <div class="delete-icons"><span class="material-symbols-outlined">delete</span>
        </div>
    </div>
</div>`


const taskContainerTemp = new DOMParser().parseFromString(taskHTML, "text/html")
const taskContainer = taskContainerTemp.documentElement.children[1].children[0]

const createTaskElement = () => {
    outerDiv = document.createElement("div")
    outerDiv.classList.add("task-container")
    firstInnerDiv = document.createElement("div")
    firstInnerDiv.classList.add("task-details-row")
    outerDiv.appendChild(firstInnerDiv)
}

const deleteTask = e => {
    e.target.parentElement.parentElement.parentElement.remove()
    renderTasks(updateTasks())
}

const setDefaultDate = () => {
    for (let date of document.querySelectorAll("input[type='date']")) {
        if (!date.value.length) {
            date.value = new Date().toLocaleDateString('en-CA')
        }
    }
}

const renderTasks = (tasks, cat = "all") => {
    // if (cat === "personal" || cat === "work") {
    //     finalTasks = tasks.filter((x) => x.taskCategory === cat)
    // } else {
    //     finalTasks = tasks
    // }

    // if (cat === "today") {
    //     finalTasks = tasks.filter((x) => x.taskDate === new Date().toLocaleDateString('en-CA'))
    // } else {
    //     finalTasks = tasks
    // }

    let finalTasks = tasks.sort(function (a, b) {
        let keyA = Date.parse(a.taskDate), keyB = Date.parse(b.taskDate)
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
    })

    tasksContainer.innerHTML = ""

    for (let task of finalTasks) {
        currentInnerHTML = tasksContainer.innerHTML
        tasksContainer.innerHTML = taskHTML + currentInnerHTML
    }

    deleteIcons = document.querySelectorAll(".delete-icons")

    for (deleteIcon of deleteIcons) {
        deleteIcon.addEventListener("click", deleteTask)
    }

    let counter = 0

    for (let task of document.querySelectorAll(".task-container")) {
        task.querySelector("input[type='text']").value = finalTasks[counter].taskName
        task.querySelector("input[type='date']").value = finalTasks[counter].taskDate
        task.querySelector("select").value = finalTasks[counter].taskCategory
        counter++
    }

    tasks = document.querySelectorAll(".task-container")

    for (let task of tasks) {
        task.addEventListener("change", () => {
            setDefaultDate()
            renderTasks(updateTasks())
        })
    }
}

const loadTasks = () => {
    if ("todoTasks" in localStorage) {
        renderTasks(JSON.parse(localStorage.todoTasks))
    }
}

loadTasks()
setDefaultDate()


const updateTasks = () => {
    tasks = document.querySelectorAll(".task-container")
    const tasksJSON = []

    for (let task of tasks) {
        tasksJSON.push({
            taskName: task.querySelector("input[type='text']").value,
            taskDate: task.querySelector("input[type='date']").value,
            taskCategory: task.querySelector("select").value,
        })
    }
    localStorage.removeItem("todoTasks")
    localStorage.setItem("todoTasks", JSON.stringify(tasksJSON))
    globalTasks = tasksJSON
    return tasksJSON
}

let createTask = () => {
    tasksContainer.appendChild(taskContainer.cloneNode(true))
    renderTasks(updateTasks())
    setDefaultDate()
}

addTaskButton.addEventListener("click", createTask)

const filterTasks = (e) => {
    category = e.target.id
    console.log(category)
    renderTasks(globalTasks, category)
}

personal.onclick = filterTasks
work.onclick = filterTasks
all.onclick = filterTasks
today.onclick = filterTasks



