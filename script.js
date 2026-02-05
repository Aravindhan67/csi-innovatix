// script.js - Interactivity for CSI Innovatix

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Staggered reveal for event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // 5. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 6. Dynamic Visitor Counter
    const createVisitorBadge = () => {
        const badge = document.createElement('div');
        badge.className = 'visitor-badge glass';
        badge.innerHTML = `
            <div class="visitor-pulse" title="Live"></div>
            <span><i class="fas fa-users" style="margin-right: 5px; color: var(--primary);"></i> <span id="visitor-count">124</span> Live Now</span>
        `;
        document.body.appendChild(badge);

        const countEl = document.getElementById('visitor-count');

        // Use localStorage to persist a base count if it doesn't exist
        let baseCount = localStorage.getItem('innovatix_visitor_base');
        if (!baseCount) {
            baseCount = Math.floor(Math.random() * (150 - 80 + 1)) + 80;
            localStorage.setItem('innovatix_visitor_base', baseCount);
        } else {
            baseCount = parseInt(baseCount);
        }

        const updateCount = () => {
            // Simulate random traffic fluctuations
            const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
            let currentCount = baseCount + variation;

            // Keep it in a reasonable range
            if (currentCount < 50) currentCount = 50;

            countEl.innerText = currentCount;

            // Random interval for next update
            const nextUpdate = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;
            setTimeout(updateCount, nextUpdate);
        };

        updateCount();
    };

    createVisitorBadge();
});

