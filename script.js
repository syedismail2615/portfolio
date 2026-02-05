/* ===== Cinematic 4K Space Background Canvas ===== */

class CinematicSpaceBackground {
    constructor() {
        this.canvas = document.getElementById('bgCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;
        
        // Set canvas size for 4K quality
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.stars = [];
        this.particles = [];
        this.nebulae = [];
        this.time = 0;
        this.mouseX = this.width / 2;
        this.mouseY = this.height / 2;
        
        this.initStars();
        this.initParticles();
        this.initNebulae();
        
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.animate();
    }
    
    handleResize() {
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    initStars() {
        const starCount = Math.floor(this.width * this.height / 2500);
        for (let i = 0; i < starCount; i++) {
            const depth = Math.random();
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 0.8 + 0.1,
                opacity: Math.random() * 0.3 + 0.04,
                twinkleSpeed: Math.random() * 0.018 + 0.003,
                phase: Math.random() * Math.PI * 2,
                depth: depth,
                color: this.getStarColor(depth)
            });
        }
    }
    
    getStarColor(depth) {
        if (depth > 0.7) return { r: 200, g: 220, b: 255 }; // Blue stars
        if (depth > 0.4) return { r: 255, g: 200, b: 220 }; // Pink stars
        return { r: 255, g: 255, b: 200 }; // Yellow stars
    }
    
    initParticles() {
        const particleCount = Math.floor(this.width * this.height / 6000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                radius: Math.random() * 0.7 + 0.15,
                opacity: Math.random() * 0.15 + 0.02,
                baseOpacity: Math.random() * 0.15 + 0.02,
                color: this.getParticleColor(),
                life: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    getParticleColor() {
        const colors = [
            { r: 100, g: 180, b: 255 },     // Cyan
            { r: 150, g: 100, b: 255 },     // Purple
            { r: 100, g: 200, b: 255 }      // Light Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    initNebulae() {
        for (let i = 0; i < 3; i++) {
            this.nebulae.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 200 + Math.random() * 400,
                opacity: Math.random() * 0.1 + 0.02,
                colors: [
                    { r: 100, g: 50, b: 200 },
                    { r: 50, g: 100, b: 200 }
                ],
                vx: (Math.random() - 0.5) * 0.02
            });
        }
    }
    
    drawGradientBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#0a0a15');
        gradient.addColorStop(0.25, '#0f0520');
        gradient.addColorStop(0.5, '#050a20');
        gradient.addColorStop(0.75, '#0a0f20');
        gradient.addColorStop(1, '#05050f');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawNebulae() {
        this.nebulae.forEach(nebula => {
            nebula.x += nebula.vx;
            if (nebula.x < -nebula.radius) nebula.x = this.width + nebula.radius;
            if (nebula.x > this.width + nebula.radius) nebula.x = -nebula.radius;
            
            const pulseFactor = Math.sin(this.time * 0.0005 + nebula.x) * 0.4 + 0.6;
            
            for (let i = 0; i < nebula.colors.length; i++) {
                const color = nebula.colors[i];
                const grd = this.ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
                grd.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${nebula.opacity * pulseFactor * 0.8})`);
                grd.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${nebula.opacity * pulseFactor * 0.3})`);
                grd.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
                
                this.ctx.fillStyle = grd;
                this.ctx.fillRect(nebula.x - nebula.radius, nebula.y - nebula.radius, nebula.radius * 2, nebula.radius * 2);
            }
        });
    }
    
    drawStars() {
        this.stars.forEach(star => {
            star.phase += star.twinkleSpeed;
            const twinkle = Math.sin(star.phase) * 0.7 + 0.3;
            
            // Parallax effect based on mouse position
            const dx = this.mouseX - this.width / 2;
            const dy = this.mouseY - this.height / 2;
            const parallaxX = star.x + (dx * star.depth * 0.025);
            const parallaxY = star.y + (dy * star.depth * 0.025);
            
            const opacity = Math.max(star.opacity * twinkle * 0.8, 0.01);
            this.ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(parallaxX, parallaxY, star.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Star glow effect
            if (twinkle > 0.5) {
                this.ctx.shadowColor = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity * 0.6})`;
                this.ctx.shadowBlur = 6;
                this.ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity * 0.4})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(parallaxX, parallaxY, star.radius + 1.5, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.00015;
            
            if (particle.life < 0 || particle.x < -10 || particle.x > this.width + 10 || 
                particle.y < -10 || particle.y > this.height + 10) {
                this.resetParticle(particle);
            }
            
            const pulseFactor = Math.sin(this.time * 0.003 + particle.x * 0.0008) * 0.35 + 0.65;
            const opacity = Math.max(particle.baseOpacity * pulseFactor * particle.life * 0.6, 0.005);
            
            // Particle glow
            this.ctx.shadowColor = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`;
            this.ctx.shadowBlur = 10 * pulseFactor;
            
            this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * pulseFactor, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Outer glow ring
            this.ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity * 0.4})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * pulseFactor + 1.5, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.shadowBlur = 0;
        });
    }
    
    resetParticle(particle) {
        particle.x = Math.random() * this.width;
        particle.y = Math.random() * this.height;
        particle.vx = (Math.random() - 0.5) * 0.1;
        particle.vy = (Math.random() - 0.5) * 0.1;
        particle.life = 0.5;
        particle.color = this.getParticleColor();
    }
    
    drawOverlay() {
        // Premium dark overlay with vignette effect
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.55)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Subtle vignette
        const vignetteGradient = this.ctx.createRadialGradient(this.width / 2, this.height / 2, 0, 
                                                               this.width / 2, this.height / 2, 
                                                               Math.sqrt(this.width * this.width + this.height * this.height) / 2);
        vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        
        this.ctx.fillStyle = vignetteGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    animate() {
        this.drawGradientBackground();
        this.drawNebulae();
        this.drawParticles();
        this.drawStars();
        this.drawOverlay();
        
        this.time++;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cinematic background
document.addEventListener('DOMContentLoaded', () => {
    new CinematicSpaceBackground();
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
