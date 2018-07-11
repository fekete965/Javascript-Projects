'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
    
}

// Save todos to local storage
const saveTodos = (todo) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoList = document.querySelector('#todos-list')
    
    const filteredTodos = todos.filter((todo) => {

        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch

    })

    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)

    const summary = generateSummaryDom(incompletedTodos)
    todoList.appendChild(summary)

    if (todos.length > 0) {
        filteredTodos.forEach((todo) => {
            const newTodo = generateTodoDOM(todo)
            todoList.appendChild(newTodo)
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
        saveTodos(todos)
        renderTodos(todos, filters)
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
        saveTodos(todos)
        renderTodos(todos, filters)
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

// Remove element from todos by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    todos.splice(todoIndex, 1)
}

// Toggle todo 
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}