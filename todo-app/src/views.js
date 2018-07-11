import { getFilters } from './filters'
import { getTodos, toggleTodo, saveTodos, removeTodo } from './todos'


const renderTodos = () => {
    const todoList = document.querySelector('#todos-list')
    const filters = getFilters()
    
    const filteredTodos = getTodos().filter((todo) => {

        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch

    })

    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)

    todoList.innerHTML = ''
    todoList.appendChild(generateSummaryDom(incompletedTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessage =  document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-dos to show'
        todoList.appendChild(emptyMessage)
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const buttonEl = document.createElement('button')

    // Setup todo checkbox
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = todo.completed

    checkboxEl.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    containerEl.appendChild(checkboxEl)

    
    // Setup todo text
    if (todo.text.length > 0) {
        textEl.textContent = todo.text
    } else {
        textEl.textContent = 'Unnamed todo'
    }
    containerEl.appendChild(textEl)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup todo button
    buttonEl.textContent = 'Remove'
    buttonEl.classList.add('button')
    buttonEl.classList.add('button--secondary')
    buttonEl.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })
    todoEl.appendChild(buttonEl)

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDom = (incompletedTodos) => {
    const summary = document.createElement('h2')
    const plural = incompletedTodos.length === 1 ? '' : 's'

    summary.classList.add('list-title')
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left`

    document.querySelector('#todos-list').innerHTML = ''  
    return summary
}

export { renderTodos, generateTodoDOM, generateSummaryDom }