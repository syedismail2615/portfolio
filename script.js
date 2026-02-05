/* ===== Animated Background Canvas ===== */

class AnimatedBackground {
    constructor() {
        this.canvas = document.getElementById('bgCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.stars = [];
        this.particles = [];
        this.time = 0;
        
        this.initStars();
        this.initParticles();
        
        window.addEventListener('resize', () => this.handleResize());
        this.animate();
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
    
    initStars() {
        const starCount = Math.floor(this.width * this.height / 4000);
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 0.4 + 0.15,
                opacity: Math.random() * 0.2 + 0.05,
                twinkleSpeed: Math.random() * 0.012 + 0.004,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    initParticles() {
        const particleCount = Math.floor(this.width * this.height / 12000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                radius: Math.random() * 0.6 + 0.15,
                opacity: Math.random() * 0.15 + 0.03,
                baseOpacity: Math.random() * 0.15 + 0.03
            });
        }
    }
    
    drawStars() {
        this.stars.forEach(star => {
            star.phase += star.twinkleSpeed;
            const twinkle = Math.abs(Math.sin(star.phase)) * 0.6 + 0.2;
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(star.opacity * twinkle * 0.6, 0.02)})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < -10) particle.x = this.width + 10;
            if (particle.x > this.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.height + 10;
            if (particle.y > this.height + 10) particle.y = -10;
            
            // Gentle pulse
            const pulseFactor = Math.sin(this.time * 0.0015 + particle.x * 0.0005) * 0.25 + 0.75;
            
            this.ctx.fillStyle = `rgba(150, 180, 220, ${Math.max(particle.baseOpacity * pulseFactor * 0.5, 0.01)})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * pulseFactor, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        // Simple dark space background
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw elements
        this.drawParticles();
        this.drawStars();
        
        this.time++;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animated background
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedBackground();
});

/* ===== Typing Effect ===== */

const text = ["AI & ML Student", "Python Developer", "Future AI Engineer"];
let index = 0;
let char = 0;
const typing = document.getElementById("typing");

function typeEffect() {
    if (char < text[index].length) {
        typing.textContent += text[index].charAt(char);
        char++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (char > 0) {
        typing.textContent = text[index].substring(0, char - 1);
        char--;
        setTimeout(eraseEffect, 40);
    } else {
        index = (index + 1) % text.length;
        setTimeout(typeEffect, 200);
    }
}

typeEffect();

/* ===== Scroll-triggered animations ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
}, observerOptions);

reveals.forEach(el => observer.observe(el));

/* ===== Smooth scroll with scale effect on hero ===== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const scrollProgress = Math.min(scrolled / heroHeight, 1);
        hero.style.opacity = 1 - scrollProgress * 0.3;
    }
});

/* ===== Mouse parallax effect on profile ===== */
const profile = document.querySelector('.profile');
if (profile) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 20;
        const y = (window.innerHeight / 2 - e.clientY) / 20;
        profile.style.transform = `translateX(${x}px) translateY(${y}px) rotateY(-90deg) scale(1)`;
    });
    
    document.addEventListener('mouseleave', () => {
        profile.style.transform = 'translateX(0) translateY(0) rotateY(0) scale(1)';
    });
}

/* ===== Card hover lift effect ===== */
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

/* ===== Mobile Menu Toggle ===== */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if(menuToggle && navLinks){
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

/* ===== Web3Forms Contact Submission ===== */
const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const formData = new FormData(contactForm);

        if(btn) btn.disabled = true;
        if(formMessages) { formMessages.className = ''; formMessages.textContent = 'Sending...'; }

        try{
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const json = await res.json();
            if(json.success){
                if(formMessages){ formMessages.className = 'success'; formMessages.textContent = 'Message sent — thank you!'; }
                contactForm.reset();
            } else {
                if(formMessages){ formMessages.className = 'error'; formMessages.textContent = json.message || 'Submission failed.'; }
            }
        } catch(err){
            if(formMessages){ formMessages.className = 'error'; formMessages.textContent = 'Network error, please try again.'; }
        } finally {
            if(btn) btn.disabled = false;
            setTimeout(()=>{ if(formMessages){ formMessages.textContent=''; formMessages.className=''; } }, 6000);
        }
    });
}
