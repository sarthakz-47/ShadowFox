// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Skill Bar Animation on Scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !bar.style.width) {
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // initial check

// Projects Data
const projectsData = [
    {
        title: "Quiz Application",
        desc: "A quiz application project is a software system that allows users to answer questions, track scores, and evaluate knowledge interactively.",
        tags: ["Java", "SpringBoot", "Postgres"],
        icon: "fa-brain"
    },
    {
        title: "Virtual Voice Assistant",
        desc: "A virtual voice assistant is a software system that uses speech recognition and AI to understand voice commands and perform tasks or provide information.",
        tags: ["Python", "Django", "AI/ML"],
        icon: "fa-microphone"
    },
    {
        title: "Mood-Based Music Generator",
        desc: "A mood-based music generator is an application that analyzes a user’s emotions and suggests or plays music that matches their mood.",
        tags: ["HTML5", "CSS3", "JS"],
        icon: "fa-music"
    },
    {
        title: "Ecommerce App",
        desc: "An eCommerce app is a platform that allows users to browse products, make purchases, and manage orders online.",
        tags: ["ReactJS", "MongoDB", "NodeJs"],
        icon: "fa-shopping-cart"
    }
];

const projectsGrid = document.getElementById('projectsGrid');

function loadProjects() {
    projectsGrid.innerHTML = projectsData.map(project => `
        <div class="project-card">
            <div class="project-icon">
                <i class="fas ${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

loadProjects();

// Contact Form with validation & local storage simulation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formMessage.innerHTML = '<span style="color:#ef4444;">❌ Please fill in all fields.</span>';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        formMessage.innerHTML = '<span style="color:#ef4444;">❌ Enter a valid email address.</span>';
        return;
    }

    // Simulate sending
    formMessage.innerHTML = '<span style="color:#10b981;">✓ Message sent successfully! I\'ll get back to you soon.</span>';
    contactForm.reset();
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 3000);
});

// Sticky navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = 'var(--text-primary)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});