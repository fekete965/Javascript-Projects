'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    const newTodoText = e.target.elements.newTodoText.value.trim()
    e.preventDefault()

    if (newTodoText.length > 0) {
        const newTodo = {
            id: uuidv4(),
            text: newTodoText,
            completed: false
        }

        todos.push(newTodo)
        saveTodos(todos)
        renderTodos(todos, filters)

        e.target.elements.newTodoText.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    const isHidden = e.target.checked;
    filters.hideCompleted = isHidden

    renderTodos(todos, filters)
})