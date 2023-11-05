import { Module } from '../core/module';

export class CanvasParticlesModule extends Module {
  constructor() {
    super('canvasParticles', 'Динамический фон в виде волн');
    this.canvas = null;
    this.ctx = null;
    this.frameCount = 0;
    this.animationFrameId = null; 
    this.animate = this.animate.bind(this); 
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    document.body.insertBefore(this.canvas, document.body.firstChild);
    this.ctx = this.canvas.getContext('2d');
  }

  startAnimating() {
    if (!this.animationFrameId) {
      this.animate();
    }
  }

  stopAnimating() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
   
   animate() {
    if (!this.ctx) {    
    console.error("Контекст канваса не инициализирован");
    return;
  }
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#9fcdff'; 
    this.ctx.beginPath();
    
    let frequency = 0.01;
    let amplitude = 60;
    let waveSpeed = this.frameCount * 0.03; 

    for (let i = 0; i < this.canvas.width; i++) {      
      let waveHeight = Math.sin(i * frequency + waveSpeed) * amplitude;      
      this.ctx.lineTo(i, this.canvas.height / 2 + waveHeight);
    }

    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.fill();

    this.frameCount++;
  }
  trigger() {    
    if (this.animationFrameId) {      
      this.stopAnimating();
    } else {      
      this.startAnimating();
    }
  }
}

export default CanvasParticlesModule;
