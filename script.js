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


/* ===== Scroll Reveal ===== */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
});

reveals.forEach(el => observer.observe(el));


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
