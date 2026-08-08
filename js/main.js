// ============ MAIN APPLICATION LOGIC ============

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initPreloader();
        this.initNavigation();
        this.initThemeToggle();
        this.initLanguageToggle();
        this.initAnimations();
        this.initTypingEffect();
        this.initCounter();
        this.initSmoothScroll();
        this.initBackToTop();
        this.initCursor();
        this.initSkillBars();
        this.initGalleryFilter();
        this.initContactForm();
        this.initContextMenu();
        this.initPageRouter();
    }

    // Preloader
    initPreloader() {
        const preloader = document.querySelector('.preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 1000);
        });
    }

    // Navigation
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#\${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Theme Toggle
    initThemeToggle() {
        const themeSwitch = document.getElementById('themeSwitch');
        const body = document.body;
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeSwitch) {
            themeSwitch.checked = savedTheme === 'light';
            themeSwitch.addEventListener('change', () => {
                const theme = themeSwitch.checked ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            });
        }
    }

    // Language Toggle
    initLanguageToggle() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        document.documentElement.setAttribute('data-lang', lang);
        
        // Toggle active class
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Animations
    initAnimations() {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        sections.forEach(section => observer.observe(section));
    }

    // Typing Effect
    initTypingEffect() {
        const typewriter = document.getElementById('typewriter');
        if (!typewriter) return;
        
        const words = [
            'Android Architect',
            'Kotlin Expert',
            'Compose Specialist',
            'Mobile Innovator'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriter.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                if (wordIndex === words.length) wordIndex = 0;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }

    // Counter Animation
    initCounter() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            let count = 0;
            
            const updateCount = () => {
                const increment = target / speed;
                
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Trigger when visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                }
            });
            
            observer.observe(counter);
        });
    }

    // Smooth Scroll
    initSmoothScroll() {
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
    }

    // Back to Top
    initBackToTop() {
        const button = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Custom Cursor
    initCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Skill Bars
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.querySelector('.skill-progress');
                    const level = entry.target.dataset.level;
                    progress.style.width = level + '%';
                }
            });
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    // Gallery Filter
    initGalleryFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleries = document.querySelectorAll('.gallery-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                galleries.forEach(gallery => {
                    if (filter === 'all' || gallery.dataset.category === filter) {
                        gallery.classList.remove('hidden');
                    } else {
                        gallery.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                this.showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!this.validateEmail(email)) {
                this.showAlert('Please enter a valid email', 'error');
                return;
            }
            
            // Simulate API call
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Simulate delay
                await this.sleep(2000);
                
                this.showAlert('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                this.showAlert('Failed to send message', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Custom Context Menu
    initContextMenu() {
        const contextMenu = document.getElementById('contextMenu');
        
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            contextMenu.style.display = 'block';
            const x = e.clientX;
            const y = e.clientY;
            
            const menuWidth = 180;
            const menuHeight = 200;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            contextMenu.style.left = (x + menuWidth > windowWidth ? windowWidth - menuWidth : x) + 'px';
            contextMenu.style.top = (y + menuHeight > windowHeight ? windowHeight - menuHeight : y) + 'px';
        });
        
        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });
    }

    // Page Router
    initPageRouter() {
        // Smooth page transitions
        document.querySelectorAll('a[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const target = link.dataset.page;
                this.pageTransition(target);
            });
        });
    }

    pageTransition(target) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.classList.add('scene-transition');
        overlay.style.display = 'block';
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            window.location.href = target;
        }, 500);
    }

    // Helper Functions
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+\$/.test(email);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showAlert(message, type) {
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast-notification \${type}`;
        toast.innerHTML = `
            <i class="fas \${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>\${message}</p>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
}

// Translations
const translations = {
    en: {
        years: 'Years',
        apps: 'Apps Built',
        projects: 'Projects',
        hire_me: 'Hire Me',
        view_work: 'View Work',
        about_title: 'About Me',
        about_name: 'Moe Kyaw Aung',
        about_role: 'Senior Android Architect',
        about_bio: 'Passionate mobile architect with 12 years of experience...'
    },
    mm: {
        years: 'နှစ်',
        apps: 'အက်ပ်',
        projects: 'ပရောဂျက်',
        hire_me: 'အလုပ်ခန့်',
        view_work: 'အလုပ်များ',
        about_title: 'ကျွန်ုပ်အကြောင်း',
        about_name: 'မိုးကျော်အောင်',
        about_role: 'စီနီယာအန်းဒရွိုက်ဒ်',
        about_bio: 'ချစ်စရာကောင်းတဲ့ မိုဘိုင်းပရောဂျက်...'
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
