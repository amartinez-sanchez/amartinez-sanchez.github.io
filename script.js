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

const style = document.createElement('style');
style.textContent = `
.burger.toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
.burger.toggle .line2 { opacity: 0; }
.burger.toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
`;
document.head.appendChild(style);
