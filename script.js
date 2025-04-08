// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.style.transform = `translateX(${(i - index) * 120}%)`;
    });
}

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Form Validation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic
    alert('Thank you for your message! We will respond shortly.');
    form.reset();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Auth Form Handling
document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formId = form.id;

        if (formId === 'loginForm') {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            // Add login logic
            alert('Login successful! Redirecting...');
            window.location.href = 'index.html';
        }

        if (formId === 'signupForm') {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            // Add signup logic
            alert('Account created successfully! Please login.');
            window.location.href = 'login.html';
        }

        form.reset();
    });
});

// After login success in script.js
if (formId === 'loginForm') {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (email && password) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields');
    }
}

// Add to the bottom of script.js
// Check login state on dashboard pages
document.addEventListener('DOMContentLoaded', function() {
    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }
    
    // Protect dashboard pages
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (['dashboard.html', 'create-ad.html', 'monitor-ads.html'].includes(currentPage)) {
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
    
    // File upload functionality
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('adCreative');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function() {
            if (this.files.length) {
                const fileName = this.files[0].name;
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>${fileName}</p>
                    <small>Click to change</small>
                `;
                uploadArea.style.borderColor = '#10b981';
            }
        });
    }
    
    // Audience tag selection
    const tags = document.querySelectorAll('.tag');
    const audienceInput = document.getElementById('selectedAudience');
    
    if (tags.length && audienceInput) {
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                this.classList.toggle('active');
                updateSelectedAudience();
            });
        });
        
        function updateSelectedAudience() {
            const selected = Array.from(document.querySelectorAll('.tag.active'))
                                .map(tag => tag.getAttribute('data-value'));
            audienceInput.value = selected.join(',');
        }
    }
    
    // Form submission for ad creation
    const adForm = document.getElementById('adForm');
    if (adForm) {
        adForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Campaign created successfully!');
            window.location.href = 'monitor-ads.html';
        });
    }
});