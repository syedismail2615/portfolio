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
