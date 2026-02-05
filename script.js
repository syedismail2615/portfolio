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
