// ============ 3D PARTICLE SYSTEM ============

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isRunning = false;
        
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create particles
        this.particles = [];
        const particleCount = 80;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle());
        }
        
        // Set up event listeners
        window.addEventListener('resize', () => this.handleResize());
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.start();
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            z: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r: Math.random() * 2 + 1,
            color: this.getRandomNeonColor(),
            alpha: Math.random() * 0.5 + 0.5,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2
        };
    }

    getRandomNeonColor() {
        const colors = ['#00d4ff', '#7b2ff7', '#ff6b6b', '#0066ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx * particle.z;
            particle.y += particle.vy * particle.z;
            particle.rotation += particle.rotationSpeed;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const mouseDistance = Math.sqrt(dx * dx + dy * dy);
            
            if (mouseDistance < 150) {
                const force = 2;
                particle.x += (dx / mouseDistance) * force;
                particle.y += (dy / mouseDistance) * force;
            }
            
            // Wrap around edges with padding
            if (particle.x < -10) particle.x = this.canvas.width + 10;
            if (particle.x > this.canvas.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.canvas.height + 10;
            if (particle.y > this.canvas.height + 10) particle.y = -10;
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            
            // Pulse effect
            const pulse = Math.sin(Date.now() * 0.002 + particle.alpha) * 0.3;
            particle.alpha += particle.alpha * pulse * 0.5;
            particle.alpha = Math.min(particle.alpha, 1);
            
            this.ctx.shadowBlur = particle.alpha * 20;
            this.ctx.shadowColor = particle.color;
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.globalCompositeOperation = 'lighter';
            
            // Draw different shapes
            if (particle.rotation % 3 < 1) {
                // Circle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.r, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (particle.rotation % 3 < 2) {
                // Triangle
                this.ctx.beginPath();
                this.ctx.moveTo(particle.r, 0);
                this.ctx.lineTo(-particle.r * 0.5, particle.r * 0.87);
                this.ctx.lineTo(-particle.r * 0.5, -particle.r * 0.87);
                this.ctx.closePath();
                this.ctx.fill();
            } else {
                // Square
                this.ctx.fillRect(-particle.r, -particle.r, particle.r * 2, particle.r * 2);
            }
            
            this.ctx.restore();
        });
        
        // Draw connection lines
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 212, 255, \${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        if (this.isRunning) {
            requestAnimationFrame(() => this.animate());
        }
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Update particle positions
        this.particles.forEach(particle => {
            particle.x = Math.random() * this.canvas.width;
            particle.y = Math.random() * this.canvas.height;
        });
    }

    start() {
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }
}

// Global instance
let particleSystem = null;

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        particleSystem = new ParticleSystem(canvas);
    }
});
