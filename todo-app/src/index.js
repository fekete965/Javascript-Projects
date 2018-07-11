import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters'
import { renderTodos } from './views'

renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    const targetEl = e.target.elements.newTodoText
    const text = targetEl.value.trim()
    
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        targetEl.value = ''
    }
    
    e.preventDefault()
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })

    renderTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})