/* =========================================
   1. CONFIGURATION & DATA
========================================= */
const CONFIG = {
    scrollOffset: 100, // Offset for navbar height when scrolling
    animationThreshold: 0.2
};

const projectsData = [
    {
        title: "Portfolio Website",
        description: "A high-performance personal portfolio featuring smooth animations, responsive layout, and a modern dark aesthetic.",
        tech: "HTML5, CSS3, JavaScript"
    },
    {
        title: "Kishan AI – AgriTech",
        description: "AI-powered assistant providing farmers with real-time crop insights, weather forecasts, and pest control solutions.",
        tech: "Python, Django, JS, AI Models"
    },
    {
        title: "Corporate Business Site",
        description: "Developed a scalable business website focused on SEO optimization, fast load times, and cross-browser compatibility.",
        tech: "HTML, CSS, JavaScript"
    }
];

/* =========================================
   2. DYNAMIC CONTENT INJECTION
========================================= */
const loadProjects = () => {
    const container = document.getElementById("projects-container");
    if (!container) return;

    projectsData.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card", "animate-on-scroll");

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="tech-stack">${project.tech}</span>
        `;
        container.appendChild(card);
    });
};

/* =========================================
   3. SCROLL & ANIMATION LOGIC
========================================= */
const initAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                
                // Add stagger effect to skills if the parent is visible (optional enhancement)
                if(entry.target.classList.contains('skill-card')) {
                   // logic handled by CSS transition delay if needed, 
                   // or we can leave it simple as is.
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: CONFIG.animationThreshold });

    // Observe static elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // Note: Dynamic projects are added to observer after injection
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
    }, 100);
};

/* =========================================
   4. NAVIGATION HANDLING
========================================= */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - CONFIG.scrollOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
};

const updateActiveLink = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - CONFIG.scrollOffset - 50)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
};

/* =========================================
   5. FORM HANDLING
========================================= */
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        // Simulate sending (Professional feedback)
        btn.innerText = "Sending...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            btn.innerText = "Message Sent! ✅";
            btn.style.background = "#10b981"; // Success Green
            btn.style.color = "#fff";
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = ""; // Reverts to CSS variable
                btn.style.opacity = "1";
            }, 3000);
        }, 1500);
    });
};

/* =========================================
   INITIALIZATION
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initAnimations();
    initSmoothScroll();
    updateActiveLink();
    initContactForm();
});