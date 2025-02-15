class Particle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.size = Math.random() * 30 + 20; // Increased size between 20 and 50
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 20) + 1; // Reduced density for smoother movement
        this.distance = 150; // Increased interaction distance
        this.icon = new Image();
        this.icon.src = this.getRandomIcon();
        this.angle = Math.random() * 360;
        this.speed = 0.02; // Reduced rotation speed
        this.opacity = Math.random() * 0.7 + 0.4; // Random opacity between 0.3 and 0.8
        // Add floating animation properties
        this.floatAngle = Math.random() * 360;
        this.floatSpeed = 0.02 + Math.random() * 0.01;
        this.floatRadius = 30 + Math.random() * 20;
        this.rotationSpeed = 0.01 + Math.random() * 0.01;
    }

    getRandomIcon() {
        const icons = [
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2U1ZTdlYiI+PHBhdGggZD0iTTQgOGg0VjRINHY0em02IDEyaDR2LTRoLTR2NHptLTYgMGg0di00SDR2NHptMC02aDR2LTRINHY0em02IDBo'+
            'NHYtNGgtNHY0em02LTEwaDR2LTRoLTR2NHptLTYgNGg0VjhoLTR2NHptNiA2aDR2LTRoLTR2NHptMC02aDR2LTRoLTR2NHoiLz48L3N2Zz4=',
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2U1ZTdlYiI+PHBhdGggZD0iTTE5IDNINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDVWNWgxNHYxNHoiLz48L3N2Zz4=',
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2U1ZTdlYiI+PHBhdGggZD0iTTE5IDNINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0tMiAxNkg3di0yaDEwdjJ6bTAtNEg3di0yaDEwdjJ6bTAtNEg3VjdoMTB2MnoiLz48L3N2Zz4='
        ];
        return icons[Math.floor(Math.random() * icons.length)];
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.icon, -this.size/2, -this.size/2, this.size, this.size);
        this.ctx.restore();
    }

    update(mouse) {
        // Update floating movement
        this.floatAngle += this.floatSpeed;
        const dx = Math.sin(this.floatAngle) * this.floatRadius;
        const dy = Math.cos(this.floatAngle * 0.7) * this.floatRadius;
        
        // Smooth rotation
        this.angle += this.rotationSpeed;

        // Calculate target position (base position + floating offset)
        const targetX = this.baseX + dx;
        const targetY = this.baseY + dy;

        // Mouse interaction
        const mouseDistance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        if (mouseDistance < this.distance) {
            const force = (this.distance - mouseDistance) / this.distance;
            const directionX = (mouse.x - this.x) / mouseDistance;
            const directionY = (mouse.y - this.y) / mouseDistance;
            
            // Push away from mouse
            this.x -= directionX * force * this.density;
            this.y -= directionY * force * this.density;
        } else {
            // Return to floating position
            const returnX = targetX - this.x;
            const returnY = targetY - this.y;
            
            this.x += returnX * 0.05;
            this.y += returnY * 0.05;
        }
    }
}

class ParticleCanvas {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: undefined,
            y: undefined
        };

        this.init();
        this.animate();
    }

    init() {
        // Set canvas size
        this.resize();

        // Create particles with adjusted density
        // Lower divisor = more particles (original: 25000)
        const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000); // Increased number of particles
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new Particle(this.canvas, x, y));
        }

        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouse(e));
        window.addEventListener('touchmove', (e) => this.handleTouch(e));
    }

    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    handleMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    handleTouch(e) {
        if (e.touches.length > 0) {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.touches[0].clientX - rect.left;
            this.mouse.y = e.touches[0].clientY - rect.top;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the canvas when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleCanvas();
}); 