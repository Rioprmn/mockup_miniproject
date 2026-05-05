/* ===== DISARPUS SCRIPT ===== */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Hamburger Menu ----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu on nav link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ---- Smooth Scroll for nav links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.pageYOffset >= top) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ---- Scroll-to-top button ----
    const scrollBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (scrollBtn) {
            if (window.pageYOffset > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
    }, { passive: true });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Reveal on scroll ----
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('visible'));
    }

    // ---- Add reveal class to animatable elements ----
    const animatables = document.querySelectorAll(
        '.schedule-card, .news-item, .event-featured, .overview-wrapper > *, .footer-col'
    );
    animatables.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // Re-trigger observer for newly added reveals
    if ('IntersectionObserver' in window) {
        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 90);
                    observer2.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatables.forEach(el => observer2.observe(el));
    } else {
        animatables.forEach(el => el.classList.add('visible'));
    }

    // ---- Header shadow on scroll ----
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (header) {
            if (window.pageYOffset > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
            } else {
                header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }
        }
    }, { passive: true });

    // ---- Visitor counter animation ----
    const counterEl = document.getElementById('visitorCount');
    if (counterEl) {
        const target = 124892;
        const duration = 1800;
        let start = null;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    start = null;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = Math.min((timestamp - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        counterEl.textContent = current.toLocaleString('id-ID');
                        if (progress < 1) requestAnimationFrame(step);
                    }

                    requestAnimationFrame(step);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterEl);
    }

    // ----      button click on video thumb ----
    const videoThumb = document.querySelector('.video-thumb');
    if (videoThumb) {
        videoThumb.addEventListener('click', function () {
            // In a real implementation, this would open a modal/lightbox with video
            this.style.opacity = '0.7';
            setTimeout(() => this.style.opacity = '1', 200);
        });
    }

    // ---- Debounce utility ----
    function debounce(fn, ms) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), ms);
        };
    }
});