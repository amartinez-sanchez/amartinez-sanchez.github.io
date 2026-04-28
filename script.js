// ── Burger menu ──
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// ── Hero particle constellation ──
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const PARTICLE_COUNT = 80;
const CONNECT_DIST   = 150;
const COLOR          = '34,211,238';

const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.4 + 0.4,
    vx:    (Math.random() - 0.5) * 0.28,
    vy:    (Math.random() - 0.5) * 0.28,
    alpha: Math.random() * 0.4 + 0.1,
}));

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)            p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0)            p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
                const alpha = (1 - dist / CONNECT_DIST) * 0.1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
                ctx.lineWidth   = 1;
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${p.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(drawFrame);
}
drawFrame();

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.timeline-item, .pub-item, .project-card, .research-card, .info-card'
).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});
