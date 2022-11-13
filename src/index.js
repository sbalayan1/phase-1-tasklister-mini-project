document.addEventListener("DOMContentLoaded", () => {
  submitTask()
  createSortEvent()
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

function createSortEvent() {
  const taskList = document.querySelector('#tasks')
  const sortElement = document.querySelector('#sort')
  sortElement.addEventListener('change', () => {
    const dir = sortElement.value
    let array = []
    for (let child of taskList.children) {
      array.push(child)
    }

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }

    quickSort(array, 0, array.length-1, dir).forEach((element) => {
      taskList.append(element)
    })


  })
}

function partition(arr, start, end, dir) {
  const obj = {red: 3, yellow: 2, green: 1}
  let pivot = arr[start]
  let swapIdx = start
  for (let i = start + 1; i<=end; i++) {
    if (dir === "ASC") {
      if (obj[arr[i].style.color] < obj[pivot.style.color]) {
        swapIdx ++
        [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]
      }
    }

    if (dir === "DESC") {
      if (obj[arr[i].style.color] > obj[pivot.style.color]) {
        swapIdx ++
        [arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]
      }
    }
  }
  
  [arr[swapIdx], arr[start]] = [arr[start], arr[swapIdx]]

  return swapIdx
}

function quickSort(arr, left, right, dir) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right, dir)
    quickSort(arr, left, pivotIndex-1, dir)
    quickSort(arr, pivotIndex+1, right, dir)
  }

  return arr
}

