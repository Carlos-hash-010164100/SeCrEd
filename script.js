// MATRIX
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeMatrixCanvas() {
    const hero = document.querySelector('.hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
}
resizeMatrixCanvas();

const letters = '01#@$%&*<>[]{}';
const fontSize = 22;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 15, 31, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#c8f6ff';
    ctx.font = fontSize + 'px monospace';

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    resizeMatrixCanvas();
    columns = canvas.width / fontSize;
    drops = Array(Math.floor(columns)).fill(1);
});

// MENÚ HACKER
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

// BOTÓN SOLICITAR EVALUACIÓN
const evalBtn = document.getElementById('eval-btn');
const evalMessage = document.getElementById('eval-message');

evalBtn.addEventListener('click', () => {
    if (evalMessage.style.display === 'block') {
        evalMessage.style.display = 'none';
    } else {
        evalMessage.style.display = 'block';
    }
});
