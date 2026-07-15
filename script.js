/* ============================
   MATRIX BACKGROUND
============================ */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');

// Ajusta tamaño de fuente según pantalla
let fontSize = window.innerWidth < 768? 16 : 22;
let columns, drops;
let animationFrameId;

function initMatrix() {
    // Fix móvil: window.innerWidth siempre da el ancho real
    canvas.width = window.innerWidth;
    // Si hero.offsetHeight es 0, usa el alto de la ventana
    canvas.height = hero.offsetHeight || window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    // Fondo con transparencia para el efecto de rastro
    ctx.fillStyle = 'rgba(10, 15, 31, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00d9ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = '01#@$%&*<>[]{}'[Math.floor(Math.random() * 14)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reinicia la gota cuando llega al final
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

// Arranca cuando todo el HTML + CSS cargó
window.addEventListener('load', () => {
    initMatrix();
    animateMatrix();
});

// Recalcula si giras el cel o cambias tamaño de ventana
window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrameId);
    fontSize = window.innerWidth < 768? 16 : 22;
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

// Cierra menú al dar clic en un link
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

// Cierra la tarjeta si das clic afuera
document.addEventListener('click', (e) => {
    if (evalMessage.classList.contains('show') &&
       !evalMessage.contains(e.target) &&
        e.target!== evalBtn) {
        evalMessage.classList.remove('show');
    }
});

/* ============================
   TOGGLE RIESGOS - TU FUNCIÓN ORIGINAL
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