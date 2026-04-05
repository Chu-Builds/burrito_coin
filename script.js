// Confetti System
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 4;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 1) * 4 - 2;
        this.gravity = 0.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 4;
        this.opacity = 0.6;
        this.type = type || 'emoji';

        const emojis = ['🌯', '🌮', '🌶️', '🥑', '🍅', '🧀', '💰', '🚀', '✨'];
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.color = `hsl(${Math.random() * 60 + 10}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.015;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, this.opacity);

        if (this.type === 'emoji') {
            ctx.font = `${this.size * 2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, 0, 0);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        }

        ctx.restore();
    }
}

function createConfetti(x, y) {
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle(x, y));
    }
    if (!animationId) animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => {
        p.update();
        p.draw();
        return p.opacity > 0 && p.y < canvas.height + 50;
    });

    if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
    } else {
        animationId = null;
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Trigger Confetti with event parameter
function triggerConfetti(event, message) {
    let x, y;
    if (event && event.clientX) {
        x = event.clientX;
        y = event.clientY;
    } else {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }
    createConfetti(x, y);
    showToast(message);
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', (e) => {
    triggerConfetti(e, '📱 Mobile menu: Also fictional! Try the desktop version.');
});

// Background floating burritos
function createFloatingBurrito() {
    const burrito = document.createElement('div');
    burrito.textContent = '🌯';
    burrito.style.position = 'fixed';
    burrito.style.left = Math.random() * window.innerWidth + 'px';
    burrito.style.top = window.innerHeight + 50 + 'px';
    burrito.style.fontSize = (Math.random() * 20 + 20) + 'px';
    burrito.style.opacity = '0.08';
    burrito.style.pointerEvents = 'none';
    burrito.style.zIndex = '0';
    burrito.style.transition = 'all 10s linear';
    document.body.appendChild(burrito);

    setTimeout(() => {
        burrito.style.top = '-50px';
        burrito.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 100);

    setTimeout(() => {
        burrito.remove();
    }, 10100);
}

setInterval(createFloatingBurrito, 4000);

// Konami code easter egg
let konami = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-10);

    if (konami.join(',') === konamiCode.join(',')) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createConfetti(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 200);
        }
        showToast('🎮 Konami Code Activated! Burrito Storm Incoming!');
    }
});

// Initial welcome confetti
window.addEventListener('load', () => {
    setTimeout(() => {
        createConfetti(window.innerWidth / 2, window.innerHeight / 2);
        showToast('🌯 Welcome to $BURRITO! Remember: This is NOT real!');
    }, 500);
});