// ── Mobile sidebar toggle ──
const sidebar        = document.getElementById('sidebar');
const mobileToggle   = document.getElementById('mobileToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('open');
    mobileToggle.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    sidebar.classList.remove('open');
    mobileToggle.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// ── Active nav link on scroll ──
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + window.innerHeight * 0.3;
    let current = '';

    sections.forEach(section => {
        if (section.id === 'hero') return;
        if (scrollY >= section.offsetTop) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ── Hero particle constellation ──
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 75;
const CONNECT_DIST   = 140;
const DOT_COLOR      = '34,211,238';

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
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(${DOT_COLOR},${(1 - dist / CONNECT_DIST) * 0.1})`;
                ctx.lineWidth   = 1;
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR},${p.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(drawFrame);
}
drawFrame();

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.timeline-item, .pub-item, .project-card, .research-card, .info-card'
).forEach(el => {
    el.classList.add('fade-up');
    revealObserver.observe(el);
});
