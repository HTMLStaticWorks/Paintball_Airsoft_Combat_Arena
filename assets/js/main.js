// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Light/Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            // Update icon if using font-awesome or similar
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }

    // 2. RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const htmlEl = document.documentElement;
            const currentDir = htmlEl.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlEl.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });

        // Load saved dir
        const savedDir = localStorage.getItem('dir');
        if (savedDir === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        }
    }

    // 3. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navCenter = document.querySelector('.nav-center');
    const navRight = document.querySelector('.nav-right');
    const navbar = document.querySelector('.navbar');
    
    if (mobileToggle && navCenter && navRight && navbar) {
        const navMenu = document.createElement('div');
        navMenu.className = 'nav-menu';
        
        navMenu.appendChild(navCenter);
        navMenu.appendChild(navRight);
        navbar.insertBefore(navMenu, mobileToggle);

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 4. Tactical Animations on Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                if (entry.target.classList.contains('tactical-card')) {
                    entry.target.classList.add('anim-hud-enter');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const tacticalCards = document.querySelectorAll('.tactical-card');
    tacticalCards.forEach(card => {
        // Initially set opacity to 0 in CSS or via JS for the animation to work smoothly
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // 7. Password Visibility Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            } else {
                input.type = 'password';
                this.innerHTML = '<svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            }
        });
    });
});
