/* ============================
   MATRIX BACKGROUND
============================ */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');

// Ajusta tamaño de fuente según pantalla
let fontSize = window.innerWidth < 768 ? 16 : 22;
let columns, drops;
let animationFrameId;

// Control de velocidad del Matrix
let slowDown = 0;

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = hero.offsetHeight || window.innerHeight;

    // ANCHO COMPLETO — como antes
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    slowDown++;
    if (slowDown % 2 !== 0) return; // velocidad fluida sin perder densidad

    // Fondo con opacidad equilibrada (no apagado)
    ctx.fillStyle = 'rgba(10, 15, 31, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color brillante (azul hacker)
    ctx.fillStyle = '#00eaff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = '01#@$%&*<>[]{}'[Math.floor(Math.random() * 14)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function animateMatrix() {
    drawMatrix();
    animationFrameId = requestAnimationFrame(animateMatrix);
}

window.addEventListener('load', () => {
    initMatrix();
    animateMatrix();
});

window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrameId);
    fontSize = window.innerWidth < 768 ? 16 : 22;
    initMatrix();
    animateMatrix();
});

/* ============================
   MENÚ HACKER
============================ */
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

/* ============================
   TARJETA FLOTANTE HACKER
============================ */
const evalBtn = document.getElementById('eval-btn');
const evalMessage = document.getElementById('eval-message');
const closeEval = document.getElementById('close-eval');

evalBtn.addEventListener('click', () => {
    evalMessage.classList.add('show');
});

closeEval.addEventListener('click', () => {
    evalMessage.classList.remove('show');
});

// Cierra si das clic afuera
document.addEventListener('click', (e) => {
    if (
        evalMessage.classList.contains('show') &&
        !evalMessage.contains(e.target) &&
        e.target !== evalBtn
    ) {
        evalMessage.classList.remove('show');
    }
});

/* ============================
   TOGGLE RIESGOS
============================ */
function toggleRiesgos() {
    const box = document.getElementById("riesgos-content");
    const flecha = document.querySelector(".flecha");

    if (box.style.display === "block") {
        box.style.display = "none";
        flecha.classList.remove("abierta");
    } else {
        box.style.display = "block";
        flecha.classList.add("abierta");
    }
}
