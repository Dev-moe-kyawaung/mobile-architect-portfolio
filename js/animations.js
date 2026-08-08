// ============ SCROLL ANIMATIONS ============

class ScrollAnimations {
    constructor() {
        this.initParallax();
        this.init3DElements();
        this.initFloatingElements();
        this.initTiltEffect();
        this.initGradientBackground();
    }

    // Parallax Scroll Effects
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax);
                const rect = element.getBoundingClientRect();
                const centerPoint = rect.top + rect.height / 2;
                const viewportCenter = window.innerHeight / 2;
                const delta = (centerPoint - viewportCenter) * speed;
                
                element.style.transform = `translateY(\${delta}px)`;
            });
        });
    }

    // 3D Rotating Elements
    init3DElements() {
        document.querySelectorAll('[data-3d]').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                const rotateX = y * 20;
                const rotateY = x * 20;
                
                element.style.transform = `rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'rotateX(0) rotateY(0)';
            });
        });
    }

    // Floating Elements
    initFloatingElements() {
        const elements = document.querySelectorAll('.floating-cube, .floating-circle, .floating-diamond');
        
        elements.forEach(element => {
            const speed = element.dataset.speed || 0.3;
            const startingX = Math.random() * 80 + 10;
            const startingY = Math.random() * 80 + 10;
            
            element.style.left = startingX + '%';
            element.style.top = startingY + '%';
            
            // Random animation duration
            const duration = Math.random() * 4 + 6;
            element.style.animation = `floatAround \${duration}s ease-in-out infinite`;
        });
    }

    // Tilt Effect
    initTiltEffect() {
        document.querySelectorAll('.glass-card[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) * 0.01;
                const rotateY = (x - centerX) * -0.01;
                
                card.style.transform = `rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)`;
                card.style.boxShadow = `
                    \${-rotateY * 10}px \${rotateX * 10}px 30px rgba(0, 212, 255, 0.1)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
                card.style.boxShadow = 'var(--neon-glow)';
            });
        });
    }

    // Animated Gradient Background
    initGradientBackground() {
        // Create gradient layers
        const gradientLayer = document.createElement('div');
        gradientLayer.classList.add('gradient-layer');
        
        for (let i = 0; i < 3; i++) {
            const blob = document.createElement('div');
            blob.classList.add('gradient-blob');
            blob.style.animationDelay = `\${i * 2}s`;
            gradientLayer.appendChild(blob);
        }
        
        document.body.prepend(gradientLayer);
    }
}

// Mouse Effects
class MouseEffects {
    constructor() {
        this.initGlowFollow();
        this.initTextHover();
    }

    initGlowFollow() {
        document.addEventListener('mousemove', (e) => {
            const glow = document.querySelector('.mouse-glow');
            if (glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            }
        });
    }

    initTextHover() {
        const textElements = document.querySelectorAll('h1, h2, h3, p');
        
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.color = '#00d4ff';
                element.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.color = '';
                element.style.textShadow = '';
            });
        });
    }
}

// Scroll Progress
class ScrollProgress {
    constructor() {
        this.createScrollBar();
        this.animateScrollBar();
    }

    createScrollBar() {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress-bar');
        document.body.appendChild(progressBar);
    }

    animateScrollBar() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
        });
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new MouseEffects();
    new ScrollProgress();
    
    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => revealObserver.observe(element));
});
