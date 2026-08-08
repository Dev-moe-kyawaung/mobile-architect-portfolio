// ============ SPECTRAL ROUTER ============

class SpectralRouter {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/about': 'pages/about.html',
            '/skills': 'pages/skills.html',
            '/roadmap': 'pages/roadmap.html',
            '/gallery': 'pages/gallery.html',
            '/architecture': 'pages/architecture.html',
            '/benchmarks': 'pages/benchmarks.html',
            '/ci-cd': 'pages/ci-cd.html'
        };
        
        this.initRouter();
        this.initNavigation();
    }

    initRouter() {
        window.addEventListener('popstate', () => {
            this.route(window.location.pathname);
        });
        
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.origin === window.location.origin && link.dataset.spa !== 'false') {
                e.preventDefault();
                e.stopPropagation();
                
                const href = link.getAttribute('href');
                this

ဆက်လက်ဖော်ပြပေးလိုက်ပါတယ်။ အောက်ပါတို့သည် ဆက်လက်ရေးသားရန် လိုအပ်သော အပိုင်းများဖြစ်သည်-

## 📄 js/router.js (ဆက်လက်)

```javascript
// ============ SPECTRAL ROUTER (ဆက်လက်) ============

    initNavigation() {
        // Active link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('[data-page-section]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.id;
                }
            });
            
            document.querySelectorAll('.nav-link[data-nav]').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.nav === currentSection) {
                    link.classList.add('active');
                }
            });
        });
    }

    route(path) {
        const page = this.routes[path] || this.routes['/'];
        
        // Show loading overlay
        this.showLoading();
        
        // Fetch the page content
        fetch(page)
            .then(response => response.text())
            .then(html => {
                setTimeout(() => {
                    this.renderPage(html);
                    this.hideLoading();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500); // Add delay for effect
            })
            .catch(error => {
                console.error('Route error:', error);
                this.showError();
            });
    }

    renderPage(html) {
        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the content
        const content = doc.querySelector('[data-page-content]');
        const title = doc.querySelector('title')?.innerText || '';
        
        // Update document title
        document.title = title;
        
        // Get the main content area
        const mainContent = document.querySelector('[data-page-content]');
        
        if (mainContent && content) {
            // Add transition class
            mainContent.classList.add('page-transition-out');
            
            setTimeout(() => {
                // Replace the content
                mainContent.innerHTML = content.innerHTML;
                mainContent.classList.remove('page-transition-out');
                mainContent.classList.add('page-transition-in');
                
                // Reinitialize scripts and animations
                this.initializePageScripts();
            }, 300);
        }
    }

    initializePageScripts() {
        // Reinitialize particles if present
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            // Initialize particle system
        }
        
        // Reinitialize animations
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('reveal');
        });
        
        // Initialize reveal observers
        this.initRevealObservers();
        
        // Initialize chart animations
        if (typeof Chart !== 'undefined') {
            this.initializeCharts();
        }
        
        // Reinitialize any page-specific functionality
        const handler = window['pageHandler'];
        if (typeof handler === 'function') {
            handler();
        }
    }

    initRevealObservers() {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        revealElements.forEach(element => observer.observe(element));
    }

    initializeCharts() {
        document.querySelectorAll('[data-chart]').forEach((canvas, index) => {
            const chartType = canvas.dataset.chart;
            const chartData = this.getChartData(chartType, index);
            
            if (chartData) {
                new Chart(canvas, chartData);
            }
        });
    }

    getChartData(type, index) {
        const charts = {
            'fps': {
                type: 'line',
                data: {
                    labels: Array.from({length: 24}, (_, i) => `\${i}h`),
                    datasets: [{
                        label: 'FPS',
                        data: Array.from({length: 24}, () => 55 + Math.random() * 15),
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            },
            'memory': {
                type: 'bar',
                data: {
                    labels: ['Startup', 'List View', 'Detail View', 'Image Load', 'Video Play'],
                    datasets: [{
                        label: 'Memory (MB)',
                        data: [25, 32, 28, 35, 30],
                        backgroundColor: 'rgba(123, 47, 247, 0.6)',
                        borderColor: '#7b2ff7',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutBounce'
                    }
                }
            },
            'startup': {
                type: 'doughnut',
                data: {
                    labels: ['Kotlin Init', 'Layout Inflation', 'Data Load', 'Rendering'],
                    datasets: [{
                        data: [20, 30, 40, 10],
                        backgroundColor: [
                            '#00d4ff',
                            '#7b2ff7',
                            '#ff6b6b',
                            '#00ff88'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 2000
                    }
                }
            }
        };
        
        return charts[type] || null;
    }

    showLoading() {
        const loader = document.querySelector('.router-loader');
        if (loader) {
            loader.classList.add('active');
        }
    }

    hideLoading() {
        const loader = document.querySelector('.router-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.remove('active');
            }, 500);
        }
    }

    showError() {
        console.error('Error loading page');
        // Show error toast
        if (typeof toast !== 'undefined') {
            toast.show('Error loading page', 'error');
        }
    }

    // Navigation helpers
    navigate(path) {
        window.history.pushState({}, '', path);
        this.route(path);
    }

    replace(path) {
        window.history.replaceState({}, '', path);
        this.route(path);
    }

    static instance() {
        if (!SpectralRouter._instance) {
            SpectralRouter._instance = new SpectralRouter();
        }
        return SpectralRouter._instance;
    }
}

// Initialize router
document.addEventListener('DOMContentLoaded', () => {
    window.router = SpectralRouter.instance();
    
    // Handle initial route
    const path = window.location.pathname;
    window.router.route(path);
});
