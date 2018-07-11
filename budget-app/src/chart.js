const loadCanvas = () => {
    const canvas = document.getElementById('budget-chart')
    const context = canvas.getContext('2d')
    const bound = canvas.getBoundingClientRect()
    context.beginPath()
    context.arc(bound.left, bound.bottom / 3, bound.width / 4, 0, Math.PI, true)
    context.lineWidth = 30
    context.strokeStyle = '#70c7c1'
    context.stroke()
    // #f08c8c	'
}

export { loadCanvas }