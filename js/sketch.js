const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const button = document.createElement('button')
const range = document.createElement('input')
range.setAttribute("type", "range")
button.innerHTML = "<span>Reset</span> Button"

button.addEventListener('click', () => {
    n = 1
    clear()
})

divRanges.appendChild(button)

const width = window.screen.height / 1.8
const height = window.screen.height / 1.8
const center = new Vector(width / 2, height / 2)
canvas.width = width
canvas.height = height
ctx.translate(center.x, center.y)

let n = 1
let c = 5
let α = toRadians(137.5)
let angle

function clear() {
    ctx.clearRect(-width / 2, -height / 2, width, height)
}

function draw() {
    r = c * Math.pow(n, 0.5)
    angle = n * α
    ctx.fillStyle = hsvToRgb((toDegrees(angle) - r) % 360, 100, 100).hex()
    ctx.beginPath()
    ctx.ellipse(Math.cos(angle) * r, Math.sin(angle) * r, 3, 3, 0, 0, Math.PI * 2, false)
    ctx.fill()
    n++
}

setInterval(() => {
    if (n < 20000)
        draw()
}, getMs(144));