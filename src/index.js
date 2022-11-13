document.addEventListener("DOMContentLoaded", () => {
  submitTask()
});

function submitTask() {
  const taskList = document.querySelector('#tasks')
  const taskForm = document.querySelector('#create-task-form')
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskDescription = taskForm["new-task-description"]
    const priority = taskForm["priority"]
    const li = document.createElement('li')
    li.textContent = taskDescription.value
    li.style = `color: ${priority.value}`
    createDeleteButton(li, taskList)
    taskList.append(li)
  })
}

function createDeleteButton(target, list) {
  const delButton = document.createElement('button')
  delButton.textContent = "x"
  delButton.addEventListener('click', () => {
    list.removeChild(target)
  })
  target.append(delButton)
}