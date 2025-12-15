// API Configuration
const API_URL = 'http://localhost:5000/api';

// Utility function to show alerts
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add CSS for alert animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Modal Popup Functionality
window.addEventListener('load', function () {
    const modal = document.getElementById('welcomeModal');
    const closeBtn = document.querySelector('.close');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Show modal only on first visit (not on subsequent page navigations)
    if (!sessionStorage.getItem('popupShown')) {
        modal.classList.remove('hidden');
        sessionStorage.setItem('popupShown', 'true');
    } else {
        modal.classList.add('hidden');
    }

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function () {
        modal.classList.add('hidden');
    });

    // Close modal when button is clicked
    closeModalBtn.addEventListener('click', function () {
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Add scroll animation for elements
    observeElements();
});

// Intersection Observer for scroll animations
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    const elements = document.querySelectorAll('.feature-card, .page-content section');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });
}

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation || 
            (currentLocation === '/' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9\-\+\s()]{10,}$/;
    return phoneRegex.test(phone);
}

// Smooth scrolling for anchor links
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

// Add ripple effect to buttons
document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple if any
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// Add input focus animation
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function () {
        this.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.style.transform = 'scale(1)';
    });
});

// Feature card click interaction: mark selected card as active
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.feature-card');
    if (!cards || cards.length === 0) return;

    cards.forEach((card, idx) => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', function () {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });

        // keyboard accessibility: Enter or Space to select
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});

