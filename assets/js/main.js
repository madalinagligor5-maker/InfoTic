/**
 * Catalog360.ro - Main JavaScript
 * Educational Platform for Computer Science & ICT
 * Grades 5-8 (Clasele V-VIII)
 */

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const classCards = document.querySelectorAll('.class-card');

// ============================================
// Navbar Scroll Effect
// ============================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// Mobile Menu Toggle
// ============================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('click', toggleTheme);

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

loadThemePreference();

// ============================================
// Scroll to Top Button
// ============================================
function handleScrollTopButton() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScrollTopButton);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or external link
        if (href === '#' || href.startsWith('#!')) {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Class Cards Progress Animation
// ============================================
function animateClassCards() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const progress = card.querySelector('.progress');
                
                // Simulate progress (in real app, this would come from user data)
                const randomProgress = Math.floor(Math.random() * 30);
                progress.style.width = `${randomProgress}%`;
                
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    classCards.forEach(card => {
        observer.observe(card);
    });
}

animateClassCards();

// ============================================
// Contact Form Handling
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nume = document.getElementById('nume').value;
        const email = document.getElementById('email').value;
        const mesaj = document.getElementById('mesaj').value;
        
        // Simple validation
        if (!nume || !email || !mesaj) {
            showNotification('Te rugăm să completezi toate câmpurile!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Te rugăm să introduci un email valid!', 'error');
            return;
        }
        
        // Simulate form submission (in real app, this would be an API call)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Mesajul tău a fost trimis cu succes! Îți vom răspunde în curând.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        border-left: 4px solid ${getNotificationColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#22c55e';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#2563eb';
    }
}

// Add notification animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #334155;
        font-weight: 500;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        color: #64748b;
        transition: color 0.2s;
    }
    
    .notification-close:hover {
        color: #ef4444;
    }
`;
document.head.appendChild(style);

// ============================================
// Mascot Interactive Features
// ============================================
const mascotSvg = document.querySelector('.mascot-svg');

if (mascotSvg) {
    // Make mascot eyes follow mouse (desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const pupils = document.querySelectorAll('.eye-pupil-left, .eye-pupil-right');
            const eyes = document.querySelectorAll('.eye-left, .eye-right');
            
            pupils.forEach((pupil, index) => {
                const eye = eyes[index];
                const rect = eye.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;
                
                const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
                const distance = Math.min(5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 50);
                
                const newX = Math.cos(angle) * distance;
                const newY = Math.sin(angle) * distance;
                
                pupil.setAttribute('cx', parseFloat(pupil.getAttribute('cx')) + newX);
                pupil.setAttribute('cy', parseFloat(pupil.getAttribute('cy')) + newY);
            });
        });
    }
}

// ============================================
// Newsletter Form Handling
// ============================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!isValidEmail(email)) {
            showNotification('Te rugăm să introduci un email valid!', 'error');
            return;
        }
        
        // Simulate subscription
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Te-ai abonat cu succes la newsletter!', 'success');
            emailInput.value = '';
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ============================================
// Parallax Effect for Hero Section
// ============================================
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (scrolled < heroSection.offsetHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// ============================================
// Animate Elements on Scroll
// ============================================
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.feature-card, .class-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

animateOnScroll();

// ============================================
// Loading Animation Complete
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('Catalog360.ro - Platform loaded successfully! 🎓');
});

// ============================================
// Easter Egg - Konami Code
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    showNotification('🎉 Ai descoperit Easter Egg-ul! Felicitări! 🎮', 'success');
    
    // Fun animation for the mascot
    const mascot = document.querySelector('.mascot-svg');
    if (mascot) {
        mascot.style.animation = 'spin 2s ease-in-out';
        setTimeout(() => {
            mascot.style.animation = '';
        }, 2000);
    }
}

// Add spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(spinStyle);

// ============================================
// Performance Optimization - Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler
const debouncedScrollHandler = debounce(handleNavbarScroll, 10);
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', debouncedScrollHandler);
