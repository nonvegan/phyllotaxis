const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const button = document.createElement('button')
const range = document.createElement('input')
const switchSlider = document.createElement('label')
const switchSliderLabel = document.createElement('label')
range.setAttribute("type", "range")
button.innerHTML = "<span>Reset</span> Button"
switchSlider.className = "switch"
switchSlider.innerHTML = "<input type=\"checkbox\"><span class =\"slider round\"></span>"
switchSliderLabel.innerText = "Spiral hue"
button.addEventListener('click', () => {
    n = 1
    clear()
})
divRanges.appendChild(switchSliderLabel)
divRanges.appendChild(switchSlider)
divRanges.appendChild(button)

const width = window.screen.height / 1.8
const height = window.screen.height / 1.8
const center = new Vector(width / 2, height / 2)
canvas.width = width
canvas.height = height
ctx.translate(center.x, center.y)

let n = 1
let scale = 6
let α = toRadians(137.5)
let angle
let specialColorMode = switchSlider.firstChild.checked

function clear() {
    ctx.clearRect(-width / 2, -height / 2, width, height)
}

function draw() {
    let r = scale * Math.pow(n, 0.5)
    angle = n * α
    specialColorMode = switchSlider.firstChild.checked
    let c
    if (specialColorMode)
        c = (toDegrees(angle) - r) % 360
    else {
        c = restrain(r * .75, 0, 359)
    }
    ctx.fillStyle = hsvToRgb(c, 100, 100).hex()
    ctx.beginPath()
    ctx.ellipse(Math.cos(angle) * r, Math.sin(angle) * r, 4, 4, 0, 0, Math.PI * 2, false)
    ctx.fill()
    n++
}

setInterval(() => {
    if (n < 15000)
        draw()
}, getMs(144));