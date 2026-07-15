<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RedSegura</title>
    <style>
        /* ============================
           ESTILOS BASE
        ============================ */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', monospace;
            background: #0a0f1f;
            color: #c8f6ff;
        }

        /* ============================
           HERO + MATRIX
        ============================ */
        .hero {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #matrix-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            padding: 20px;
        }

        .hero h1 {
            font-size: 2.5rem;
            text
}

/* ============================
   MATRIX BACKGROUND - MOBILE FIX
============================ */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');

let fontSize = window.innerWidth < 768? 16 : 22;
let columns, drops;
let animationFrameId;

function initMatrix() {
    // Fix 1: window.innerWidth siempre funciona en móvil
    canvas.width = window.innerWidth;
    // Fix 2: Si hero.offsetHeight da 0, usa window.innerHeight
    canvas.height = hero.offsetHeight || window.innerHeight;
    
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 15, 31, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00d9ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = '01#@$%&*<>[]{}'[Math.floor(Math.random() * 14)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Fix 3: requestAnimationFrame en vez de setInterval. No se traba en cel
function animateMatrix() {
    drawMatrix();
    animationFrameId = requestAnimationFrame(animateMatrix);
}

// Arranca cuando la página cargó completa
window.addEventListener('load', () => {
    initMatrix();
    animateMatrix();
});

window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrameId);
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
    evalMessage.classList.add('show'); // Fix 4: classList en vez de style.display para iOS
});

closeEval.addEventListener('click', () => {
    evalMessage.classList.remove('show');
});

/* ============================
   TOGGLE RIESGOS - NO LA TOQUÉ
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