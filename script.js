// 1. MENU DE CONFIGURAÇÕES (Abre e Fecha)
const settingsMenu = document.querySelector('.settings-menu');
const settingsBtn = document.getElementById('settings-toggle');

settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede que o clique feche o menu na mesma hora
    settingsMenu.classList.toggle('active');
});

// Fecha o menu se clicar em qualquer lugar fora dele
document.addEventListener('click', (e) => {
    if (!settingsMenu.contains(e.target)) {
        settingsMenu.classList.remove('active');
    }
});

// 2. LÓGICA DE TEMA
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// 3. LÓGICA DE IDIOMA
let currentLang = localStorage.getItem('lang') || 'pt';
const langToggleBtn = document.getElementById('lang-toggle');

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langToggleBtn.innerText = lang === 'pt' ? 'EN' : 'PT';
    
    document.getElementById('txt-role').innerText = translations[lang].role;
    document.getElementById('txt-bio').innerText = translations[lang].bio;
    document.getElementById('txt-linkedin').innerText = translations[lang].btnLinkedin;
    document.getElementById('txt-github').innerText = translations[lang].btnGithub;
    document.getElementById('txt-email').innerText = translations[lang].btnEmail;
    document.getElementById('txt-tech').innerText = translations[lang].techTitle;
    document.getElementById('txt-projects-title').innerText = translations[lang].projectsTitle;
    document.getElementById('txt-projects-sub').innerText = translations[lang].projectsSubtitle;
    document.getElementById('txt-footer').innerText = translations[lang].footer;
    document.getElementById('txt-chat-title').innerText = translations[lang].chatTitle;
    document.getElementById('txt-chat-welcome').innerText = translations[lang].chatWelcome;
    document.getElementById('chat-input').placeholder = translations[lang].chatPlaceholder;
}

langToggleBtn.addEventListener('click', () => {
    updateLanguage(currentLang === 'pt' ? 'en' : 'pt');
    startTypewriter(); 
});

// 4. EFEITO DE DIGITAÇÃO
function startTypewriter() {
    const textRole = document.getElementById('txt-role');
    if (window.typewriterTimeout) clearTimeout(window.typewriterTimeout);

    const roles = currentLang === 'pt' 
        ? ["Desenvolvedor Back-End | C#", "Estudante no SENAI", "Focado em AWS & Azure"]
        : ["Back-End Developer | C#", "SENAI Student", "Focused on AWS & Azure"];
    
    const oldCursor = textRole.querySelector('.cursor');
    if (oldCursor) oldCursor.remove();

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            textRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        textRole.appendChild(cursor);
        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; 
        }
        window.typewriterTimeout = setTimeout(type, typeSpeed);
    }
    type();
}

// 5. NAVBAR (Menu Hamburger Mobile e Scroll)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

navItems.forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("header, section");
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// 6. INICIALIZAÇÃO E ANIMAÇÕES
document.addEventListener("DOMContentLoaded", () => {
    updateLanguage(currentLang);
    setTimeout(startTypewriter, 1000); 

    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".gsap-reveal", {
            y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });

        gsap.from(".tech-item, .project-card", {
            scrollTrigger: {
                trigger: ".tech-stack",
                start: "top 90%", 
            },
            y: 30, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out",
            onComplete: () => {
                gsap.set(".tech-item, .project-card", {clearProps: "all"});
            }
        });
    }
});