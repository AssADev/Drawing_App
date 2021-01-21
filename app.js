const pen = document.querySelector("input[name='pencil']");
const color = document.querySelector("input[name='color']");
const rainbow = document.querySelector(".rainbow");
const btnErase = document.querySelector(".btnErase");

const canvas = document.querySelector("#canvas");

// Canvas context :
const ctx = canvas.getContext("2d");

// Canvas size :
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Refresh canvas size :
function canvas_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = pen.value;
    ctx.strokeStyle = color.value;
    [ctx.lineJoin, ctx.lineCap] = ["round", "round"];
}

window.addEventListener("resize", canvas_size);

// Canvas.getContext().strokeStyle
// Style the shapes' borders :
ctx.strokeStyle = "#00FFC8";

// Canvas.getContext().lineJoin
// Appearance of intersections :
ctx.lineJoin = "round";

// Canvas.getContext().lineCap
// Appearance of lines ends :
ctx.lineCap = "round";

// Canvas.getContext().lineWidth
// set the line width
ctx.lineWidth = 8;

// Variables :
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let colorPick = true;

function draw(e) {
    if (!isDrawing) return; // Stop the function from running when they are not moused down
    if (!colorPick) ctx.strokeStyle = `hsl(${hue}, 100%, 45%)`;
    ctx.beginPath();
    // Start from :
    ctx.moveTo(lastX, lastY);
    // Go to :
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Customize pen :
pen.addEventListener("change", () => (ctx.lineWidth = pen.value));

color.addEventListener("change", () => {
    ctx.strokeStyle = color.value;
    colorPick = true;
    if (rainbow.classList.contains("active")) {
        colorPick = true;
        rainbow.classList.remove("active");
    }
});

btnErase.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

rainbow.addEventListener("click", () => {
    if (rainbow.classList.contains("active")) {
        colorPick = true;
        rainbow.classList.remove("active");
        ctx.strokeStyle = color.value;
    } else {
        colorPick = false;
        rainbow.classList.add("active");
    }
});
