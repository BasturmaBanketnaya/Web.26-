/**
 * HERO MODULE — The Collapse Animation
 *
 * Particles start in chaotic motion, then on click
 * they "collapse" into an organized grid (chaos → clarity).
 * A second click scatters them again.
 */

(function() {
  'use strict';

  var canvas = document.querySelector('.hero-collapse__canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var overlay = document.querySelector('.hero-collapse__overlay');
  var hint = document.querySelector('.hero-collapse__hint');
  var heroSection = canvas.closest('.hero-collapse');

  var W, H;
  var particles = [];
  var isResolved = false;

  var ORANGE = '#FF6F47';
  var NODE_COLORS = [
    'rgba(255, 111, 71, 0.8)',
    'rgba(255, 111, 71, 0.4)',
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.2)'
  ];

  var PARTICLE_COUNT = 180;
  var CONNECTION_DIST = 120;

  function resize() {
    var rect = heroSection.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    assignTargets();
  }

  function Particle(i) {
    this.i = i;
    this.x = Math.random() * (W || window.innerWidth);
    this.y = Math.random() * (H || window.innerHeight);
    this.size = Math.random() * 2.5 + 1;
    this.color = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = (Math.random() - 0.5) * 1.8;
    this.tx = 0;
    this.ty = 0;
    this.progress = 0;
  }

  Particle.prototype.update = function() {
    if (isResolved) {
      this.progress = Math.min(1, this.progress + 0.025);
      var ease = this.progress * this.progress * (3 - 2 * this.progress);
      this.x += (this.tx - this.x) * 0.04 * (1 + ease);
      this.y += (this.ty - this.y) * 0.04 * (1 + ease);
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.x += this.vx * (1 - ease);
      this.y += this.vy * (1 - ease);
    } else {
      this.progress = Math.max(0, this.progress - 0.02);
      this.x += this.vx;
      this.y += this.vy;
      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;

      var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 2) {
        this.vx = (this.vx / speed) * 2;
        this.vy = (this.vy / speed) * 2;
      }

      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function assignTargets() {
    if (!W || !H) return;
    var cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (W / H)));
    var rows = Math.ceil(PARTICLE_COUNT / cols);
    var spacingX = Math.min(40, W / (cols + 4));
    var spacingY = Math.min(40, H / (rows + 4));

    var gridW = cols * spacingX;
    var gridH = rows * spacingY;
    var startX = (W - gridW) / 2 + spacingX / 2;
    var startY = (H - gridH) / 2 + spacingY / 2;

    for (var i = 0; i < particles.length; i++) {
      var col = i % cols;
      var row = Math.floor(i / cols);
      var offsetX = (row % 2) * (spacingX / 2);
      particles[i].tx = startX + col * spacingX + offsetX;
      particles[i].ty = startY + row * spacingY;
    }
  }

  function drawConnections() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          var alpha = (1 - dist / CONNECTION_DIST);
          if (isResolved && particles[i].progress > 0.5) {
            ctx.strokeStyle = 'rgba(255, 111, 71, ' + (alpha * 0.25 * particles[i].progress) + ')';
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * 0.07) + ')';
          }
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.3)';
    ctx.fillRect(0, 0, W, H);
    drawConnections();

    for (var k = 0; k < particles.length; k++) {
      particles[k].update();
      particles[k].draw();
    }

    requestAnimationFrame(animate);
  }

  function handleClick() {
    isResolved = !isResolved;

    if (isResolved) {
      overlay.classList.add('resolved');
      if (hint) hint.textContent = 'Click to scatter';
      for (var i = 0; i < particles.length; i++) particles[i].progress = 0;
    } else {
      overlay.classList.remove('resolved');
      if (hint) hint.textContent = 'Click to collapse';
      for (var j = 0; j < particles.length; j++) {
        particles[j].vx = (Math.random() - 0.5) * 3;
        particles[j].vy = (Math.random() - 0.5) * 3;
        particles[j].progress = 1;
      }
    }
  }

  // Initialize
  resize();
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(i));
  }
  assignTargets();
  animate();

  heroSection.addEventListener('click', handleClick);
  window.addEventListener('resize', resize);
})();
