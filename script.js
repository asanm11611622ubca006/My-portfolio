/* =========================================
    Portfolio JavaScript - Chandra Kumar S
    ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─── KPI Counter Animation ───
    function animateKPICounters() {
        const counters = document.querySelectorAll('.kpi-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            updateCounter();
        });
    }

    // ─── Skill Bar Animation ───
    function animateSkillBars() {
        prepareBars('.skill-bar-fill, .progress-bar-fill');
    }

    // ─── Chart.js Skills Radar Chart ───
    const radarCtx = document.getElementById('skillsRadarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Python', 'ML', 'Deep Learning', 'LLM/RAG', 'FastAPI', 'React', 'Cloud', 'Databases'],
                datasets: [{
                    label: 'Skill Level',
                    data: [95, 90, 85, 88, 92, 80, 78, 82],
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: 'rgba(108, 99, 255, 0.8)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(108, 99, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(108, 99, 255, 1)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            display: false,
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#9898b0',
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // ─── Chart.js Skills Donut Chart ───
    const donutCtx = document.getElementById('skillsDonutChart');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['AI/ML', 'Backend', 'Frontend', 'Cloud', 'Tools'],
                datasets: [{
                    data: [35, 25, 15, 15, 10],
                    backgroundColor: [
                        'rgba(108, 99, 255, 0.8)',
                        'rgba(0, 212, 170, 0.8)',
                        'rgba(255, 107, 157, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(104, 104, 160, 0.8)'
                    ],
                    borderColor: 'rgba(17, 17, 24, 0.8)',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#9898b0',
                            padding: 12,
                            font: {
                                size: 10
                            },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                }
            }
        });
    }

    // ─── Prepare bar widths (start at 0 so CSS can animate them) ───
    function prepareBars(selector) {
        var bars = document.querySelectorAll(selector);
        for (var i = 0; i < bars.length; i++) {
            var bar = bars[i];
            var width = bar.getAttribute('data-width');
            if (width) {
                bar.style.setProperty('--target-width', width + '%');
                bar.style.width = '0%';
            }
        }
    }

    // ─── Per-Section Scroll Animations (8 unique styles) ───
    var sectionObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (!entry.isIntersecting) continue;
            var section = entry.target;
            var id = section.id;
            section.classList.add('is-animating');

            if (id === 'home') {
                animateKPICounters();
            }
            if (id === 'skills') {
                prepareBars('.skill-bar-fill, .progress-bar-fill');
            }
            if (id === 'experience') {
                prepareBars('.progress-bar-fill');
            }

            sectionObserver.unobserve(section);
        }
    }, { threshold: 0.12, rootMargin: '0px 0px -90px 0px' });

    var allSections = document.querySelectorAll('section');
    for (var i = 0; i < allSections.length; i++) {
        sectionObserver.observe(allSections[i]);
    }

    // Animate immediately if user has already scrolled past a section
    function handlePreScroll() {
        var rect;
        var id;
        for (var i = 0; i < allSections.length; i++) {
            var section = allSections[i];
            rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && !section.classList.contains('is-animating')) {
                section.classList.add('is-animating');
                id = section.id;
                if (id === 'home') animateKPICounters();
                if (id === 'skills') prepareBars('.skill-bar-fill, .progress-bar-fill');
                if (id === 'experience') prepareBars('.progress-bar-fill');
            }
        }
    }
    handlePreScroll();
    window.addEventListener('scroll', handlePreScroll, { passive: true });

    // ─── Particle Background ───
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Mouse interaction for particles
    let particleMouseX = 0;
    let particleMouseY = 0;
    const particleColors = [
        'rgba(139, 92, 246, ',   // purple
        'rgba(6, 182, 212, ',    // teal
        'rgba(244, 114, 182, '   // pink
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.colorIndex = Math.floor(Math.random() * particleColors.length);
        }
        update() {
            // Repel from mouse
            const dx = this.x - particleMouseX;
            const dy = this.y - particleMouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (150 - dist) / 150;
            const directionX = forceDirectionX * force * 0.5;
            const directionY = forceDirectionY * force * 0.5;

            if (dist < 150) {
                this.x += directionX;
                this.y += directionY;
            } else {
                this.x += this.speedX;
                this.y += this.speedY;
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = particleColors[this.colorIndex] + this.opacity + ')';
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ─── Cursor Glow ───
    const cursorGlow = document.getElementById('cursorGlow');
    
    // Interactive Glow Orbs (Mouse Follow with different speeds)
    const glowOrbs = document.querySelectorAll('.interactive-glow');
    let mouseX = 0;
    let mouseY = 0;
    let orbX = [0, 0, 0];
    let orbY = [0, 0, 0];

    document.addEventListener('mousemove', (e) => {
        // Cursor glow
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';

        // Update mouse position for glow orbs
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update mouse position for particles
        particleMouseX = e.clientX;
        particleMouseY = e.clientY;
    });

    // Animate glow orbs with smooth follow
    function animateGlowOrbs() {
        const speeds = [0.15, 0.08, 0.05];
        const offsets = [
            { x: -100, y: -100 },
            { x: 150, y: 50 },
            { x: -50, y: 100 }
        ];

        glowOrbs.forEach((orb, index) => {
            // Smooth lerp towards mouse with offset
            orbX[index] += (mouseX + offsets[index].x - orbX[index]) * speeds[index];
            orbY[index] += (mouseY + offsets[index].y - orbY[index]) * speeds[index];

            orb.style.left = orbX[index] + 'px';
            orb.style.top = orbY[index] + 'px';
        });

        requestAnimationFrame(animateGlowOrbs);
    }
    animateGlowOrbs();

    // ─── Magnetic Button Effect ───
    document.querySelectorAll('.btn.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ─── Navbar Scroll ───
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ─── Mobile Nav Toggle ───
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ─── Active Nav Link on Scroll ───
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ─── Typed Text Effect ───
    const titles = [
        'AI Engineer',
        'ML Developer',
        'Full-Stack AI Builder',
        'Deep Learning Enthusiast',
        'LLM Application Developer'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedText = document.getElementById('typedText');

    function typeEffect() {
        const current = titles[titleIndex];

        if (!isDeleting) {
            typedText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        } else {
            typedText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
        }

        const speed = isDeleting ? 40 : 80;
        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // ─── Smooth scroll for anchor links ───
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

    // ─── Project cards tilt effect ───
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
});


// ─── Lightbox Functions (Global) ───
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    img.src = src;
    cap.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on background click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
